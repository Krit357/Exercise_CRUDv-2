const API_URL = "http://localhost:5000";

export const getActivities = async () => {
  const userId = localStorage.getItem("userId"); // ✅ Get logged-in userId
  if (!userId) return [];

  try {
    const res = await fetch(`http://localhost:5000/dashboard?userId=${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching activities", err);
    return [];
  }
};

export const getActivityById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/dashboard/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching activity by ID:", err);
    return null;
  }
};

export const addActivities = async (activityData) => {
  const userId = localStorage.getItem("userId"); // ✅ Get userId
  if (!userId) return null;

  try {
    const res = await fetch("http://localhost:5000/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...activityData }), // ✅ Include userId
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding activity", err);
    return null;
  }
};
export const updateActivity = async (_id, updateData) => {
  try {
    const res = await fetch(`${API_URL}/dashboard/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error("Failed to update activities");
    return await res.json();
  } catch (err) {
    console.error("Error updating activity:", err);
    return null;
  }
};

export const deleteActivity = async (_id) => {
  try {
    const res = await fetch(`${API_URL}/dashboard/${_id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete activities");
    return await res.json();
  } catch (err) {
    console.error("Error delete activity", err);
    return null;
  }
};
