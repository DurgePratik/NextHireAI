import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import { createJob } from "../../services/jobService";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      description: "",
      jobType: "Full-Time",
      skills: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const jobData = {
        ...formData,
        skills:
          formData.skills
            .split(",")
            .map((skill) =>
              skill.trim().toLowerCase()
            )
            .filter(Boolean),
      };

      await createJob(jobData);

      alert(
        "Job Created Successfully"
      );

      navigate(
        "/recruiter/jobs"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to Create Job"
      );
    }
  };

  return (
    <>
      <RecruiterNavbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Create Job
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={
              formData.company
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Job Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated) e.g. Python, SQL, Machine Learning"
            value={
              formData.skills
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="jobType"
            value={
              formData.jobType
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>
              Full-Time
            </option>

            <option>
              Part-Time
            </option>

            <option>
              Internship
            </option>
          </select>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg"
          >
            Create Job
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;