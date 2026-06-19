import { useEffect, useState } from "react";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import { getRecruiterStats } from "../../services/jobService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    activeJobs: 0,
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data =
        await getRecruiterStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">
            Recruiter Dashboard
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Jobs Posted
                </h2>

                <p className="text-5xl font-bold text-sky-600 mt-4">
                  {stats.totalJobs}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Applicants
                </h2>

                <p className="text-5xl font-bold text-sky-600 mt-4">
                  {stats.totalApplicants}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-700">
                  Active Jobs
                </h2>

                <p className="text-5xl font-bold text-sky-600 mt-4">
                  {stats.activeJobs}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;