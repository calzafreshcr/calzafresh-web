"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Ingresá tu correo");
      return;
    }

    // Firebase va aquí en el siguiente paso
    alert("Luego enviaremos el enlace al correo");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CalzaFresh</h1>
      <p>Ingresá tu correo para continuar</p>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Enviar enlace
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f3f3",
    padding: "20px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    background: "#0077ff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};
