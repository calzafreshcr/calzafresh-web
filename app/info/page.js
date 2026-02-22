"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Link from "next/link";

export default function Info() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "mensajes"), {
        nombre,
        telefono,
        mensaje,
        fecha: serverTimestamp(),
      });

      alert("Mensaje enviado correctamente");
      setNombre("");
      setTelefono("");
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">

      {/* 🔙 VOLVER */}
      <Link href="/" className="text-sm text-brand hover:underline">
        ← Volver
      </Link>

      <h1 className="text-center text-4xl font-extrabold text-brand mb-10 mt-4">
        Contáctanos
      </h1>

      <p className="text-center text-lg mb-12">
        ¿Tenés dudas o necesitás comunicarte con CalzaFresh?
        Aquí podés escribirnos directamente o contactarnos por WhatsApp.
      </p>

      {/* Tarjeta de Información */}
      <div className="bg-gray-100 p-6 rounded-2xl shadow-md max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-4">Información de contacto</h2>

        <p className="mb-2">
          📞 <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/50671886606"
            target="_blank"
            className="text-green-600 underline"
          >
            +506 71886606
          </a>
        </p>

        <p className="mb-2">
          📧 <strong>Correo:</strong> jhossel.su@hotmail.com
        </p>

        <p className="mb-4">
          📍 <strong>Zona de servicio:</strong> Cartago (Costa Rica)
        </p>

        <a
          href="https://wa.me/50671886606"
          target="_blank"
          className="inline-block bg-green-500 text-white px-5 py-3 rounded-xl font-bold shadow hover:bg-green-600 transition"
        >
          Escribir por WhatsApp
        </a>
      </div>

      {/* Formulario */}
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-5">Envíanos un mensaje</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            placeholder="Tu nombre"
          />

          <label className="block mb-2 font-semibold">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            placeholder="Tu número"
          />

          <label className="block mb-2 font-semibold">Mensaje</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 h-32"
            placeholder="¿En qué podemos ayudarte?"
          />

          <button
            type="submit"
            className="bg-brand text-white px-6 py-3 rounded-xl font-bold shadow hover:opacity-90 transition w-full"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
