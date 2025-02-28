const API_URL = "http://localhost:5000";

export const getActivities = async () => {
  try {
    const res = await fetch(`${API_URL}/dashboard`);
    if (!res.ok) throw new Error("Failed to fetch activities");
    return await res.json();
  } catch (err) {
    console.error("Error fetch activities", err);
    return [];
  }
};

export const addActivities = async (activityData) => {
  try {
    const res = await fetch(`${API_URL}/dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });
    if (!res.ok) throw new Error("Failed to create activities");
    return await res.json();
  } catch (err) {
    console.error("Error fetch activities", err);
    return [];
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
