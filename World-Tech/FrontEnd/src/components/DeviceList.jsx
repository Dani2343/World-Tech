export function DeviceList({ devices, select }) {
  
  // Función para dar formato al precio (Igual que en Detail)
  const formatPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio || 0);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
      {devices.map((device, index) => (
        <div className="col" key={device.ID_Dispositivo || index}>
          <div 
            className="card h-100 shadow-sm border-0 bg-dark text-white" 
            style={{ cursor: "pointer", borderRadius: "15px", transition: "transform 0.2s" }}
            onClick={() => select(device)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* Contenedor de Imagen */}
            <div className="p-3 text-center" style={{ backgroundColor: "#f8f9fa", borderRadius: "15px 15px 0 0" }}>
              <img
                src={device.Imagen_URL || device.image || "https://via.placeholder.com/200"}
                className="img-fluid"
                alt={device.Nombre_Dispositivo || device.name}
                style={{ height: "180px", objectFit: "contain" }}
              />
            </div>

            {/* Cuerpo de la Tarjeta */}
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title fw-bold mb-0">
                  {device.Nombre_Dispositivo || device.name}
                </h5>
                <span className="badge bg-primary">
                  {device.Marca_Dispositivo || device.brand}
                </span>
              </div>
              
              <p className="card-text text-secondary small flex-grow-1">
                {device.Tipo_Dispositivo || device.type} • {device.Referencia_Dispositivo || device.referencia || 'N/A'}
              </p>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="fs-5 fw-bold text-success">
                  {formatPrecio(device.Precio_Dispositivo || device.price)}
                </span>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {devices.length === 0 && (
        <div className="col-12 text-center py-5">
          <h4 className="text-muted">No se encontraron dispositivos en el inventario.</h4>
          <p>Usa el panel de administrador para añadir el primero.</p>
        </div>
      )}
    </div>
  );
}