import axios from "axios";

const API_URL =
  "https://nexthireai-cwdd.onrender.com/api/applications";

export const applyJob = async (jobId) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axios.post(
      API_URL,
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getMyApplications =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getApplicantsForJob =
  async (jobId) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const updateApplicationStatus =
  async (
    applicationId,
    status
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API_URL}/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };