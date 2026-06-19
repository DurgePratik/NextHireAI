import axios from "axios";

const API_URL = "https://nexthireai-cwdd.onrender.com";

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllJobs = async () => {
  const response = await axios.get(
    "https://nexthireai-cwdd.onrender.com/api/jobs"
  );

  return response.data;
};

export const getRecruiterStats =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  export const getRecommendedJobs =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/recommended`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };