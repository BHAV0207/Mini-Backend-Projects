import React, { useEffect, useState } from "react";
import axios from "axios";

function ToDoList({ user }) {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [updateTask, setUpdateTask] = useState({
    taskDescription: "",
    priority: "low",
    status: "notCompleted",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks/get/${user._id}`
        );
        setList(res.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [user]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks/create", {
        taskDescription: task,
        userId: user._id,
      });

      setList((prevList) => [...prevList, res.data.task]);
      setTask("");
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);
      setList((prevList) => prevList.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/update/${updateTaskId}`,
        updateTask
      );

      setList((prevList) =>
        prevList.map((task) =>
          task._id === updateTaskId ? { ...task, ...res.data.task } : task
        )
      );

      setUpdateTaskId(null);
      setUpdateTask({ taskDescription: "", priority: "low", status: "notCompleted" });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="bg-white text-gray-800 shadow-lg rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">To-Do List</h1>
        <div className="mt-6 flex items-center gap-4">
          <input
            type="text"
            value={task}
            placeholder="Enter a task..."
            onChange={handleChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white shadow-md transition focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
          {list.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {list.map((task) => (
                <li
                  key={task._id}
                  className="p-4 flex justify-between items-center bg-gray-100 rounded-lg shadow-md mb-3"
                >
                  <div>
                    <p className="font-medium text-lg">{task.taskDescription}</p>
                    <p className="text-sm text-gray-500">
                      Priority:{" "}
                      <span
                        className={`font-semibold ${
                          task.priority === "high" ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          task.status === "completed" ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setUpdateTaskId(task._id);
                        setUpdateTask(task);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No tasks yet. Add one!</p>
          )}
        </div>
        {updateTaskId && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Update Task</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Task Description</label>
              <input
                type="text"
                name="taskDescription"
                value={updateTask.taskDescription}
                onChange={(e) =>
                  setUpdateTask((prev) => ({ ...prev, taskDescription: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Priority</label>
              <select
                name="priority"
                value={updateTask.priority}
                onChange={(e) =>
                  setUpdateTask((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <select
                name="status"
                value={updateTask.status}
                onChange={(e) =>
                  setUpdateTask((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="notCompleted">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={handleUpdateSubmit}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
