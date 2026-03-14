import { useState, useEffect } from "react";
import { devices as localDevices } from "./data/devices"; // Datos locales de respaldo
import { Filters } from "./components/Filters";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetail } from "./components/DeviceDetail";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel"; // El nuevo componente que creaste
import Login from "./components/login";

function App() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // --- NUEVO: ESTADO PARA DISPOSITIVOS DE LA BASE DE DATOS ---
  const [dbDevices, setDbDevices] = useState([]);

  // --- NUEVO: FUNCIÓN PARA TRAER DATOS DEL BACKEND ---
  const fetchDevices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/devices');
      const data = await response.json();
      setDbDevices(data);
    } catch (error) {
      console.error("Error al cargar dispositivos de la DB:", error);
      // Si falla la DB, usamos los locales para que no se vea vacío
      setDbDevices(localDevices);
    }
  };

  useEffect(() => {
    // Cargar usuario de sesión
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Cargar productos de la base de datos al iniciar
    fetchDevices();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogin(false);
    window.location.reload(); 
  };

  // FILTRAR (Ahora usamos dbDevices que vienen de la base de datos)
  let filtered = dbDevices.filter(d =>
    (d.Nombre_Dispositivo || d.name)?.toLowerCase().includes(search.toLowerCase()) &&
    (brand ? d.Marca_Dispositivo === brand || d.brand === brand : true) &&
    (type ? d.Tipo_Dispositivo === type || d.type === type : true)
  );

  // ORDENAR
  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.Fecha_Lanzamiento || b.releaseDate) - new Date(a.Fecha_Lanzamiento || a.releaseDate));
  }
  else if (sort === "oldest") {
    filtered.sort((a, b) => new Date(a.Fecha_Lanzamiento || a.releaseDate) - new Date(b.Fecha_Lanzamiento || b.releaseDate));
  }

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
        
        {showLogin && !user ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="text-end mb-2">
                <button className="btn-close" onClick={() => setShowLogin(false)} aria-label="Close"></button>
              </div>
              <Login />
            </div>
          </div>
        ) : (
          <>
            {user && (
              <div className={`alert ${user.correo === 'danyfel200511@gmail.com' ? 'alert-success' : 'alert-primary'} shadow-sm d-flex align-items-center`}>
                <span className="fs-5 me-2">
                  {user.correo === 'danyfel200511@gmail.com' ? '⚙️' : '👤'}
                </span>
                <div>
                  {user.correo === 'danyfel200511@gmail.com' ? (
                    <><strong>Modo Administrador:</strong> Bienvenido {user.nombre}. Control total de inventario activo.</>
                  ) : (
                    <><strong>Modo Cliente:</strong> Bienvenido {user.nombre}.</>
                  )}
                </div>
              </div>
            )}

            {/* --- SECCIÓN DE ADMINISTRACIÓN INTEGRADA --- */}
            {user?.correo === 'danyfel200511@gmail.com' && (
              <AdminPanel devices={dbDevices} onUpdate={fetchDevices} />
            )}

            {selected ? (
              <DeviceDetail
                device={selected}
                back={() => setSelected(null)}
              />
            ) : (
              <>
                <Filters
                  setBrand={setBrand}
                  setType={setType}
                  setSort={setSort}
                />

                <DeviceList
                  devices={filtered}
                  select={setSelected}
                />
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