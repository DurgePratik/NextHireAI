import User from "../models/User.js";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import axios from "axios";
import FormData from "form-data";

export const uploadResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const bucket = new GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: "resumes",
      }
    );

    const uploadStream =
      bucket.openUploadStream(
        req.file.originalname,
        {
          contentType:
            req.file.mimetype,
        }
      );

    uploadStream.end(
      req.file.buffer
    );

    uploadStream.on(
      "finish",
      async () => {
        try {
          const formData =
            new FormData();

          formData.append(
            "resume",
            req.file.buffer,
            req.file.originalname
          );

console.log("AI URL =", process.env.AI_SERVICE_URL);

          const aiResponse =
  await axios.post(
    `${process.env.AI_SERVICE_URL}/parse-resume`,
    formData,
    {
      headers:
        formData.getHeaders(),
    }
  );

          const skills =
            aiResponse.data.skills ||
            [];

          await User.findByIdAndUpdate(
            req.user._id,
            {
              resumeFileId:
                uploadStream.id,
              resumeFileName:
                req.file.originalname,
              skills,
            }
          );

          res.status(200).json({
            success: true,
            fileId:
              uploadStream.id,
            fileName:
              req.file.originalname,
            skills,
          });
        } catch (error) {
          console.log(
            "AI ERROR:",
            error.message
          );

          await User.findByIdAndUpdate(
            req.user._id,
            {
              resumeFileId:
                uploadStream.id,
              resumeFileName:
                req.file.originalname,
            }
          );

          res.status(200).json({
            success: true,
            fileId:
              uploadStream.id,
            fileName:
              req.file.originalname,
            skills: [],
          });
        }
      }
    );

    uploadStream.on(
      "error",
      (error) => {
        console.log(error);

        res.status(500).json({
          success: false,
          message:
            "Upload failed",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getResume = async (
  req,
  res
) => {
  try {
    const bucket = new GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: "resumes",
      }
    );

    const fileId =
      new mongoose.Types.ObjectId(
        req.params.fileId
      );

    const downloadStream =
      bucket.openDownloadStream(
        fileId
      );

    res.set(
      "Content-Type",
      "application/pdf"
    );

    downloadStream.pipe(res);

    downloadStream.on(
      "error",
      () => {
        res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch resume",
    });
  }
};