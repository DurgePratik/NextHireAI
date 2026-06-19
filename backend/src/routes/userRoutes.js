import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadResume,
  getProfile,
  getResume,
} from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/profile",
  protect,
  getProfile
);

router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/resume/:fileId",
  getResume
);

export default router;