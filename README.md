# ai_grievance_resolver

# AI-Powered Grievance Redressal System

This project is a full-stack AI-powered grievance redressal platform designed to simplify how users submit grievances and how authorities analyze and resolve them efficiently. The system uses a modern technology stack consisting of a React frontend, a Python backend with TensorFlow for AI processing, and Firebase/Supabase for database and authentication.


## 📌 How the System Works
The application follows a client–server architecture:
1. **Frontend (React)**  
   - Users submit grievances through a web interface.
   - The frontend sends grievance data to the backend via API calls.

2. **Backend (Python + TensorFlow)**  
   - Receives grievance data from the frontend.
   - Applies AI logic such as grievance classification, priority detection, or fake grievance analysis.
   - Stores the processed data in the database.

3. **Database (Firebase / Supabase)**  
   - Firebase is used for authentication and real-time data storage.
   - Supabase is used for structured relational data and analytics.
   - 
## 📁 Project Structure

    Frontend Setup (React)

1. Open a terminal and navigate to the frontend directory:
   
   cd frontend
2.Install the required dependencies (this installs React and related libraries):

    npm install
   
3.Start the React development server:

    npm run dev
    
4.The frontend will run at:

    http://localhost:5173

    Backend Setup (Python + TensorFlow)

1.Open a new terminal and navigate to the backend directory:

    cd backend
    
2.Create a Python virtual environment:

    python -m venv venv
    
3.Activate the virtual environment:

  On Windows:
  
    venv\Scripts\activate
    
  On macOS / Linux:
  
    source venv/bin/activate
    
4.Install backend dependencies:

    pip install tensorflow firebase-admin fastapi uvicorn
    
5.Start the backend server:

    uvicorn main:app --reload
    
6.The backend API will run at:

    http://127.0.0.1:8000
  
    

