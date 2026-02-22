export function DeviceDetail({ device, back }) {
  const headerGray = "#6c757d"; // Gris del header
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

  return (
    <div className="container mt-4">

      {/* BOTON VOLVER */}
      <button
        className="btn btn-warning mb-4 d-block text-start"
        onClick={back}
      >
        ← Volver
      </button>

      {/* TITULO */}
      <h2 className="text-primary fw-bold">{device.name}</h2>

      <div className="row">

        {/* IMAGEN */}
        <div className="col-12 text-center mb-4">
          <img
            src={device.image}
            alt={device.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>

        <h4 className="text-primary mb-2">{device.brand}</h4>

        {/* DESCRIPCION DEBAJO DEL TITULO */}
        <p className="mt-2 fs-5 text-white">
          {device.name} es un dispositivo tipo {device.type} fabricado por {device.brand},
          lanzado el {device.releaseDate}.
        </p>

        {/* INFO ABAJO */}
        <div className="col-12">

          <div style={listContainerStyle}>
            <ul style={{ paddingLeft: "0", marginBottom: "0", listStyle: "none" }}>
              <li style={listItemStyle}><strong>Tipo:</strong> {device.type}</li>
              <li style={listItemStyle}><strong>Lanzamiento:</strong> {device.releaseDate}</li>
              <li style={listItemStyle}><strong>Precio:</strong> ${device.price}</li>
            </ul>
          </div>

          {/* DETALLES */}
          <h5 className="mb-3 text-primary fw-bold">Detalles</h5>
          <div style={listContainerStyle}>
            <ul style={{ paddingLeft: "0", marginBottom: "0", listStyle: "none" }}>
              <li style={listItemStyle}>Marca: {device.brand}</li>
              <li style={listItemStyle}>Modelo: {device.name}</li>
              <li style={listItemStyle}>Categoría: {device.type}</li>
              <li style={listItemStyle}>Fecha: {device.releaseDate}</li>
            </ul>
          </div>

          {/* ESPECIFICACIONES TECNICAS */}
          {device.specs && (
            <>
              <h5 className="mb-3 text-primary fw-bold">Especificaciones técnicas</h5>

              {Object.entries(device.specs).map(([categoria, valores]) => (
                <div key={categoria} style={listContainerStyle}>
                  <h6 className="fw-bold text-primary">{categoria}</h6>
                  <ul style={{ paddingLeft: "0", marginBottom: "0", listStyle: "none" }}>
                    {typeof valores === "object"
                      ? Object.entries(valores).map(([label, value]) => (
                          <li key={label} style={listItemStyle}>
                            <strong>{label}:</strong> {value}
                          </li>
                        ))
                      : (
                        <li style={listItemStyle}>{valores}</li>
                      )
                    }
                  </ul>
                </div>
              ))}
            </>
          )}

        </div>
      </div>
    </div>
  );
}