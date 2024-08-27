const express = require("express");
const Task = require("../models/taskSchema");
const User = require("../models/userSchema");
const auth = require("../middlewares/auth");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// Add a new task

router.post("/task", auth, async (req, res) => {
  const {
    taskName,
    description,
    assignedTo,
    assignedBy,
    dueDate,
    dueTime, // Ensure this is included
    durations, // Ensure this is included
    status,
    priority,
    type,
  } = req.body;
  console.log("Creating Task... ");

  try {
    // Validate required fields
    if (!assignedTo) {
      return res.status(400).json({ message: "AssignedTo field is required" });
    }

    // Construct the taskData object
    const taskData = {
      taskName,
      description,
      assignedTo,
      assignedBy,
      dueDate, // Use the combined Date object
      dueTime, // Assign the same Date object for dueTime
      durations,
      status,
      priority,
      type,
    };

    console.log(`taskData: ${JSON.stringify(taskData)}`); // For debugging

    // if (assignedBy && mongoose.Types.ObjectId.isValid(assignedBy)) {
    //   taskData.assignedBy = assignedBy;
    // }

    // Create a new task
    const task = new Task(taskData);
    const savedTask = await task.save();

    // Find the assigned patient
    const patient = await User.findById(assignedTo);
    if (!patient) {
      return res.status(404).json({ message: "Assigned patient not found" });
    }
    patient.task.push(savedTask._id);
    await patient.save();

    // Update assigner tasks if assignedBy is valid and exists
    if (taskData.assignedBy) {
      const assigner = await User.findById(assignedBy);
      if (!assigner) {
        return res.status(404).json({ message: "Assigner not found" });
      }
      assigner.task.push(savedTask._id);
      await assigner.save();
    }

    // Respond with the created task
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedTo assignedBy",
      "-password"
    );
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a task by ID
router.get("/task/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate(
      "assignedTo assignedBy",
      "-password"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task by ID
router.put("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  const {
    taskName,
    description,
    dueDate,
    dueTime,
    durations,
    status,
    priority,
    type,
  } = req.body;
  console.log("taskName: ", taskName);
  console.log("dueDate: ", dueDate);
  console.log("dueTime: ", dueTime);
  console.log("durations: ", durations);
  console.log("status: ", status);
  console.log("priority: ", priority);
  console.log("type: ", type);
  console.log("id: ", id);
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (taskName) task.taskName = taskName;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (type) task.type = type;
    if (dueTime) task.dueTime = dueTime;
    if (durations) task.durations = durations;

    await task.save();
    console.log(`Task saved ${task}`);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a task by ID
router.delete("/task/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks for a specific date
router.get("/date/:date", auth, async (req, res) => {
  const { date } = req.params;

  try {
    const tasks = await Task.find({
      dueDate: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    }).populate("assignedTo assignedBy", "-password");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
