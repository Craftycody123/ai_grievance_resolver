from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from pydantic import BaseModel
from datetime import datetime
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from fastapi.middleware.cors import CORSMiddleware

from ai.priority import predict_priority

# =========================
# DATA MODELS
# =========================

class Grievance(BaseModel):
    text: str
    user: str | None = None

class StatusUpdate(BaseModel):
    status: str

# =========================
# APP SETUP
# =========================

app = FastAPI()
print("🚀 Backend starting...")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# FIREBASE SETUP
# =========================

import os, json
from firebase_admin import credentials

firebase_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

if not firebase_json:
    raise ValueError("FIREBASE_SERVICE_ACCOUNT env variable not set")

cred = credentials.Certificate(json.loads(firebase_json))
firebase_admin.initialize_app(cred)


db = firestore.client()
print("✅ Firestore connected")

# =========================
# AI MODEL LOADING
# =========================

MODEL_PATH = "ai/department_model.keras"
TOKENIZER_PATH = "ai/tokenizer.pkl"
ENCODER_PATH = "ai/label_encoder.pkl"

model = tf.keras.models.load_model(MODEL_PATH)

with open(TOKENIZER_PATH, "rb") as f:
    tokenizer = pickle.load(f)

with open(ENCODER_PATH, "rb") as f:
    label_encoder = pickle.load(f)

print("✅ Department AI model loaded")

# =========================
# HYBRID DEPARTMENT AI
# =========================

KEYWORD_MAP = {
    "water": "Water",
    "leak": "Water",
    "drinking water": "Water",

    "wifi": "IT",
    "internet": "IT",
    "network": "IT",
    "router": "IT",

    "power": "Electricity",
    "light": "Electricity",
    "fan": "Electricity",
    "switch": "Electricity",

    "clean": "Maintenance",
    "broken": "Maintenance",
    "repair": "Maintenance",
    "damage": "Maintenance",

    "food": "Mess",
    "mess": "Mess",
    "canteen": "Mess",

    "security": "Security",
    "theft": "Security",
    "cctv": "Security",
    "guard": "Security"
}

def predict_department_ml(text: str) -> str:
    seq = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(seq, maxlen=10, padding="post")

    prediction = model.predict(padded)
    index = prediction.argmax()

    return label_encoder.inverse_transform([index])[0]

def hybrid_predict_department(text: str) -> str:
    text_lower = text.lower()

    for keyword, department in KEYWORD_MAP.items():
        if keyword in text_lower:
            return department

    return predict_department_ml(text)

# =========================
# ROUTES
# =========================

@app.get("/")
def root():
    return {"status": "Backend running"}

# -------------------------
# SUBMIT GRIEVANCE
# -------------------------

@app.post("/grievance")
def submit_grievance(grievance: Grievance):
    department = hybrid_predict_department(grievance.text)
    priority = predict_priority(grievance.text)

    # Create document with generated ticket ID
    doc_ref = db.collection("grievances").document()
    ticket_id = doc_ref.id

    doc_ref.set({
        "text": grievance.text,
        "user": grievance.user,
        "department": department,
        "priority": priority,
        "status": "Pending",
        "created_at": datetime.utcnow()
    })

    print(f"✅ Grievance saved | Ticket ID: {ticket_id}")

    return {
        "message": "Grievance submitted successfully",
        "ticket_id": ticket_id,
        "predicted_department": department,
        "priority": priority
    }

# -------------------------
# GET ALL GRIEVANCES
# -------------------------

@app.get("/grievances")
def get_all_grievances():
    grievances = []

    for doc in db.collection("grievances").stream():
        data = doc.to_dict()
        data["ticket_id"] = doc.id
        grievances.append(data)

    return grievances

# -------------------------
# UPDATE STATUS (ADMIN)
# -------------------------

@app.patch("/grievance/{grievance_id}")
def update_grievance_status(grievance_id: str, update: StatusUpdate):
    doc_ref = db.collection("grievances").document(grievance_id)
    doc = doc_ref.get()

    if not doc.exists:
        return {"error": "Grievance not found"}

    doc_ref.update({
        "status": update.status,
        "updated_at": datetime.utcnow()
    })

    return {
        "message": "Status updated successfully",
        "ticket_id": grievance_id,
        "new_status": update.status
    }

# -------------------------
# TRACK GRIEVANCE
# -------------------------

@app.get("/grievance/track/{ticket_id}")
def track_grievance(ticket_id: str):
    doc = db.collection("grievances").document(ticket_id).get()

    if not doc.exists:
        return {"error": "Ticket not found"}

    data = doc.to_dict()
    data["ticket_id"] = ticket_id
    return data

# -------------------------
# TEST DEPARTMENT AI
# -------------------------

@app.get("/predict-department")
def test_prediction(text: str):
    department = hybrid_predict_department(text)
    return {"predicted_department": department}
