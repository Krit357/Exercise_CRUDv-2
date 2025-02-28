import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

const activitySchema = new mongoose.Schema({
  activity: String,
  time: Number,
  date: String,
  completed: Boolean,
});

const Activity = mongoose.model("Activity", activitySchema);

app.get("/", async (req, res) => {
  res.send("welcome to the internet");
});

app.post("/dashboard", async (req, res) => {
  const newActivity = new Activity(req.body);
  await newActivity.save();
  res.status(201).json(newActivity);
});

app.get("/dashboard", async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

app.put("/dashboard/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Activity ID is required" });
  }

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
});

app.delete("/dashboard/:id", async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({ message: "Activity deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
