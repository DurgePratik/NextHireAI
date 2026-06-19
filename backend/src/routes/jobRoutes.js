import express from "express";

import {
  createJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  getRecruiterStats,
  getRecommendedJobs,
} from "../controllers/jobController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  getRecruiterStats
);

router.get(
  "/recommended",
  protect,
  getRecommendedJobs
);

router.post(
  "/",
  protect,
  createJob
);

router.get(
  "/",
  getAllJobs
);

router.get(
  "/my",
  protect,
  getMyJobs
);

router.delete(
  "/:id",
  protect,
  deleteJob
);

export default router;