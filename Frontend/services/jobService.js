import api from "/lib/api";

export const getJobs = async (params = {}) => {
  try {
    const response = await api.get("/jobs", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Get jobs error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch jobs"
    );
  }
};

export const getJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);

    return response.data;
  } catch (error) {
    console.error("Get job error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch job"
    );
  }
};

export const createJob = async (jobData, token) => {
  try {
    const response = await api.post("/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create job error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to create job"
    );
  }
};

export const updateJobStatus = async (id, status) => {
  try {
    const response = await api.patch(`/jobs/${id}`, {
      status,
    });

    return response.data;
  } catch (error) {
    console.error("Update job status error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to update job status"
    );
  }
};

export const deleteJob = async (id, token) => {
  try {
    const response = await api.delete(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Delete job error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to delete job"
    );
  }
};