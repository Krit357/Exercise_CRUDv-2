import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityById } from "../service/activityService";

const ActivityDetail = () => {
  const { id } = useParams(); // ✅ Get activity ID from URL
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityById(id).then(setActivity);
  }, [id]);

  if (!activity) return <p>Loading activity details...</p>;

  return (
    <div>
      <h2>Activity Detail</h2>
      <p>
        <strong>Activity:</strong> {activity.activity}
      </p>
      <p>
        <strong>Date:</strong> {activity.date}
      </p>
      <p>
        <strong>Time Left:</strong> {activity.time} seconds
      </p>
      <img src={activity.image} alt={activity.activity} width="200" />
    </div>
  );
};

export default ActivityDetail;
