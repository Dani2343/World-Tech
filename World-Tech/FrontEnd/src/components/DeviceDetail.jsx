export function DeviceDetail({ device, back }) {
  const headerGray = "#6c757d"; // Gris del header que ya usabas

  const listContainerStyle = {
    backgroundColor: headerGray,
    color: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
  };

  const listItemStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    padding: "5px 0"
  };

  // Función para formatear el precio a moneda colombiana
  const formatPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">

      {/* BOTON VOLVER */}
      <button
        className="btn btn-warning mb-4 d-block text-start shadow-sm"
        onClick={back}
      >
        ← Volver al listado
      </button>

      {/* TITULO - Soporta nombre de DB o Local */}
      <h2 className="text-primary fw-bold">
        {device.Nombre_Dispositivo || device.name}
      </h2>

      <div className="row">

        {/* IMAGEN - Soporta URL de DB o Local */}
        <div className="col-12 text-center mb-4">
          <img
            src={device.Imagen_URL || device.image || "https://via.placeholder.com/350"}
            alt={device.Nombre_Dispositivo || device.name}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "350px", objectFit: "contain", backgroundColor: "#fff" }}
          />
        </div>

        <h4 className="text-primary mb-2">{device.Marca_Dispositivo || device.brand}</h4>

        {/* DESCRIPCION DINAMICA */}
        <p className="mt-2 fs-5 text-white">
          {device.Nombre_Dispositivo || device.name} es un dispositivo tipo {device.Tipo_Dispositivo || device.type} 
          {device.Marca_Dispositivo || device.brand ? ` fabricado por ${device.Marca_Dispositivo || device.brand}` : ''}.
        </p>

        {/* INFO BASICA */}
        <div className="col-12">
          <div style={listContainerStyle}>
            <ul style={{ paddingLeft: "0", marginBottom: "0", listStyle: "none" }}>
              <li style={listItemStyle}>
                <strong>Precio:</strong> {formatPrecio(device.Precio_Dispositivo || device.price)}
              </li>
              <li style={listItemStyle}>
                <strong>Referencia:</strong> {device.Referencia_Dispositivo || device.referencia || 'N/A'}
              </li>
              <li style={listItemStyle}>
                <strong>Stock disponible:</strong> {device.Stock_Dispositivo || 'Consultar'} unidades
              </li>
            </ul>
          </div>

          {/* DESCRIPCION DETALLADA (Si existe en DB) */}
          {(device.Descripcion_Dispositivo || device.description) && (
            <>
              <h5 className="mb-3 text-primary fw-bold">Descripción</h5>
              <div style={listContainerStyle}>
                <p className="mb-0">{device.Descripcion_Dispositivo || device.description}</p>
              </div>
            </>
          )}

          {/* ESPECIFICACIONES TÉCNICAS (Nuevos campos de la DB) */}
          <h5 className="mb-3 text-primary fw-bold">Ficha Técnica</h5>
          <div style={listContainerStyle}>
            <ul style={{ paddingLeft: "0", marginBottom: "0", listStyle: "none" }}>
              {device.Procesador && <li style={listItemStyle}><strong>Procesador:</strong> {device.Procesador}</li>}
              {device.RAM && <li style={listItemStyle}><strong>Memoria RAM:</strong> {device.RAM}</li>}
              {device.Almacenamiento && <li style={listItemStyle}><strong>Almacenamiento:</strong> {device.Almacenamiento}</li>}
              {device.Camaras && <li style={listItemStyle}><strong>Cámaras:</strong> {device.Camaras}</li>}
              {device.Bateria && <li style={listItemStyle}><strong>Batería:</strong> {device.Bateria}</li>}
              {device.Conectividad && <li style={listItemStyle}><strong>Conectividad:</strong> {device.Conectividad}</li>}
              
              {/* Soporte para el objeto 'specs' antiguo del archivo local */}
              {!device.Procesador && device.specs && Object.entries(device.specs).map(([categoria, valores]) => (
                <li key={categoria} style={listItemStyle}>
                   <strong>{categoria}:</strong> {typeof valores === "object" ? "Ver detalles" : valores}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary btn-lg w-100 mt-2 mb-5 shadow">
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}