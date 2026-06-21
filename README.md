# NextHire AI 🚀

**AI-Powered Recruitment & Job Recommendation Platform**

NextHire AI is a full-stack recruitment platform that streamlines the hiring process by combining modern web technologies with AI-powered resume analysis. The platform enables candidates to upload resumes, automatically extract skills, discover relevant job opportunities, and apply seamlessly. Recruiters can create job postings, manage applicants, and identify suitable candidates efficiently.

---

## 📌 Features

### Candidate Features

* User Registration & Login
* Secure JWT Authentication
* Resume Upload (PDF)
* AI-Based Skill Extraction
* Personalized Job Recommendations
* Job Application Management
* Profile Management

### Recruiter Features

* Recruiter Registration & Login
* Create & Manage Job Postings
* View Applicants
* Access Candidate Resumes
* Recruitment Dashboard

### AI Features

* Automated Resume Parsing
* Skill Extraction from PDFs
* Candidate-Job Skill Matching
* Match Score Calculation

---

## 🏗️ System Architecture

```text
React Frontend (Vercel)
          │
          ▼
Node.js + Express Backend (Render)
          │
 ┌────────┴────────┐
 ▼                 ▼
MongoDB Atlas     Flask AI Service (Render)
(GridFS)          Resume Parsing & Skill Extraction
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB Atlas
* GridFS

### AI Service

* Python
* Flask
* PyMuPDF
* Pandas
* Regex-Based Skill Extraction

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Render (AI Service)
* MongoDB Atlas (Database)

---

## 📂 Project Structure

```text
NextHireAI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── server.js
│   └── package.json
│
├── ai/
│   ├── app.py
│   ├── parser.py
│   ├── skills.py
│   ├── requirements.txt
│   └── data/
│       └── skills.csv
│
└── README.md
```

---

## ⚙️ Resume Processing Workflow

1. Candidate uploads a PDF resume.
2. Backend receives the file using Multer.
3. Resume is stored in MongoDB GridFS.
4. Backend sends the PDF to the AI Service.
5. AI extracts text using PyMuPDF.
6. Skills are identified using a curated skills database.
7. Extracted skills are returned to the backend.
8. Skills are stored in the candidate profile.
9. Job recommendations are generated using skill matching.

---

## 🧠 Recommendation Algorithm

### Candidate Skills

```text
Python
SQL
Machine Learning
Pandas
```

### Job Skills

```text
Python
SQL
Deep Learning
```

### Match Score Formula

```text
Match Score =
(Matched Skills / Total Job Skills) × 100
```

### Example

```text
Matched Skills = 2
Total Job Skills = 3

Match Score = (2/3) × 100 = 67%
```

---

## 🔐 Security Features

* Password Hashing using bcrypt
* JWT-Based Authentication
* Protected API Routes
* Role-Based Access Control
* Environment Variable Configuration
* Secure Resume Storage

---

## 📊 Database Collections

### Users

```javascript
{
  name,
  email,
  password,
  role,
  skills,
  resumeFileId,
  resumeFileName
}
```

### Jobs

```javascript
{
  title,
  company,
  location,
  description,
  skills,
  recruiter
}
```

### Applications

```javascript
{
  candidate,
  job,
  status
}
```

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/DurgePratik/NextHireAI.git
cd NextHireAI
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://localhost:8000
```

---

### AI Service Setup

```bash
cd ai
pip install -r requirements.txt
python app.py
```

---

## 🌍 Deployment

### Frontend

Hosted on Vercel

### Backend

Hosted on Render

### AI Service

Hosted on Render

### Database

MongoDB Atlas

---

## 🎯 Key Learning Outcomes

* Full Stack Web Development
* REST API Design
* JWT Authentication
* MongoDB Atlas & GridFS
* AI Microservice Architecture
* Cloud Deployment
* Resume Parsing & Recommendation Systems
* Debugging Distributed Applications

---

## 🔮 Future Improvements

* Semantic Skill Matching using NLP Models
* Resume Scoring System
* ATS Compatibility Analysis
* Interview Scheduling
* Email Notifications
* Recruiter Analytics Dashboard
* Advanced Search & Filtering
* AI-Powered Candidate Ranking

---

## 👨‍💻 Author

**Pratik Durge**

B.Tech, Electronics and Communication Engineering
Indian Institute of Technology Guwahati (IIT Guwahati)

GitHub: https://github.com/DurgePratik

---

## 📄 License

This project is developed for educational, research, and portfolio purposes.
