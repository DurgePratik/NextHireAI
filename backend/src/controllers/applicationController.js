import Application from "../models/Application.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

export const applyJob = async (
  req,
  res
) => {
  try {
    const { jobId } = req.body;

    const existingApplication =
      await Application.findOne({
        candidate: req.user._id,
        job: jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already Applied",
      });
    }

    const application =
      await Application.create({
        candidate: req.user._id,
        job: jobId,
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          candidate: req.user._id,
        }).populate("job");

      res.json({
        applications,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getApplicantsForJob =
  async (req, res) => {
    try {
      const job =
        await Job.findById(
          req.params.jobId
        );

      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      const jobSkills =
        job.skills || [];

      const applications =
        await Application.find({
          job: req.params.jobId,
        }).populate("candidate");

      const rankedApplicants =
        applications.map(
          (application) => {
            const candidateSkills =
              application.candidate
                ?.skills || [];

            let matchScore = 0;

            if (
              jobSkills.length > 0
            ) {
              const matchedSkills =
                candidateSkills.filter(
                  (skill) =>
                    jobSkills.some(
                      (jobSkill) =>
                        jobSkill.toLowerCase() ===
                        skill.toLowerCase()
                    )
                );

              matchScore =
                Math.round(
                  (matchedSkills.length /
                    jobSkills.length) *
                    100
                );
            }

            return {
              ...application.toObject(),
              matchScore,
            };
          }
        );

      rankedApplicants.sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      );

      res.json({
        applications:
          rankedApplicants,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }

      application.status =
        status;

      await application.save();

      res.json({
        success: true,
        application,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };