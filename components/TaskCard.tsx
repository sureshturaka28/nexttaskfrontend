"use client";

import { motion } from "framer-motion";
import { Trash2, CheckCircle } from "lucide-react";
import api from "@/services/api";

export default function TaskCard({ task }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur border border-white/20"
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-400">{task.status}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => api.patch(`/tasks/${task.id}/toggle`)}
          className="text-green-400"
        >
          <CheckCircle size={20} />
        </button>

        <button
          onClick={() => api.delete(`/tasks/${task.id}`)}
          className="text-red-400"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
}