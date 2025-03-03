const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("LOgin response ", data);
  } catch (err) {
    console.error("Error registering user:", err);
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
