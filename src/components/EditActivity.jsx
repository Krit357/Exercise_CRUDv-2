import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getActivityById, updateActivity } from "../service/activityService";

const EditActivity = () => {
  const { id } = useParams(); // ✅ Get activity ID
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    activity: "",
    time: 0,
    image: "",
  });

  useEffect(() => {
    getActivityById(id).then(setActivity);
  }, [id]);

  const handleUpdate = async () => {
    await updateActivity(id, activity);
    navigate("/dashboard"); // ✅ Redirect back after update
  };

  return (
    <div>
      <h2>Edit Activity</h2>
      <label>Activity Name:</label>
      <select
        value={activity.activity}
        onChange={(e) => setActivity({ ...activity, activity: e.target.value })}
      >
        <option value="Running">Running</option>
        <option value="Swimming">Swimming</option>
        <option value="Biking">Biking</option>
        <option value="Hiking">Hiking</option>
      </select>

      <label>Time (seconds):</label>
      <input
        type="number"
        value={activity.time}
        onChange={(e) =>
          setActivity({ ...activity, time: parseInt(e.target.value) })
        }
      />

      <button onClick={handleUpdate}>Save Changes</button>
      <button onClick={() => navigate("/dashboard")}>Cancel</button>
    </div>
  );
};

export default EditActivity;
