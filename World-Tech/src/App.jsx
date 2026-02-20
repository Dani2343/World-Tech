import { useState } from "react";
import { devices } from "./data/devices"; // Aquí tu array de 60 dispositivos
import { Filters } from "./components/Filters";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetail } from "./components/DeviceDetail";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);

  // Filtrado por búsqueda, marca y tipo
  let filtered = devices.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (brand ? d.brand === brand : true) &&
    (type ? d.type === type : true)
  );

  // Ordenamiento por fecha
  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sort === "oldest") {
    filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

  return (
    <>
      {/* HEADER */}
      <Header 
        search={search} 
        setSearch={setSearch} 
        filter={brand} 
        setFilter={setBrand} 
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-4">
        {selected ? (
          <DeviceDetail device={selected} back={() => setSelected(null)} />
        ) : (
          <>
            <Filters setBrand={setBrand} setType={setType} setSort={setSort}/>
            <DeviceList devices={filtered} select={setSelected}/>
          </>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;