const cors = require("cors");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const authRoutes = require("./routes/auth");
const protect = require("./middleware/authMiddleware");
const app = express();
app.use(cors());
// JSON data receive karne ke liye
app.use(express.json());
app.use("/api/auth", authRoutes);

// MongoDB se connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the MongoDB REST API"
  });
});

// GET - saare tasks
app.get("/api/tasks", protect, async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message
    });
  }
});

// GET - ek task
app.get("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving task",
      error: error.message
    });
  }
});

// POST - naya task
app.post("/api/tasks", protect, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      completed
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating task",
      error: error.message
    });
  }
});

// PUT - task update
app.put("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating task",
      error: error.message
    });
  }
});

// DELETE - task delete
app.delete("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message
    });
  }
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});