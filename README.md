# 🏥 Doctor Appointment Booking System

A full-stack web application that enables patients to book appointments with doctors and allows healthcare providers to manage schedules efficiently.

---

## 📌 Features

### 👤 Patient
- Register and login
- View available doctors
- Book and cancel appointments
- View appointment history

### 🩺 Doctor
- Login and profile management
- Manage availability slots
- View scheduled appointments

### 🔐 Admin
- Manage doctors and users
- Monitor appointments

---

## 🧩 Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- JavaScript

### Backend
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT Authentication

---

## 📁 Project Structure

Doctor_Appointment_Booking_System
│
├── doctor-appointment-frontend
│ ├── src
│ ├── public
│ ├── package.json
│ └── tailwind.config.js
│
├── doctor-appointment-backend
│ ├── app
│ │ ├── models
│ │ ├── routes
│ │ ├── schemas
│ │ └── services
│ ├── migrations
│ ├── requirements.txt
│ ├── run.py
│ └── alembic.ini
│
└── README.md


---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd doctor-appointment-backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
uvicorn run:app --reload
Backend will run at:

http://127.0.0.1:8000


### 🔹 Frontend Setup
cd doctor-appointment-frontend
npm install
npm start
Frontend will run at:

http://localhost:3000


🔐 Environment Variables

Create a .env file in the backend directory:

DATABASE_URL=postgresql://username:password@localhost/dbname
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

🌐 Deployment
Backend: Render

Frontend: Netlify or Render Static Site

Backend Start Command on Render:

uvicorn run:app --host 0.0.0.0 --port 10000

🧪 API Documentation

FastAPI automatically provides API docs:

http://localhost:8000/docs

or

http://localhost:8000/redoc


👨‍💻 Author
Mayank Baranwal
Roll No: BCSI055
Course: B.Tech Computer Science

📜 License
This project is created for academic and learning purposes only.


---

## ✅ After creating the file

Run:

```bash
git add README.md
git commit -m "Add project README"
git push
