import React, { useEffect, useState } from "react";
import axios from "axios";

function ToDoList({ user }) {
  let [list, setList] = useState([]);
  let [task, setTask] = useState("");

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
  }, [user._id]);

  const handleChange = (e) => {
    setTask(() => e.target.value);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-6 w-4/5 md:w-1/2">
        <h1 className="text-2xl font-bold text-center mb-4">Your To-Do List</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            value={task}
            placeholder="Add your task"
            onChange={handleChange}
            className="w-full md:flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Task
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
          {list.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {list.map((task) => (
                <li
                  key={task._id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-lg">{task.taskDescription}</p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{task.status}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Priority:{" "}
                      <span
                        className={`capitalize ${
                          task.priority === "high"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No tasks yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
