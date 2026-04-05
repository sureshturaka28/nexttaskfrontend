"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const fetchTasks = async () => {
    const res = await api.get(
      `/tasks?search=${search}&status=${status}&date=${date}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.replace("/login");

    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search, status, date]);

  const addTask = async () => {
    if (!title) return toast.error("Enter title");

    await api.post("/tasks", {
      title,
      description,
      priority,
      status: "todo",
    });

    setTitle("");
    setDescription("");
    toast.success("Task added");
    fetchTasks();
  };

  const updateTask = async (id: number, newStatus: string) => {
    await api.patch(`/tasks/${id}`, { status: newStatus });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.replace("/login");
  };

 
  const getPriorityColor = (p: string) => {
    if (p === "high") return "bg-red-500";
    if (p === "medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusColor = (s: string) => {
    if (s === "done") return "bg-green-600";
    // if (s === "progress") return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🚀 Task Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

    
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 p-4 rounded-xl shadow">
          Total: {tasks.length}
        </div>
        <div className="bg-yellow-500 p-4 rounded-xl shadow">
          Todo: {tasks.filter(t => t.status === "todo").length}
        </div>
        <div className="bg-green-500 p-4 rounded-xl shadow">
          Done: {tasks.filter(t => t.status === "done").length}
        </div>
      </div>

    
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">All</option>
          <option value="todo">Todo</option>
          {/* <option value="progress">Progress</option> */}
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
      </div>

     
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 space-y-3">
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <select
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-500 w-full py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

     
      <div className="grid gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h2 className="font-bold text-lg">{task.title}</h2>
              <p className="text-sm text-gray-400">{task.description}</p>

              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateTask(task.id, "done")}
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                Done
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}