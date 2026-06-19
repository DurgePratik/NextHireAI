import axios from "axios";

const API_URL =
  "https://nexthireai-cwdd.onrender.com/api/user";

export const uploadResume =
  async (file) => {
    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    const response =
      await axios.post(
        `${API_URL}/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getProfile =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };