"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// 🔥 Firebase
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HacerPedido() {
  const [nombre, setNombre] = useState("");
  const [lavado, setLavado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  const requisitosCompletos =
    nombre.trim() !== "" &&
    lavado.trim() !== "" &&
    cantidad.trim() !== "" &&
    telefono.trim() !== "";

  const tipoLavadoOpciones = [
    { id: "completo", label: "Lavado Completo", emoji: "🧼" },
    { id: "externo", label: "Lavado Externo", emoji: "💧" },
  ];

  const obtenerUbicacion = () => {
    setCargandoUbicacion(true);

    if (!navigator.geolocation) {
      alert("La geolocalización no es soportada por este navegador.");
      setCargandoUbicacion(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const link = `https://www.google.com/maps/?q=${lat},${lng}`;
        setUbicacion(link);
        setCargandoUbicacion(false);
      },
      () => {
        alert("No se pudo obtener la ubicación.");
        setCargandoUbicacion(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const enviarPedido = async () => {
    if (!requisitosCompletos) return;

    try {
      await addDoc(collection(db, "pedidos"), {
        nombre,
        telefono,
        lavado,
        cantidad: Number(cantidad),
        ubicacion: ubicacion || null,
        estado: "pendiente",
        creadoEn: serverTimestamp(),
      });

      alert("✅ Pedido enviado correctamente");

      setNombre("");
      setTelefono("");
      setLavado("");
      setCantidad("");
      setUbicacion("");
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      alert("❌ Error al enviar el pedido");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#071028] to-[#071022] text-white flex justify-center">
      <div className="w-full max-w-md bg-[#07182a]/70 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/5">

        {/* 🔙 VOLVER */}
        <Link href="/" className="text-sm text-cyan-300 hover:underline">
          ← Volver
        </Link>

        <h1
          className="text-3xl font-extrabold text-center mb-4 mt-4"
          style={{ color: "#9ff0ff" }}
        >
          🧼 CalzaFresh — Hacer Pedido
        </h1>

        <p className="text-center text-sm text-white/70 mb-6">
          Rellena los campos obligatorios y confirma tu pedido.
        </p>

        {/* Nombre */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Nombre *
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#081826] border border-[#113244] outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
          />
        </div>

        {/* Teléfono */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Número de teléfono *
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 8888-8888"
            className="w-full p-3 rounded-xl bg-[#081826] border border-[#113244] outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
          />
        </div>

        {/* Tipo de lavado */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-3">
            Tipo de lavado *
          </label>

          <div className="flex flex-col gap-4">
            {tipoLavadoOpciones.map((op) => {
              const selected = lavado === op.id;
              return (
                <motion.button
                  key={op.id}
                  onClick={() => setLavado(op.id)}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all overflow-hidden
                    ${
                      selected
                        ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black border-cyan-300 shadow-[0_8px_30px_rgba(56,189,248,0.25)] scale-[1.03]"
                        : "bg-[#081826] border-[#123048] text-white hover:border-cyan-500"
                    }`}
                >
                  <span className="text-3xl">{op.emoji}</span>

                  <div className="flex-1 text-left">
                    <div className="text-lg font-semibold">
                      {op.label}
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      {op.id === "completo"
                        ? "Limpieza interna y externa, secado y desodorizado"
                        : "Limpieza exterior profesional"}
                    </div>
                  </div>

                  {selected && (
                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-black">
                      Seleccionado
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Cantidad */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Cantidad de pares *
          </label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#081826] border border-[#113244] outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
          />
        </div>

        {/* Ubicación */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Ubicación (opcional)
          </label>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={obtenerUbicacion}
              className="px-4 py-3 rounded-xl bg-cyan-500 text-black font-semibold shadow-md"
            >
              {cargandoUbicacion ? "Obteniendo..." : "Añadir ubicación"}
            </motion.button>

            {ubicacion && (
              <a
                href={ubicacion}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 underline text-sm"
              >
                Ver en Google Maps
              </a>
            )}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: requisitosCompletos ? 0.97 : 1 }}
          onClick={enviarPedido}
          disabled={!requisitosCompletos}
          className={`w-full py-4 rounded-2xl text-lg font-extrabold transition-all
            ${
              requisitosCompletos
                ? "bg-gradient-to-r from-green-400 to-green-600 text-black"
                : "bg-white/6 text-white/50 cursor-not-allowed"
            }`}
        >
          Enviar Pedido
        </motion.button>

        <p className="text-xs text-white/60 mt-3 text-center">
          * Campos obligatorios. La ubicación es opcional.
        </p>
      </div>
    </div>
  );
}
