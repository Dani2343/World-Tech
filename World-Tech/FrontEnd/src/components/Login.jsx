import { useState } from "react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [credentials, setCredentials] = useState({
    nombre: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? "/api/auth/register"
      : "/api/auth/login";

    try {
      const response = await fetch(
        `http://localhost:3001${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      if (isRegister) {
        setMessage("¡Cuenta creada con éxito!");
        setIsRegister(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage(
        `¡Bienvenido ${data.user.Nombre_Usuario}!`
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("No fue posible conectar con el servidor.");
    }
  };

  const azul = "#007bff";

  const cardStyle = {
    background: "#212529",
    color: "white",
    borderRadius: "15px",
    border: `1px solid ${azul}`,
    maxWidth: "500px",
  };

  const inputStyle = {
    background: "#2b3035",
    border: "1px solid #495057",
    color: "white",
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <style>{`
        .custom-input::placeholder{
          color:rgba(255,255,255,.7)!important;
        }
      `}</style>

      <div
        className="card p-4 shadow-lg w-100"
        style={cardStyle}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{ color: azul }}
        >
          {isRegister
            ? "Crear Cuenta"
            : "Iniciar Sesión"}
        </h2>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <>
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  name="nombre"
                  className="form-control custom-input"
                  style={inputStyle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Teléfono</label>
                <input
                  name="telefono"
                  className="form-control custom-input"
                  style={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control custom-input"
              style={inputStyle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              style={inputStyle}
              onChange={handleChange}
              required
            />
          </div>

          {isRegister && (
            <div className="mb-3">
              <label>Dirección</label>
              <input
                name="direccion"
                className="form-control custom-input"
                style={inputStyle}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            className="btn w-100 mt-3 fw-bold"
            style={{
              background: azul,
              color: "white",
            }}
          >
            {isRegister
              ? "Registrarse"
              : "Entrar"}
          </button>
        </form>

        <hr />

        <div className="text-center">
          <button
            className="btn btn-link text-decoration-none"
            style={{ color: azul }}
            onClick={() => {
              setMessage("");
              setIsRegister(!isRegister);
            }}
          >
            {isRegister
              ? "Ya tengo cuenta"
              : "Crear una cuenta"}
          </button>
        </div>

        {message && (
          <div
            className={`alert mt-3 text-center ${
              message.includes("Bienvenido") ||
              message.includes("éxito")
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;