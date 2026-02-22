export const metadata = {
  title: "CalzaFresh",
  description: "Servicio de lavado de calzado",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eaeaea",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* CONTENEDOR TIPO CELULAR */}
        <div
          style={{
            width: "100%",
            maxWidth: "430px", // Ancho típico de teléfono
            backgroundColor: "white",
            borderRadius: "25px", // Esquinas redondeadas estilo app
            padding: "20px",
            minHeight: "90vh",
            boxShadow: "0 4px 25px rgba(0,0,0,0.20)", // sombra bonita tipo teléfono
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
