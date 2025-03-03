const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const data = await res.json();
    console.log("Register  response ", data);
    return data;
  } catch (err) {
    console.error("Error registering user:", err);
    return { message: "Registration failed" };
  }
};

export const loginUser = async (loginData) => {
  try {
    console.log("Sending Login Data:", loginData); // ✅ Debugging

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    console.log("Response Status:", res.status); // ✅ Log response status

    if (!res.ok) {
      const errorMessage = await res.json();
      console.error("Login Failed:", errorMessage);
      throw new Error(errorMessage.message || "Login failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    return null;
  }
};

// **Check If User is Logged In**
export const getUserToken = () => localStorage.getItem("token");

// **Logout User**
export const logoutUser = () => localStorage.getItem("token");
