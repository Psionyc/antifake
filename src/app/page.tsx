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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/chat"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-lg font-medium text-black hover:bg-white sm:w-auto"
            >
              Enter <FiArrowUpRight />
            </Link>
            <Link
              href="/stats"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-lg font-medium text-white hover:bg-white/10 sm:mt-0 sm:w-auto"
            >
              Stats <FiArrowUpRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
