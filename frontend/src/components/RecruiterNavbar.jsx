import { Link } from "react-router-dom";

const RecruiterNavbar = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-indigo-600">
          NextHire
        </h1>

        <div className="flex gap-6 font-medium">
          <Link to="/recruiter/dashboard">Dashboard</Link>
          <Link to="/recruiter/create-job">Create Job</Link>
          <Link to="/recruiter/jobs">My Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterNavbar;