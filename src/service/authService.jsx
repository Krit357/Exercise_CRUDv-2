const API_URL = "http://localhost:5000/auth";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error registering user:", err);
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      herders: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    console.error("Error login:", err);
    return null;
  }
};

// **Check If User is Logged In**
export const getUserToken = () => localStorage.getItem("token");

// **Logout User**
export const logoutUser = () => localStorage.getItem("token");
