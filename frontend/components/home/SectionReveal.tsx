"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionReveal({
  children,
  className = "",
  y = 28,
  reveal = true
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  reveal?: boolean;
}) {
  if (!reveal) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
