import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import { getMyJobs } from "../../services/jobService";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          My Jobs
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>No jobs posted yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-2xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {job.company} • {job.location}
                </p>

                <p className="mt-4 text-gray-700">
                  {job.description}
                </p>

                <div className="mt-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {job.jobType}
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/recruiter/applicants/${job._id}`
                    )
                  }
                  className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  View Applicants
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobs;