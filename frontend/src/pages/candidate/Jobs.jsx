import { useEffect, useState } from "react";
import {
  getRecommendedJobs,
} from "../../services/jobService";

import {
  applyJob,
  getMyApplications,
} from "../../services/applicationService";

const Jobs = () => {
  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [appliedJobs, setAppliedJobs] =
    useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const [
        jobsData,
        applicationsData,
      ] = await Promise.all([
        getRecommendedJobs(),
        getMyApplications(),
      ]);

      setJobs(jobsData.jobs);

      const appliedJobIds =
        applicationsData.applications.map(
          (application) =>
            application.job?._id
        );

      setAppliedJobs(
        appliedJobIds
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (
    jobId
  ) => {
    try {
      await applyJob(jobId);

      setAppliedJobs(
        (prev) =>
          prev.includes(jobId)
            ? prev
            : [...prev, jobId]
      );

      alert(
        "Application Submitted Successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to apply"
      );
    }
  };

  const getMatchColor = (
    score
  ) => {
    if (score >= 90)
      return "bg-green-100 text-green-700";

    if (score >= 70)
      return "bg-sky-100 text-sky-700";

    if (score >= 50)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  const filteredJobs =
    jobs.filter(
      (job) =>
        job.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          Recommended Jobs
        </h1>

        <p className="text-gray-600 mb-8">
          Jobs ranked using
          your resume skills
        </p>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full mb-6 p-3 rounded-lg border"
        />

        {loading ? (
          <p>
            Loading jobs...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map(
              (job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-semibold">
                      {job.title}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(
                        job.matchScore
                      )}`}
                    >
                      Match:{" "}
                      {
                        job.matchScore
                      }
                      %
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2">
                    {job.company} •{" "}
                    {
                      job.location
                    }
                  </p>

                  <p className="mt-4 text-gray-700">
                    {
                      job.description
                    }
                  </p>

                  {job.skills
                    ?.length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map(
                        (
                          skill,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                            className="bg-slate-200 px-2 py-1 rounded-full text-xs"
                          >
                            {
                              skill
                            }
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      {
                        job.jobType
                      }
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleApply(
                        job._id
                      )
                    }
                    disabled={appliedJobs.includes(
                      job._id
                    )}
                    className={`mt-6 px-4 py-2 rounded-lg text-white ${
                      appliedJobs.includes(
                        job._id
                      )
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-sky-600 hover:bg-sky-700"
                    }`}
                  >
                    {appliedJobs.includes(
                      job._id
                    )
                      ? "Applied"
                      : "Apply Now"}
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;