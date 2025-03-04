import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Dashboard.css";
import {
  addActivities,
  getActivities,
  deleteActivity,
  updateActivity,
} from "../service/activityService";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const [newActivity, setNewActivity] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [startActivity, setStartActivity] = useState({});
  const [successActivity, setSuccessActivity] = useState(0);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editActivity, setEditActivity] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getActivities().then(setCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          startActivity[card._id] && card.time > 0
            ? { ...card, time: card.time - 1 } // ✅ Only countdown for running cards
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

  const handleStartCountdown = async (_id) => {
    setStartActivity((prevCards) => {
      const isStopping = prevCards[_id]; // ✅ Check if stopping
      const activity = cards.find((card) => card._id === _id); // ✅ Find activity

      // ✅ If stopping and time is 0, increment success count & delete from DB
      if (isStopping && activity?.time === 0) {
        setSuccessActivity((prev) => prev + 1);
        deleteActivity(_id); // ✅ Delete from MongoDB
        setCards((prevCards) => prevCards.filter((card) => card._id !== _id)); // ✅ Remove from frontend state
        return prevCards;
      } else if (isStopping) {
        deleteActivity(_id); // ✅ Delete from MongoDB
        setCards((prevCards) => prevCards.filter((card) => card._id !== _id)); // ✅ Remove from frontend state
        return prevCards;
      }

      return {
        ...prevCards,
        [_id]: !prevCards[_id], // ✅ Toggle only the selected activity
      };
    });
  };

  const handleAddActivity = async () => {
    if (newActivity && newTime) {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("You must be logged in to add activities");
      let activityImage = "";

      switch (newActivity) {
        case "Running":
          activityImage = "/running.png"; // ✅ Correct path
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
          activityImage = "/default.png"; // ✅ Default image
      }

      const activityData = {
        activity: newActivity,
        image: activityImage, // ✅ Store correct image path
        time: parseInt(newTime) * 60,
        date: new Date().toISOString().split("T")[0],
        completed: false,
      };

      const addedActivity = await addActivities(activityData);
      setCards([...cards, addedActivity]);

      setShowForm(false);
      setNewActivity("");
      setNewTime("");
    }
  };

  const handleDeleteActivity = async (_id) => {
    try {
      await deleteActivity(_id);
      setCards((prevCards) => prevCards.filter((card) => card._id !== _id));
    } catch (err) {
      console.error("Error cannot delete activity", err);
    }
  };

  const handleEditActivity = (activity) => {
    setEditMode(true);
    setEditActivity({ ...activity });
  };

  const handleUpdateActivity = async () => {
    if (!editActivity || !editActivity._id) {
      console.error("Error: No activity selected for update");
      return;
    }

    let updatedImage = `/default.png`; // Default image
    switch (editActivity.activity) {
      case "Running":
        updatedImage = "/running.png";
        break;
      case "Swimming":
        updatedImage = "/swimming.png";
        break;
      case "Hiking":
        updatedImage = "/hiking.png";
        break;
      case "Biking":
        updatedImage = "/biking.png";
        break;
    }
    try {
      const updatedActivity = await updateActivity(editActivity._id, {
        activity: editActivity.activity,
        time: editActivity.time,
        image: updatedImage, // ✅ Ensure the image is included
      });

      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === updatedActivity._id ? updatedActivity : card
        )
      );

      setEditMode(false);
      setEditActivity(null);
    } catch (err) {
      console.error("Error updating activity", err);
    }
  };

  return (
    <div>
      <h1>DashBoard</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>
        Activity : {cards.length}{" "}
        <span>Success activity : {successActivity}</span>
      </p>
      <button onClick={() => setShowForm(true)}>Add Activity</button>
      {editMode && editActivity ? (
        <div>
          <h2>Edit Activity</h2>
          <label>Activity Name:</label>
          <select
            value={editActivity.activity}
            onChange={(e) =>
              setEditActivity({ ...editActivity, activity: e.target.value })
            }
          >
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Biking">Biking</option>
            <option value="Hiking">Hiking</option>
          </select>

          <label>Time (minutes):</label>
          <select
            type="number"
            value={editActivity.time}
            onChange={(e) =>
              setEditActivity({
                ...editActivity,
                time: parseInt(e.target.value),
              })
            }
          >
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

          <button onClick={handleUpdateActivity}>Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : null}

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
              <img
                className="activity-img"
                src={card.image ? card.image : "/default.png"}
                alt={card.activity}
              />
              <p>Time left: {formatTime(card.time)}</p>
              <button onClick={() => handleStartCountdown(card._id)}>
                {startActivity[card._id] ? "stop" : "Start timer"}
              </button>
              <button onClick={() => handleEditActivity(card)}>Edit</button>
              <button onClick={() => handleDeleteActivity(card._id)}>
                Delete
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
