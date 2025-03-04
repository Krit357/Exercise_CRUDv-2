import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("JWT Secret:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", authRoutes);

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activity: String,
  image: String,
  time: Number,
  date: String,
  completed: Boolean,
});

const Activity = mongoose.model("Activity", activitySchema);

app.get("/", async (req, res) => {
  res.send("welcome to the internet");
});

app.post("/dashboard", async (req, res) => {
  const { userId, activity, image, time, date } = req.body;

  if (!userId) return res.status(400).json({ message: "Missing userId" });

  try {
    const newActivity = new Activity({
      userId, // ✅ Save userId
      activity,
      image,
      time,
      date,
      completed: false,
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: "Failed to add activity", error: err });
  }
});

app.get("/dashboard", async (req, res) => {
  const { userId } = req.query; // ✅ Get userId from query

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const activities = await Activity.find({ userId });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities", error: err });
  }
});

app.put("/dashboard/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid activity ID" });
  }
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        activity: req.body.activity,
        time: req.body.time,
        image: req.body.image, // ✅ Ensure the image is updated
      },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(updatedActivity);
  } catch (err) {
    res.status(500).json("Failed to update activity", err);
  }
});

app.delete("/dashboard/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Activity ID" });
  }

  try {
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete activity", error: err });
  }

  res.json({ message: "Activity deleted" });
});

//Login Page
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Connection Error", err));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
