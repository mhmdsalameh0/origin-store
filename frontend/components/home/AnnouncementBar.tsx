"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  const message = "★ Get 30% off your first order! ★";

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-9 overflow-hidden bg-origin-green text-origin-paper"
      initial={{ y: -36 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="flex h-full min-w-max items-center gap-5 whitespace-nowrap text-[12px] font-bold"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index}>{message}</span>
        ))}
      </motion.div>
    </motion.div>
  );
}
