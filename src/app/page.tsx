"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden font-[family-name:var(--font-sans)]">
      <motion.div
        className="absolute inset-0 animated-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10 text-center text-white space-y-6">
        <motion.h1
          className="text-5xl sm:text-7xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Antifake
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Detecting Fake News For A Safer Future
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex justify-center gap-4">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-lg font-medium text-black hover:bg-white"
            >
              Enter <FiArrowUpRight />
            </Link>
            <Link
              href="/stats"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-lg font-medium text-black hover:bg-white"
            >
              Stats <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
