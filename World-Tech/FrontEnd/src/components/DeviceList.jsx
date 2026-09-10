export function DeviceList({ devices, select }) {
  // ==========================================
  // FORMATEAR PRECIO EN PESOS COLOMBIANOS
  // ==========================================

  const formatPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(Number(precio) || 0);
  };

  // ==========================================
  // OBTENER URL DE LA IMAGEN
  // ==========================================

  const getImageUrl = (imagen) => {
    if (!imagen) {
      return "/assets/device1.jpg";
    }

    // Si la BD ya guarda la ruta completa
    if (imagen.startsWith("/")) {
      return imagen;
    }

    // Si la BD guarda solamente device1.jpg
    return `/assets/${imagen}`;
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
      {devices.map((device, index) => (
        <div
          className="col"
          key={device.ID_Dispositivo || index}
        >
          <div
            className="card h-100 shadow-sm border-0 bg-dark text-white"
            style={{
              cursor: "pointer",
              borderRadius: "15px",
              transition: "transform 0.2s",
            }}
            onClick={() => select(device)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* ==================================
                IMAGEN
            ================================== */}

            <div
              className="p-3 text-center"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <img
                src={getImageUrl(device.Imagen)}
                className="img-fluid"
                alt={device.Nombre_Dispositivo || "Dispositivo"}
                style={{
                  height: "180px",
                  width: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  // Evita errores infinitos si la imagen no existe
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/assets/device1.jpg";
                }}
              />
            </div>

            {/* ==================================
                CUERPO DE LA TARJETA
            ================================== */}

            <div className="card-body d-flex flex-column">

              {/* Nombre y marca */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title fw-bold mb-0">
                  {device.Nombre_Dispositivo}
                </h5>

                <span className="badge bg-primary ms-2">
                  {device.Marca_Dispositivo}
                </span>
              </div>

              {/* Tipo y referencia */}
              <p className="card-text text-secondary small flex-grow-1">
                {device.Tipo_Dispositivo}{" "}
                •{" "}
                {device.Referencia_Dispositivo || "N/A"}
              </p>

              {/* Precio y botón */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="fs-5 fw-bold text-success">
                  {formatPrecio(device.Precio)}
                </span>

                <button
                  className="btn btn-outline-primary btn-sm rounded-pill px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    select(device);
                  }}
                >
                  Ver detalles
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* ======================================
          SIN RESULTADOS
      ====================================== */}

      {devices.length === 0 && (
        <div className="col-12 text-center py-5">
          <h4 className="text-muted">
            No se encontraron dispositivos en el inventario.
          </h4>

          <p className="text-muted">
            Usa el panel de administrador para añadir el primero.
          </p>
        </div>
      )}
    </div>
  );
}