import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Dashboard.css";
import {
  addActivities,
  getActivities,
  updateActivity,
} from "../service/activityService";

const DashBoard = () => {
  const [newActivity, setNewActivity] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [startActivity, setStartActivity] = useState({});
  const [successActivity, setSuccessActivity] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getActivities().then(setCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          startActivity[card.id] && card.time > 0
            ? { ...card, time: card.time - 1 }
            : card
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [startActivity]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleStartCountdown = async (id) => {
    setStartActivity((prevCards) => {
      const isStopping = prevCards[id]; // Check if the activity is stopping
      const activity = cards.find((card) => card.id === id); // Find activity

      // ✅ If stopping the activity & time is 0, increment success count & delete it
      if (isStopping && activity?.time === 0) {
        setSuccessActivity((prev) => prev + 1);
        setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // ✅ Delete activity
        return prevCards; // ✅ Ensure it doesn't update startActivity if it's deleted
      } else if (isStopping) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // ✅ Delete activity
        return prevCards;
      }

      return {
        ...prevCards,
        [id]: !prevCards[id], // Toggle start/stop
      };
    });
    await updateActivity(id, { complete: true });
  };

  const handleAddActivity = async () => {
    if (newActivity && newTime) {
      let activityImage = "";

      switch (newActivity) {
        case "Running":
          activityImage = "/running.png";
          break;
        case "Swimming":
          activityImage = "/swimming.png";
          break;
        case "Hiking":
          activityImage = "/hiking.png";
          break;
        case "Biking":
          activityImage = "/biking.png";
          break;
        default:
          activityImage = "";
      }
      const activityData = {
        activity: newActivity,
        time: parseInt(newTime) * 60,
        date: new Date().toISOString().split("T")[0],
        completed: false,
      };

      const addedActivity = await addActivities(activityData); // ✅ Save to backend
      setCards([...cards, addedActivity]);

      setShowForm(false);
      setNewActivity("");
      setNewTime("");
    }
  };

  return (
    <div>
      <h1>DashBoard</h1>
      <p>
        Activity : {cards.length}{" "}
        <span>Success activity : {successActivity}</span>
      </p>
      <button onClick={() => setShowForm(true)}>Add Activity</button>

      <div className="activity-main">
        {cards.length === 0 ? (
          <p>Please add activity</p>
        ) : (
          cards.map((card, i) => (
            <div className="activity-card" key={card._id}>
              <h2>
                {i + 1}.{card.activity}
              </h2>
              <p>Date: {card.date}</p>
              <img className="activity-img" src={card.image} alt={card.image} />
              <p>Time left: {formatTime(card.time)}</p>
              <button onClick={() => handleStartCountdown(card.id)}>
                {startActivity[card.id] ? "stop" : "Start timer"}
              </button>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div>
          <h2>Add new Activity</h2>
          <label>Activity Name:</label>
          <select
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Biking">Biking</option>
            <option value="Hiking">Hiking</option>
          </select>
          <label>Time:</label>
          <select value={newTime} onChange={(e) => setNewTime(e.target.value)}>
            <option value="0">0</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
            <option value="75">75</option>
            <option value="90">90</option>
            <option value="105">105</option>
            <option value="120">120</option>
          </select>
          <button onClick={handleAddActivity}>Save</button>
          <button onClick={() => setShowForm(false)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
