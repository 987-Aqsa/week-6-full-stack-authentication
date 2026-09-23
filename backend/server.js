const cors = require("cors");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const authRoutes = require("./routes/auth");
const protect = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// MongoDB connection
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
    message: "Secure Full-Stack Task Manager API is running"
  });
});

// GET - all tasks of logged-in user
app.get("/api/tasks", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message
    });
  }
});

// GET - single task
app.get("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Invalid task ID"
    });
  }
});

// POST - create new task
app.post("/api/tasks", protect, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      completed: completed || false,
      user: req.user.userId
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

// PUT - update complete task
app.put("/api/tasks/:id", protect, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title: title.trim(),
        description: description.trim(),
        completed
      },
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

// PATCH - update task partially
app.patch("/api/tasks/:id", protect, async (req, res) => {
  try {
    const updates = {};

    if (req.body.title !== undefined) {
      if (!req.body.title.trim()) {
        return res.status(400).json({
          message: "Title cannot be empty"
        });
      }

      updates.title = req.body.title.trim();
    }

    if (req.body.description !== undefined) {
      if (!req.body.description.trim()) {
        return res.status(400).json({
          message: "Description cannot be empty"
        });
      }

      updates.description = req.body.description.trim();
    }

    if (req.body.completed !== undefined) {
      updates.completed = req.body.completed;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      updates,
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

// DELETE - delete task
app.delete("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

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
    res.status(400).json({
      message: "Invalid task ID"
    });
  }
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});