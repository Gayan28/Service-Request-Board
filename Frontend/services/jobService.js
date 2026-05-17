import api from "/lib/api";

//
// GET ALL JOBS
//
export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

//
// GET SINGLE JOB
//
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};

//
// CREATE JOB
//
export const createJob = async (jobData, token) => {
  const response = await api.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//
// UPDATE STATUS
//
export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/jobs/${id}`, {
    status,
  });

  return response.data;
};

//
// DELETE JOB
//
export const deleteJob = async (id, token) => {
  const response = await api.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};