import api from "/lib/api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    console.error("Register error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Registration failed"
    );
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    throw (
      error.response?.data?.message ||
      error.message ||
      "Login failed"
    );
  }
};