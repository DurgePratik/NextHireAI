import Job from "../models/Job.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      description,
      skills,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      description,
      skills,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Job.find()
      .populate(
        "recruiter",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMyJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user._id,
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getRecruiterStats =
  async (req, res) => {
    try {
      const jobs = await Job.find({
        recruiter: req.user._id,
      });

      const totalJobs =
        jobs.length;

      const jobIds = jobs.map(
        (job) => job._id
      );

      const totalApplicants =
        await Application.countDocuments(
          {
            job: {
              $in: jobIds,
            },
          }
        );

      res.status(200).json({
        totalJobs,
        totalApplicants,
        activeJobs: totalJobs,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getRecommendedJobs =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      const candidateSkills =
        user.skills || [];

      const jobs =
        await Job.find()
          .populate(
            "recruiter",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      const recommendedJobs =
        jobs.map((job) => {
          const jobSkills =
            job.skills || [];

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
            ...job.toObject(),
            matchScore,
          };
        });

      recommendedJobs.sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      );

      res.status(200).json({
        success: true,
        jobs: recommendedJobs,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };