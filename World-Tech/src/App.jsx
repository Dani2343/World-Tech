import { useState } from "react";
import { devices } from "./data/devices";
import { Filters } from "./components/Filters";
import { DeviceList } from "./components/DeviceList";
import { DeviceDetail } from "./components/DeviceDetail";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = devices.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (brand ? d.brand === brand : true) &&
    (type ? d.type === type : true)
  );

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
            <Filters setBrand={setBrand} setType={setType}/>
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