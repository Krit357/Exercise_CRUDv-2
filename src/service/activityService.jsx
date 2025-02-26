const API_URL = "http://localhost:5175";

export const getActivities = async () => {
  try {
    const res = await fetch(`${API_URL}/activities`);
    return await res.json();
  } catch (err) {
    console.error("Error fetch activities", err);
    return [];
  }
};

export const addActivities = async (activityData) => {
  try {
    const res = await fetch(`${API_URL}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetch activities", err);
    return [];
  }
};

export const updateActivity = async (id, updateData) => {
  try {
    const res = await fetch(`${API_URL}/activities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating activity:", err);
  }
};

export const deleteActivity = async (id) => {
  try {
    const res = await fetch(`${API_URL}/activities/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.error("Error delete activity", err);
  }
};
