import { useState } from "react";
import logo from "../assets/LogoWorldTech.png";

export function Header({ search, setSearch, setShowLogin, user, handleLogout }) {
  const azulWorldTech = '#007bff';
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-dark w-100 px-4 shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo */}
        <div 
          className="d-flex align-items-center gap-2" 
          style={{ cursor: "pointer" }} 
          onClick={() => { setShowLogin(false); window.scrollTo(0, 0); }}
        >
          <img src={logo} alt="logo" style={{ height: "60px", objectFit: "contain" }} />
        </div>

        {/* Buscador */}
        <div style={{ width: "40%" }}>
          <input
            className="form-control"
            placeholder="Buscar dispositivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="d-flex gap-2 align-items-center position-relative">

          {user ? (
            <div className="d-flex align-items-center gap-2">
              {/* Botón con el nombre del usuario */}
              <button 
                className="btn btn-outline-info text-white d-flex align-items-center gap-1" 
                style={{ borderColor: azulWorldTech }}
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                👤 {user.nombre}
              </button>

              {/* Botón de Salir - Ahora igual al de Carrito (sin btn-sm) */}
              <button 
                className="btn btn-danger d-flex align-items-center"
                onClick={() => {
                   if(window.confirm("¿Seguro que quieres cerrar sesión?")) {
                      handleLogout();
                   }
                }}
              >
                Salir
              </button>
            </div>
          ) : (
            <button className="btn btn-outline-light d-flex align-items-center" onClick={() => setShowLogin(true)}>
              👤 Mi cuenta
            </button>
          )}

          {/* Botón de Carrito - Referencia de tamaño */}
          <button className="btn d-flex align-items-center gap-1" style={{ backgroundColor: azulWorldTech, color: 'white' }}>
            🛒 Carrito
          </button>
        </div>
      </div>
    </nav>
  );
}