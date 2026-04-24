"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
    );
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
        NeoChef stack
      </p>
      <h1
        ref={titleRef}
        className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl"
      >
        Next.js App Router + React TypeScript + Tailwind
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="max-w-2xl text-lg text-slate-300"
      >
        Framer Motion et GSAP sont installes et prets pour des animations UI.
      </motion.p>
    </main>
  );
}
