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
          <span className="navbar-brand mb-0 h1 fs-3">
          </span>
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
        <div className="d-flex gap-2">

          <button className="btn btn-outline-light">
            👤 Mi cuenta
          </button>

          <button className="btn btn-warning">
            🛒 Carrito
          </button>

        </div>

      </div>
    </nav>
  );
}