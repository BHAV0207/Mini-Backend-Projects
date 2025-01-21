const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const User = require("../Models/User");

//fetching all taska
router.get("/get/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "user does not  exist" });
    }

    const tasks = await Task.find({ userId: userId });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// add a new task
router.post("/create", async (req, res) => {
  const { taskDescription, priority, userId } = req.body;

  if (!userId) {
    res.status(500).json({ message: "please enter a user taskId" });
  }

  try {
    //  checking if the user exist
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "please enter a valid userId" });
    }

    const duplicateTask = await Task.findOne({ taskDescription, userId });
    if (duplicateTask) {
      if (duplicateTask.taskDescription == taskDescription) {
        return res.status(400).json({ message: "Task already exists." });
      }
    }

    const newTask = new Task({
      taskDescription,
      priority,
      userId,
    });

    const savedTask = await newTask.save();

    user.taskArray.push(savedTask._id);
    await user.save();

    res
      .status(201)
      .json({
        message: "Task created successfully.",
        task: savedTask,
        user: user,
      });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "error catch in catch block." });
  }
});

// removing a task
router.delete("/delete/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await Task.findByIdAndDelete(taskId);

    await User.updateOne(
      { _id: task.userId },
      { $pull: { taskArray: taskId } }
    );
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// updating a task
router.put("/update/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { taskDescription, priority, status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) res.status(404).json({ mesaage: "please enter a valid id" });

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskDescription,
        priority,
        status,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
