"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      /** Avoid negative margins: they break `whileInView` after browser back / scroll restore (content stays hidden). */
      viewport={{ once: true, amount: 0.01, margin: "0px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 22,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
