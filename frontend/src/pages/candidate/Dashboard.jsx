import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Candidate Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/candidate/jobs"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">
              Browse Jobs
            </h2>

            <p className="mt-2 text-gray-600">
              Explore available opportunities
            </p>
          </Link>

          <Link
            to="/candidate/applied-jobs"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">
              Applied Jobs
            </h2>

            <p className="mt-2 text-gray-600">
              Track your applications
            </p>
          </Link>

          <Link
            to="/candidate/profile"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">
              Profile
            </h2>

            <p className="mt-2 text-gray-600">
              Upload and manage your resume
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;