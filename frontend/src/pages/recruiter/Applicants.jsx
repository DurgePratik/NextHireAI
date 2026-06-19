import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterNavbar from "../../components/RecruiterNavbar";

import {
  getApplicantsForJob,
  updateApplicationStatus,
} from "../../services/applicationService";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data =
        await getApplicantsForJob(
          jobId
        );

      setApplications(
        data.applications
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange =
    async (
      applicationId,
      status
    ) => {
      try {
        await updateApplicationStatus(
          applicationId,
          status
        );

        setApplications(
          applications.map(
            (application) =>
              application._id ===
              applicationId
                ? {
                    ...application,
                    status,
                  }
                : application
          )
        );
      } catch (error) {
        console.log(error);
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

  const getMatchColor = (
    score
  ) => {
    if (score >= 80)
      return "bg-green-100 text-green-700";

    if (score >= 60)
      return "bg-sky-100 text-sky-700";

    if (score >= 40)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Ranked Applicants
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : applications.length ===
          0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p>
              No applicants yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map(
              (
                application,
                index
              ) => (
                <div
                  key={
                    application._id
                  }
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        Rank #
                        {index + 1}
                      </p>

                      <h2 className="text-2xl font-semibold">
                        {
                          application
                            .candidate
                            ?.name
                        }
                      </h2>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(
                        application.matchScore
                      )}`}
                    >
                      Match:{" "}
                      {
                        application.matchScore
                      }
                      %
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2">
                    {
                      application
                        .candidate
                        ?.email
                    }
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Applied on{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>

                  {application
                    .candidate
                    ?.skills
                    ?.length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {application.candidate.skills.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                            className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs"
                          >
                            {
                              skill
                            }
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-3 items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {
                        application.status
                      }
                    </span>

                    <select
                      value={
                        application.status
                      }
                      onChange={(
                        e
                      ) =>
                        handleStatusChange(
                          application._id,
                          e.target
                            .value
                        )
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option>
                        Applied
                      </option>

                      <option>
                        Shortlisted
                      </option>

                      <option>
                        Interview Scheduled
                      </option>

                      <option>
                        Rejected
                      </option>

                      <option>
                        Hired
                      </option>
                    </select>

                    {application
                      .candidate
                      ?.resumeFileId ? (
                      <a
                        href={`https://nexthireai-cwdd.onrender.com/api/applications/resume/${application.candidate.resumeFileId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Resume Not
                        Uploaded
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Applicants;