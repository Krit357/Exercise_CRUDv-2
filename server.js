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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

const activitySchema = new mongoose.Schema({
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
  const newActivity = new Activity(req.body);
  await newActivity.save();
  res.status(201).json(newActivity);
});

app.get("/dashboard", async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

app.put("/dashboard/:id", async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
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
  await Activity.findByIdAndDelete(req.params.id);
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
