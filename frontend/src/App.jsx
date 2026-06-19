import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Candidate Pages
import CandidateDashboard from "./pages/candidate/Dashboard";
import Jobs from "./pages/candidate/Jobs";
import AppliedJobs from "./pages/candidate/AppliedJobs";
import Profile from "./pages/candidate/Profile";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applicants from "./pages/recruiter/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Routes */}
        <Route
          path="/candidate/dashboard"
          element={<CandidateDashboard />}
        />

        <Route
          path="/candidate/jobs"
          element={<Jobs />}
        />

        <Route
          path="/candidate/applied-jobs"
          element={<AppliedJobs />}
        />

        <Route
          path="/candidate/profile"
          element={<Profile />}
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/create-job"
          element={<CreateJob />}
        />

        <Route
          path="/recruiter/jobs"
          element={<MyJobs />}
        />

        <Route
          path="/recruiter/applicants/:jobId"
          element={<Applicants />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;