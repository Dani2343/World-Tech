import { useState, useEffect } from "react";
import { Filters } from "./components/Filters";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetail } from "./components/DeviceDetail";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import Login from "./components/login";

function App() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // ==========================================
  // DISPOSITIVOS DESDE MARIADB
  // ==========================================

  const [dbDevices, setDbDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CARGAR DISPOSITIVOS
  // ==========================================

  const fetchDevices = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/api/devices");

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      setDbDevices(data);
    } catch (error) {
      console.error(
        "Error al cargar dispositivos desde MariaDB:",
        error
      );

      setDbDevices([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INICIALIZAR APP
  // ==========================================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(
          "Error al leer usuario guardado:",
          error
        );

        localStorage.removeItem("user");
      }
    }

    fetchDevices();
  }, []);

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogin(false);
    setSelected(null);
  };

  // ==========================================
  // FILTRAR DISPOSITIVOS
  // ==========================================

  let filtered = dbDevices.filter((device) => {
    const deviceName =
      device.Nombre_Dispositivo || "";

    const deviceBrand =
      device.Marca_Dispositivo || "";

    const deviceType =
      device.Tipo_Dispositivo || "";

    const matchesSearch = deviceName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBrand = brand
      ? deviceBrand === brand
      : true;

    const matchesType = type
      ? deviceType === type
      : true;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesType
    );
  });

  // ==========================================
  // ORDENAR POR FECHA
  // ==========================================

  if (sort === "newest") {
    filtered.sort(
      (a, b) =>
        new Date(b.Fecha_Lanzamiento) -
        new Date(a.Fecha_Lanzamiento)
    );
  }

  if (sort === "oldest") {
    filtered.sort(
      (a, b) =>
        new Date(a.Fecha_Lanzamiento) -
        new Date(b.Fecha_Lanzamiento)
    );
  }

  // ==========================================
  // VERIFICAR ADMINISTRADOR
  // ==========================================

  const isAdmin =
    user?.Rol === "ADMIN" ||
    user?.rol === "ADMIN";

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setShowLogin={setShowLogin}
        user={user}
        handleLogout={handleLogout}
      />

      <div className="container mt-4">

        {/* =====================================
            LOGIN
        ===================================== */}

        {showLogin && !user ? (
          <div className="row justify-content-center">
            <div className="col-md-6">

              <div className="text-end mb-2">
                <button
                  className="btn-close"
                  onClick={() =>
                    setShowLogin(false)
                  }
                  aria-label="Cerrar"
                ></button>
              </div>

              <Login />

            </div>
          </div>
        ) : (

          <>

            {/* =================================
                MENSAJE DE USUARIO
            ================================= */}

            {user && (
              <div
                className={`alert ${
                  isAdmin
                    ? "alert-success"
                    : "alert-primary"
                } shadow-sm d-flex align-items-center`}
              >
                <span className="fs-5 me-2">
                  {isAdmin ? "⚙️" : "👤"}
                </span>

                <div>
                  {isAdmin ? (
                    <>
                      <strong>
                        Modo Administrador:
                      </strong>{" "}
                      Bienvenido{" "}
                      {user.Nombre_Usuario ||
                        user.nombre}
                      .{" "}
                      Control de inventario activo.
                    </>
                  ) : (
                    <>
                      <strong>
                        Modo Cliente:
                      </strong>{" "}
                      Bienvenido{" "}
                      {user.Nombre_Usuario ||
                        user.nombre}
                      .
                    </>
                  )}
                </div>
              </div>
            )}

            {/* =================================
                DETALLE O LISTA
            ================================= */}

            {selected ? (

              // ==================================
              // DETALLE DEL DISPOSITIVO
              // ==================================

              <DeviceDetail
                device={selected}
                back={() => setSelected(null)}
              />

            ) : (

              // ==================================
              // LISTA PRINCIPAL
              // ==================================

              <>

                {/* ==============================
                    PANEL ADMINISTRADOR
                ============================== */}

                {isAdmin && (
                  <AdminPanel
                    devices={dbDevices}
                    onUpdate={fetchDevices}
                  />
                )}

                {/* ==============================
                    FILTROS
                ============================== */}

                <Filters
                  setBrand={setBrand}
                  setType={setType}
                  setSort={setSort}
                />

                {/* ==============================
                    CARGANDO
                ============================== */}

                {loading ? (

                  <div className="text-center my-5">

                    <div
                      className="spinner-border text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">
                        Cargando...
                      </span>
                    </div>

                    <p className="mt-3">
                      Cargando dispositivos desde
                      MariaDB...
                    </p>

                  </div>

                ) : (

                  // ================================
                  // LISTA DE DISPOSITIVOS
                  // ================================

                  <DeviceList
                    devices={filtered}
                    select={setSelected}
                  />

                )}

              </>

            )}

          </>

        )}

      </div>

      <Footer />
    </>
  );
}

export default App;