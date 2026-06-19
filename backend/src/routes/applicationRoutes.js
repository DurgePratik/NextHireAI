import express from "express";

import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  applyJob
);

router.get(
  "/my",
  protect,
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  getApplicantsForJob
);

router.put(
  "/:id/status",
  protect,
  updateApplicationStatus
);

export default router;