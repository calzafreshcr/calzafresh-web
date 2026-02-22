"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Link from "next/link";

export default function EstadoPedido() {
  const [telefono, setTelefono] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [detallesAbiertos, setDetallesAbiertos] = useState(null);

  const buscarPedidos = async () => {
    if (!telefono.trim()) return;

    setBuscando(true);
    setPedidos([]);

    try {
      const q = query(
        collection(db, "pedidos"),
        where("telefono", "==", telefono)
      );

      const snapshot = await getDocs(q);

      const resultados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPedidos(resultados);
    } catch (error) {
      console.error("Error al buscar pedidos:", error);
    }

    setBuscando(false);
  };

  const toggleDetalles = (id) => {
    setDetallesAbiertos(detallesAbiertos === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">

      {/* 🔙 VOLVER */}
      <Link href="/" className="text-sm text-brand hover:underline">
        ← Volver
      </Link>

      <h1 className="text-4xl font-extrabold text-brand text-center mb-10 mt-4">
        🧼 Estado del Pedido
      </h1>

      {/* Buscador */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="tel"
          placeholder="Ingresa tu número de teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-lg"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={buscarPedidos}
          className="w-full bg-brand text-white py-3 rounded-xl font-bold text-lg shadow"
        >
          {buscando ? "Buscando..." : "Ver mis pedidos"}
        </motion.button>
      </div>

      {!buscando && pedidos.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No hay pedidos para este número.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {pedidos.map((pedido) => (
          <motion.div
            key={pedido.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 rounded-3xl shadow-xl p-6 border border-gray-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xl font-bold text-brand">
                  Pedido #{pedido.id.slice(0, 6)}
                </p>
                <p className="font-semibold mt-1 text-gray-600">
                  {pedido.estado || "Recibido"}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleDetalles(pedido.id)}
                className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-bold shadow"
              >
                {detallesAbiertos === pedido.id
                  ? "Ocultar ▲"
                  : "Ver Detalles 🔍"}
              </motion.button>
            </div>

            <AnimatePresence>
              {detallesAbiertos === pedido.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 mt-2">
                    <p>🧽 Lavado: {pedido.lavado}</p>
                    <p>👟 Cantidad: {pedido.cantidad} pares</p>
                    {pedido.ubicacion && (
                      <a
                        href={pedido.ubicacion}
                        target="_blank"
                        className="text-brand underline"
                      >
                        📍 Ver ubicación
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
