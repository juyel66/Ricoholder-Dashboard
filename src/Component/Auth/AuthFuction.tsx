// authService.js
import axios from "axios";

// Direct Base URL
const API_BASE_URL = "https://appointment-manager-node.onrender.com/api/v1";

// Save user and token to localStorage
const saveUserToStorage = (data) => {
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
};

// Remove user from localStorage
const removeUserFromStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token ? { user: JSON.parse(user), token } : null;
};

// Role-based registration (Patient or Doctor)
export const registerUser = async ({ role, name, email, password, specialization, photo_url }) => {
  try {
    let endpoint = "";
    const payload = { name, email, password };
    if (photo_url) payload.photo_url = photo_url;

    if (role === "PATIENT") {
      endpoint = "/auth/register/patient";
    } else if (role === "DOCTOR") {
      endpoint = "/auth/register/doctor";
      if (!specialization) return { success: false, message: "Specialization is required for doctor" };
      payload.specialization = specialization;
    } else {
      return { success: false, message: "Invalid role" };
    }

    const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

// Login (Patient or Doctor)
export const loginUser = async ({ email, password, role }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password, role });
    if (response.data.success) saveUserToStorage(response.data.data);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

// Logout
export const logoutUser = () => {
  removeUserFromStorage();
};
