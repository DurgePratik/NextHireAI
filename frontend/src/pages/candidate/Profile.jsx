import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  uploadResume,
} from "../../services/userService";

const Profile = () => {
  const [user, setUser] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const data =
          await getProfile();

        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleUpload =
    async () => {
      if (!file) {
        alert(
          "Please select a PDF"
        );
        return;
      }

      try {
        await uploadResume(file);

        alert(
          "Resume Uploaded Successfully"
        );

        fetchProfile();
      } catch (error) {
        console.log(error);

        alert(
          "Upload Failed"
        );
      }
    };

  if (loading)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Candidate Profile
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-semibold">
            {user?.name}
          </h2>

          <p className="mt-2 text-gray-600">
            {user?.email}
          </p>

          <div className="mt-6">
            <label className="cursor-pointer inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition">
              Choose Resume

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
                className="hidden"
              />
            </label>

            {file && (
              <p className="mt-3 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Upload Resume
          </button>

          {user?.resumeFileId && (
            <>
              <a
                href={`http://localhost:5000/api/users/resume/${user.resumeFileId}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                View Resume
              </a>

              <p className="mt-3 text-sm text-gray-600">
                Uploaded:{" "}
                {user.resumeFileName}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;