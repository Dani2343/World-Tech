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
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);

  // FILTRAR
  let filtered = devices.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) &&
    (brand ? d.brand === brand : true) &&
    (type ? d.type === type : true)
  );

  // ORDENAR
  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }
  else if (sort === "oldest") {
    filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        filter={brand}
        setFilter={setBrand}
      />

      <div className="container mt-4">
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
      </div>

      <Footer />
    </>
  );
}

export default App;