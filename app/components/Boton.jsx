"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Boton({ href, children, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.92 }}
      className="w-full flex justify-center"
    >
      <Link
        href={href}
        className="
          flex items-center justify-center gap-4
          bg-white text-black
          px-13 py-6      /* MÁS GRANDE */
          rounded-full
          text-2xl font-bold   /* TEXTO MÁS GRANDE */
          shadow-xl            /* Sombra más visible */
          border border-gray-200
          hover:bg-brand hover:text-white
          transition-all duration-300 ease-in-out
          no-underline select-none
        "
      >
        <span className="text-3xl">{icon}</span>   {/* ICONO MÁS GRANDE */}
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}





