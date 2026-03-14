import { useState } from "react";

export function AdminPanel({ devices, onUpdate }) {
  const [tab, setTab] = useState("add"); // 'add' o 'edit'
  const [selectedId, setSelectedId] = useState("");
  
  // Estado inicial con TODOS los campos de tu base de datos
  const initialState = {
    nombre: "", referencia: "", marca: "", tipo: "", 
    fecha: "", precio: "", stock: "", imagen: "", 
    descripcion: "", procesador: "", ram: "", 
    almacenamiento: "", camaras: "", bateria: "", conectividad: ""
  };

  const [form, setForm] = useState(initialState);

  // Al elegir un dispositivo para EDITAR
  const handleSelectEdit = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const dev = devices.find(d => d.ID_Dispositivo === parseInt(id));
    
    if (dev) {
      setForm({
        nombre: dev.Nombre_Dispositivo || "",
        referencia: dev.Referencia_Dispositivo || "",
        marca: dev.Marca_Dispositivo || "",
        tipo: dev.Tipo_Dispositivo || "",
        fecha: dev.Fecha_Lanzamiento ? dev.Fecha_Lanzamiento.split('T')[0] : "",
        precio: dev.Precio_Dispositivo || "",
        stock: dev.Stock_Dispositivo || "",
        imagen: dev.Imagen_URL || "",
        descripcion: dev.Descripcion_Dispositivo || "",
        // Aquí extraemos las specs si vienen de un JSON o campos sueltos
        procesador: dev.Procesador || "",
        ram: dev.RAM || "",
        almacenamiento: dev.Almacenamiento || "",
        camaras: dev.Camaras || "",
        bateria: dev.Bateria || "",
        conectividad: dev.Conectividad || ""
      });
    } else {
      setForm(initialState);
    }
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/devices';
    const method = action === 'edit' ? 'PUT' : 'POST';
    const finalUrl = action === 'edit' ? `${url}/${selectedId}` : url;

    try {
      const resp = await fetch(finalUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (resp.ok) {
        alert(`✅ Dispositivo ${action === 'edit' ? 'actualizado' : 'registrado'} correctamente`);
        if (action === 'add') setForm(initialState);
        onUpdate(); 
      }
    } catch (err) { console.error("Error en la petición:", err); }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este producto definitivamente?")) return;
    try {
      const resp = await fetch(`http://localhost:5000/api/devices/${selectedId}`, { method: 'DELETE' });
      if (resp.ok) {
        alert("🗑️ Dispositivo eliminado");
        setForm(initialState);
        setSelectedId("");
        onUpdate();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="card shadow-lg border-0 mb-5" style={{ backgroundColor: "#212529", color: "white", borderRadius: "15px" }}>
      {/* Pestañas Superiores */}
      <div className="card-header border-0 d-flex p-0 overflow-hidden" style={{ borderRadius: "15px 15px 0 0" }}>
        <button 
          className={`flex-fill py-3 border-0 fw-bold ${tab === 'add' ? 'bg-primary text-white' : 'bg-dark text-secondary'}`}
          onClick={() => { setTab('add'); setForm(initialState); setSelectedId(""); }}
        >
          ➕ AÑADIR NUEVO
        </button>
        <button 
          className={`flex-fill py-3 border-0 fw-bold ${tab === 'edit' ? 'bg-primary text-white' : 'bg-dark text-secondary'}`}
          onClick={() => setTab('edit')}
        >
          📝 EDITAR O ELIMINAR
        </button>
      </div>

      <div className="card-body p-4">
        {tab === 'edit' && (
          <div className="mb-4">
            <label className="form-label small text-info fw-bold">BUSCAR DISPOSITIVO PARA MODIFICAR</label>
            <select className="form-select bg-dark text-white border-secondary" value={selectedId} onChange={handleSelectEdit}>
              <option value="">Selecciona un equipo de la lista...</option>
              {devices.map(d => <option key={d.ID_Dispositivo} value={d.ID_Dispositivo}>{d.Nombre_Dispositivo} ({d.Referencia_Dispositivo})</option>)}
            </select>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, tab)}>
          <div className="row g-3">
            {/* --- SECCIÓN 1: GENERAL --- */}
            <div className="col-12"><h6 className="text-primary border-bottom border-secondary pb-2">📦 Información General</h6></div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">Nombre</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
            </div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">Referencia</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.referencia} onChange={e => setForm({...form, referencia: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">Imagen URL</label>
              <input type="text" className="form-control bg-secondary text-white border-0" placeholder="https://..." value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} />
            </div>
            <div className="col-md-3">
              <label className="form-label small opacity-75">Marca</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.marca} onChange={e => setForm({...form, marca: e.target.value})} />
            </div>
            <div className="col-md-3">
              <label className="form-label small opacity-75">Tipo</label>
              <select className="form-select bg-secondary text-white border-0" value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
                <option value="">Elegir...</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small opacity-75">Precio</label>
              <input type="number" className="form-control bg-secondary text-white border-0" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small opacity-75">Stock</label>
              <input type="number" className="form-control bg-secondary text-white border-0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
            </div>

            {/* --- SECCIÓN 2: ESPECIFICACIONES TÉCNICAS --- */}
            <div className="col-12 mt-4"><h6 className="text-primary border-bottom border-secondary pb-2">🛠️ Especificaciones Técnicas</h6></div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">Procesador</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.procesador} onChange={e => setForm({...form, procesador: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">RAM</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.ram} onChange={e => setForm({...form, ram: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label small opacity-75">Almacenamiento</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.almacenamiento} onChange={e => setForm({...form, almacenamiento: e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label small opacity-75">Cámaras</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.camaras} onChange={e => setForm({...form, camaras: e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label small opacity-75">Batería / Conectividad</label>
              <input type="text" className="form-control bg-secondary text-white border-0" value={form.bateria} onChange={e => setForm({...form, bateria: e.target.value})} />
            </div>

            <div className="col-12 mt-4">
              <div className="d-flex gap-2">
                <button type="submit" className={`btn ${tab === 'add' ? 'btn-primary' : 'btn-warning'} flex-grow-1 fw-bold`}>
                  {tab === 'add' ? 'REGISTRAR NUEVO EQUIPO' : 'GUARDAR CAMBIOS'}
                </button>
                {tab === 'edit' && selectedId && (
                  <button type="button" onClick={handleDelete} className="btn btn-danger fw-bold">ELIMINAR</button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}