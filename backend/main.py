from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from pydantic import BaseModel
from datetime import datetime
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from fastapi.middleware.cors import CORSMiddleware

# =========================
# MODELS
# =========================

class Grievance(BaseModel):
    text: str
    user: str | None = None

class StatusUpdate(BaseModel):
    status: str

# =========================
# APP SETUP
# =========================

print("RUNNING THIS MAIN FILE")

app = FastAPI()

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

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
print("Firestore working!")

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

print("AI model loaded successfully")

# =========================
# HYBRID AI LOGIC
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
    sequence = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequence, maxlen=10, padding="post")

    prediction = model.predict(padded)
    predicted_index = prediction.argmax()

    return label_encoder.inverse_transform([predicted_index])[0]

def hybrid_predict_department(text: str) -> str:
    text_lower = text.lower()

    # Rule-based (high confidence)
    for keyword, department in KEYWORD_MAP.items():
        if keyword in text_lower:
            return department

    # ML fallback
    return predict_department_ml(text)

# =========================
# ROUTES
# =========================

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/grievance")
def submit_grievance(grievance: Grievance):
    department = hybrid_predict_department(grievance.text)

    doc_ref = db.collection("grievances").add({
        "text": grievance.text,
        "user": grievance.user,
        "department": department,
        "priority": "Medium",
        "status": "Pending",
        "created_at": datetime.utcnow()
    })

    return {
        "message": "Grievance submitted successfully",
        "ticket_id": doc_ref[1].id,
        "predicted_department": department
    }

@app.get("/grievances")
def get_all_grievances():
    grievances_ref = db.collection("grievances").stream()
    grievances = []

    for doc in grievances_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        grievances.append(data)

    return grievances

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
        "id": grievance_id,
        "new_status": update.status
    }

@app.get("/predict-department")
def test_prediction(text: str):
    department = hybrid_predict_department(text)
    return {"predicted_department": department}
