import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationService";

const AppliedJobs = () => {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {
      try {
        const data =
          await getMyApplications();

        setApplications(
          data.applications
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-700";

      case "Interview Scheduled":
        return "bg-purple-100 text-purple-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Hired":
        return "bg-emerald-100 text-emerald-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Applied Jobs
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No applications found.
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map(
              (application) => (
                <div
                  key={application._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-2xl font-semibold">
                    {
                      application.job
                        ?.title
                    }
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {
                      application.job
                        ?.company
                    }{" "}
                    •{" "}
                    {
                      application.job
                        ?.location
                    }
                  </p>

                  <p className="mt-4 text-gray-700">
                    {
                      application.job
                        ?.description
                    }
                  </p>

                  {application.job
                    ?.skills?.length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {application.job.skills.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={index}
                            className="bg-slate-200 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        application.status ||
                          "Applied"
                      )}`}
                    >
                      {application.status ||
                        "Applied"}
                    </span>

                    <span className="text-sm text-gray-500">
                      Applied on{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;