import logo from "../assets/LogoWorldTech.png";

export function Header({ search, setSearch }) {
  return (
    <nav className="navbar navbar-dark bg-dark w-100 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo + nombre */}
        <div className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="logo"
            style={{ height: "60px", objectFit: "contain" }}
          />
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

        {/* Acciones usuario */}
        <div className="d-flex gap-4 text-white fw-semibold">

          <span style={{ cursor: "pointer" }}>
            🛒 Carrito
          </span>

          <span style={{ cursor: "pointer" }}>
            👤 Mi cuenta
          </span>



        </div>

      </div>
    </nav>
  );
}