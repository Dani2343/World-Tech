import { useState } from "react";

export function AdminPanel({ devices, onUpdate }) {
  const [tab, setTab] = useState("add");
  const [selectedId, setSelectedId] = useState("");

  const initialState = {
    nombre: "",
    referencia: "",
    marca: "Samsung",
    tipo: "Celular",
    fecha: "",
    precio: "",
    stock: 0,
    imagen: "",
    descripcion: "",
    pantalla: "",
    procesador: "",
    ram: "",
    almacenamiento: "",
    camaras: "",
    bateria: "",
    conectividad: "",
    graficos: ""
  };

  const [form, setForm] = useState(initialState);

  const marcas = [
    "Samsung","Apple","Xiaomi","Motorola","Huawei",
    "Lenovo","HP","Dell","Asus","Acer"
  ];

  const handleSelectEdit = async (e) => {
    const id = Number(e.target.value);
    setSelectedId(id);

    if (!id) {
      setForm(initialState);
      return;
    }

    try {
      const resp = await fetch(`http://localhost:3001/api/devices/${id}`);
      const data = await resp.json();

      setForm({
        nombre: data.Nombre_Dispositivo || "",
        referencia: data.Referencia_Dispositivo || "",
        marca: data.Marca_Dispositivo || "Samsung",
        tipo: data.Tipo_Dispositivo || "Celular",
        fecha: data.Fecha_Lanzamiento
          ? data.Fecha_Lanzamiento.split("T")[0]
          : "",
        precio: data.Precio || "",
        stock: data.Stock_Dispositivo || 0,
        imagen: data.Imagen || "",
        descripcion: data.Descripcion || "",
        pantalla: data.specs?.Pantalla || "",
        procesador: data.specs?.Procesador || "",
        ram: data.specs?.RAM || "",
        almacenamiento: data.specs?.Almacenamiento || "",
        camaras: data.specs?.Camaras || "",
        bateria: data.specs?.Bateria || "",
        conectividad: data.specs?.Conectividad || "",
        graficos: data.specs?.Graficos || ""
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      tab === "add"
        ? "http://localhost:3001/api/devices"
        : `http://localhost:3001/api/devices/${selectedId}`;

    const method = tab === "add" ? "POST" : "PUT";

    try {
      const resp = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert(data.message);
        return;
      }

      alert(
        tab === "add"
          ? "✅ Dispositivo agregado"
          : "✅ Dispositivo actualizado"
      );

      setForm(initialState);
      setSelectedId("");
      setTab("add");
      onUpdate();

    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    if (!window.confirm("¿Eliminar este dispositivo?")) return;

    try {
      const resp = await fetch(
        `http://localhost:3001/api/devices/${selectedId}`,
        {
          method: "DELETE"
        }
      );

      if (!resp.ok) {
        alert("No fue posible eliminar.");
        return;
      }

      alert("🗑️ Dispositivo eliminado");

      setForm(initialState);
      setSelectedId("");
      setTab("add");
      onUpdate();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="card shadow-lg border-0 mb-5"
      style={{
        background: "#212529",
        color: "white",
        borderRadius: "15px"
      }}
    >
      <div className="card-header d-flex p-0 border-0">
        <button
          className={`flex-fill btn ${
            tab === "add"
              ? "btn-primary"
              : "btn-dark"
          }`}
          onClick={() => {
            setTab("add");
            setSelectedId("");
            setForm(initialState);
          }}
        >
          ➕ Añadir
        </button>

        <button
          className={`flex-fill btn ${
            tab === "edit"
              ? "btn-primary"
              : "btn-dark"
          }`}
          onClick={() => setTab("edit")}
        >
          📝 Editar / Eliminar
        </button>
      </div>

      <div className="card-body">

        {tab === "edit" && (
          <div className="mb-4">
            <label>Seleccionar dispositivo</label>

            <select
              className="form-select bg-dark text-white"
              value={selectedId}
              onChange={handleSelectEdit}
            >
              <option value="">
                Elegir...
              </option>

              {devices.map((d) => (
                <option
                  key={d.ID_Dispositivo}
                  value={d.ID_Dispositivo}
                >
                  {d.Nombre_Dispositivo}
                </option>
              ))}
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-12">
              <h5 className="text-info">
                Información General
              </h5>
            </div>

            <div className="col-md-6">
              <label>Nombre</label>
              <input
                className="form-control"
                value={form.nombre}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nombre: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label>Referencia</label>
              <input
                className="form-control"
                value={form.referencia}
                onChange={(e) =>
                  setForm({
                    ...form,
                    referencia: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Marca</label>
              <select
                className="form-select"
                value={form.marca}
                onChange={(e) =>
                  setForm({
                    ...form,
                    marca: e.target.value
                  })
                }
              >
                {marcas.map((m) => (
                  <option key={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label>Tipo</label>
              <select
                className="form-select"
                value={form.tipo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tipo: e.target.value
                  })
                }
              >
                <option value="Celular">
                  Celular
                </option>
                <option value="Tablet">
                  Tablet
                </option>
                <option value="Portatil">
                  Portátil
                </option>
              </select>
            </div>

            <div className="col-md-4">
              <label>Precio</label>
              <input
                type="number"
                className="form-control"
                value={form.precio}
                onChange={(e) =>
                  setForm({
                    ...form,
                    precio: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Imagen</label>
              <input
                className="form-control"
                placeholder="device1.jpg o laptop1.jpg"
                value={form.imagen}
                onChange={(e) =>
                  setForm({
                    ...form,
                    imagen: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Fecha</label>
              <input
                type="date"
                className="form-control"
                value={form.fecha}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fecha: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12">
              <label>Descripción</label>
              <textarea
                className="form-control"
                rows="2"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descripcion: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12 mt-4">
              <h5 className="text-info">
                Especificaciones
              </h5>
            </div>

            <div className="col-md-6">
              <label>Pantalla</label>
              <input
                className="form-control"
                value={form.pantalla}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pantalla: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>Procesador</label>
              <input
                className="form-control"
                value={form.procesador}
                onChange={(e) =>
                  setForm({
                    ...form,
                    procesador: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <label>RAM</label>
              <input
                className="form-control"
                value={form.ram}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ram: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Almacenamiento</label>
              <input
                className="form-control"
                value={form.almacenamiento}
                onChange={(e) =>
                  setForm({
                    ...form,
                    almacenamiento: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <label>Batería</label>
              <input
                className="form-control"
                value={form.bateria}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bateria: e.target.value
                  })
                }
              />
            </div>

            {(form.tipo === "Celular" ||
              form.tipo === "Tablet") && (
              <div className="col-md-6">
                <label>Cámaras</label>
                <input
                  className="form-control"
                  value={form.camaras}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      camaras: e.target.value
                    })
                  }
                />
              </div>
            )}

            {form.tipo === "Portatil" && (
              <div className="col-md-6">
                <label>Gráficos</label>
                <input
                  className="form-control"
                  value={form.graficos}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      graficos: e.target.value
                    })
                  }
                />
              </div>
            )}

            <div className="col-md-6">
              <label>Conectividad</label>
              <input
                className="form-control"
                value={form.conectividad}
                onChange={(e) =>
                  setForm({
                    ...form,
                    conectividad: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12 d-flex gap-2 mt-4">
              <button
                className={`btn ${
                  tab === "add"
                    ? "btn-primary"
                    : "btn-warning"
                } flex-fill`}
              >
                {tab === "add"
                  ? "Registrar equipo"
                  : "Guardar cambios"}
              </button>

              {tab === "edit" &&
                selectedId && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}