"use client";
import Boton from "./components/Boton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-6">

      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        Bienvenido a CalzaFresh <span className="text-4xl">👟✨</span>
      </h1>

      <div className="flex flex-col items-center gap-5">
        <Boton href="/hacer-pedido" icon="👟">
          Hacer Pedido
        </Boton>

        <Boton href="/estado-pedido" icon="📋">
          Estado de mi Pedido
        </Boton>

        <Boton href="/info" icon="ℹ️">
          Información / Contáctanos
        </Boton>
      </div>

    </main>
  );
}












