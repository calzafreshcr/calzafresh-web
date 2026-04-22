export default function Precios() {
  return (
    <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-8">Nuestros Precios 💰</h1>

      <div className="grid gap-6 w-full max-w-md">

        {/* Lavado Externo */}
        <div className="border rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-2">Lavado Externo</h2>
          <p className="text-gray-600 mb-3">Limpieza exterior del calzado</p>
          <p className="text-2xl font-bold text-green-600">₡3,000</p>
        </div>

        {/* Lavado Completo */}
        <div className="border rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-2">Lavado Completo</h2>
          <p className="text-gray-600 mb-3">Interior + exterior + desinfección</p>
          <p className="text-2xl font-bold text-green-600">₡4,000</p>
        </div>

        {/* Calzado de Niño */}
        <div className="border rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-2">Calzado de Niñ@</h2>
          <p className="text-gray-600 mb-3">Servicio especial para calzado infantil</p>
          <p className="text-2xl font-bold text-green-600">₡3,000</p>
        </div>

      </div>

      {/* Nota informativa */}
      <div className="mt-8 text-center text-sm text-gray-600 max-w-md">
        <p>
          *El servicio de recolección y entrega están incluidos dentro del pedido*
          * Consulte por precios especiales por mas de 1 par al pedido* 
        </p>
      </div>

    </div>
  );
}