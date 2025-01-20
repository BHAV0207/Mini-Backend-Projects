const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const User = require("../Models/User");

// add a new task
router.post("/create", async (req, res) => {
  const { taskTitle, taskDescription, priority, userId } = req.body;

  if (!userId) {
    res.status(500).json({ message: "please enter a user taskId" });
  }

  try {
    //  checking if the user exist
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "please enter a valid userId" });
    }

    const duplicateTask = await Task.findOne({ taskTitle, userId });
    if (duplicateTask) {
      if (duplicateTask.taskDescription !== taskDescription) {
        return res.status(400).json({
          message:
            "A task with the same title already exists with a different description.",
        });
      } else {
        return res.status(400).json({ message: "Task already exists." });
      }
    }

    const newTask = new Task({
      taskTitle,
      taskDescription,
      priority,
      userId,
    });

    const savedTask = await newTask.save();

    user.taskArray.push(savedTask._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Task created successfully.", task: savedTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Internal server error." });
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
  const { taskTitle, taskDescription, priority , status} = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) res.status(404).json({ mesaage: "please enter a valid id" });

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskTitle,
        taskDescription,
        priority,
        status
      },
      { new: true } 
    );

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
