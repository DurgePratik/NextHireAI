import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfs;

mongoose.connection.once("open", () => {
  gfs = new GridFSBucket(
    mongoose.connection.db,
    {
      bucketName: "resumes",
    }
  );

  console.log("GridFS Ready");
});

export { gfs };