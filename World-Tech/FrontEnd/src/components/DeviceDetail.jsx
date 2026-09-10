// src/components/DeviceDetail.jsx

import { useEffect, useState } from "react";

export function DeviceDetail({ device, back }) {
  const headerGray = "#6c757d";

  const [detail, setDetail] = useState(device);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // ESTILOS
  // ==========================================

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
    padding: "5px 0",
  };

  // ==========================================
  // FORMATEAR PRECIO
  // ==========================================

  const formatPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(Number(precio) || 0);
  };

  // ==========================================
  // CARGAR DETALLE DESDE EL BACKEND
  // ==========================================

  useEffect(() => {
    const fetchDetail = async () => {
      if (!device?.ID_Dispositivo) {
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:3001/api/devices/${device.ID_Dispositivo}`
        );

        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Detalle recibido desde MariaDB:",
          data
        );

        setDetail(data);
      } catch (error) {
        console.error(
          "Error al cargar el detalle del dispositivo:",
          error
        );

        // Conservamos los datos que ya teníamos
        setDetail(device);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [device]);

  // ==========================================
  // DATOS DEL DISPOSITIVO
  // ==========================================

  const nombre =
    detail?.Nombre_Dispositivo || "Dispositivo";

  const marca =
    detail?.Marca_Dispositivo || "Marca no disponible";

  const tipo =
    detail?.Tipo_Dispositivo || "Tipo no disponible";

  const referencia =
    detail?.Referencia_Dispositivo || "N/A";

  const precio =
    detail?.Precio ?? 0;

  const imagen = detail?.Imagen
    ? detail.Imagen.startsWith("/")
      ? detail.Imagen
      : `/assets/${detail.Imagen}`
    : "/assets/device1.jpg";

  // ==========================================
  // DESCRIPCIÓN
  // ==========================================

  const descripcion =
    detail?.Descripcion ||
    `${nombre} es un dispositivo tipo ${tipo} fabricado por ${marca}.`;

  // ==========================================
  // ESPECIFICACIONES
  //
  // El backend debe devolverlas dentro de:
  //
  // detail.specs
  //
  // Las especificaciones pueden provenir de:
  //
  // Especificaciones_Celulares_Tablets
  // o
  // Especificaciones_Portatiles
  // ==========================================

  const specs = detail?.specs || {};

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">

      {/* ========================================
          BOTÓN VOLVER
      ======================================== */}

      <button
        className="btn btn-warning mb-4 d-block text-start shadow-sm"
        onClick={back}
      >
        ← Volver al listado
      </button>

      {/* ========================================
          NOMBRE DEL DISPOSITIVO
      ======================================== */}

      <h2 className="text-primary fw-bold">
        {nombre}
      </h2>

      <div className="row">

        {/* ======================================
            IMAGEN
        ====================================== */}

        <div className="col-12 text-center mb-4">
          <img
            src={imagen}
            alt={nombre}
            className="img-fluid rounded shadow-lg"
            style={{
              maxHeight: "350px",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#fff",
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/device1.jpg";
            }}
          />
        </div>

        {/* ======================================
            MARCA
        ====================================== */}

        <h4 className="text-primary mb-2">
          {marca}
        </h4>

        {/* ======================================
            DESCRIPCIÓN
        ====================================== */}

        <p className="mt-2 fs-5 text-white">
          {descripcion}
        </p>

        {/* ======================================
            INFORMACIÓN BÁSICA
        ====================================== */}

        <div className="col-12">

          <div style={listContainerStyle}>

            <ul
              style={{
                paddingLeft: "0",
                marginBottom: "0",
                listStyle: "none",
              }}
            >

              {/* PRECIO */}

              <li style={listItemStyle}>
                <strong>Precio:</strong>{" "}
                {formatPrecio(precio)}
              </li>

              {/* REFERENCIA */}

              <li style={listItemStyle}>
                <strong>Referencia:</strong>{" "}
                {referencia}
              </li>

              {/* TIPO */}

              <li style={listItemStyle}>
                <strong>Tipo:</strong>{" "}
                {tipo}
              </li>

              {/* FECHA DE LANZAMIENTO */}

              {detail?.Fecha_Lanzamiento && (
                <li style={listItemStyle}>
                  <strong>
                    Fecha de lanzamiento:
                  </strong>{" "}
                  {new Date(
                    detail.Fecha_Lanzamiento
                  ).toLocaleDateString("es-CO")}
                </li>
              )}

              {/* STOCK */}

              {detail?.Stock_Dispositivo !== undefined &&
                detail?.Stock_Dispositivo !== null && (
                  <li style={listItemStyle}>
                    <strong>
                      Stock disponible:
                    </strong>{" "}
                    {detail.Stock_Dispositivo} unidades
                  </li>
                )}

            </ul>

          </div>

          {/* ====================================
              DESCRIPCIÓN DETALLADA
          ==================================== */}

          {detail?.Descripcion && (
            <>
              <h5 className="mb-3 text-primary fw-bold">
                Descripción
              </h5>

              <div style={listContainerStyle}>
                <p className="mb-0">
                  {detail.Descripcion}
                </p>
              </div>
            </>
          )}

          {/* ====================================
              FICHA TÉCNICA
          ==================================== */}

          <h5 className="mb-3 text-primary fw-bold">
            Ficha Técnica
          </h5>

          {loading ? (

            /* ==================================
               CARGANDO
            ================================== */

            <div
              style={listContainerStyle}
              className="text-center"
            >
              <div
                className="spinner-border text-light"
                role="status"
              >
                <span className="visually-hidden">
                  Cargando...
                </span>
              </div>

              <p className="mt-2 mb-0">
                Cargando especificaciones...
              </p>
            </div>

          ) : (

            /* ==================================
               ESPECIFICACIONES
            ================================== */

            <div style={listContainerStyle}>

              <ul
                style={{
                  paddingLeft: "0",
                  marginBottom: "0",
                  listStyle: "none",
                }}
              >

                {/* =================================
                    PANTALLA
                ================================= */}

                {specs.Pantalla && (
                  <li style={listItemStyle}>
                    <strong>Pantalla:</strong>{" "}
                    {specs.Pantalla}
                  </li>
                )}

                {/* =================================
                    PROCESADOR
                ================================= */}

                {specs.Procesador && (
                  <li style={listItemStyle}>
                    <strong>Procesador:</strong>{" "}
                    {specs.Procesador}
                  </li>
                )}

                {/* =================================
                    RAM
                ================================= */}

                {specs.RAM && (
                  <li style={listItemStyle}>
                    <strong>Memoria RAM:</strong>{" "}
                    {specs.RAM}
                  </li>
                )}

                {/* =================================
                    ALMACENAMIENTO
                ================================= */}

                {specs.Almacenamiento && (
                  <li style={listItemStyle}>
                    <strong>
                      Almacenamiento:
                    </strong>{" "}
                    {specs.Almacenamiento}
                  </li>
                )}

                {/* =================================
                    CÁMARAS
                ================================= */}

                {specs.Camaras && (
                  <li style={listItemStyle}>
                    <strong>Cámaras:</strong>{" "}
                    {specs.Camaras}
                  </li>
                )}

                {/* =================================
                    BATERÍA
                ================================= */}

                {specs.Bateria && (
                  <li style={listItemStyle}>
                    <strong>Batería:</strong>{" "}
                    {specs.Bateria}
                  </li>
                )}

                {/* =================================
                    CONECTIVIDAD
                ================================= */}

                {specs.Conectividad && (
                  <li style={listItemStyle}>
                    <strong>
                      Conectividad:
                    </strong>{" "}
                    {specs.Conectividad}
                  </li>
                )}

                {/* =================================
                    GRÁFICOS
                    PORTÁTILES
                ================================= */}

                {specs.Graficos && (
                  <li style={listItemStyle}>
                    <strong>Gráficos:</strong>{" "}
                    {specs.Graficos}
                  </li>
                )}

                {/* =================================
                    TARJETA GRÁFICA
                    PORTÁTILES
                ================================= */}

                {specs.Tarjeta_Grafica && (
                  <li style={listItemStyle}>
                    <strong>
                      Tarjeta gráfica:
                    </strong>{" "}
                    {specs.Tarjeta_Grafica}
                  </li>
                )}

                {/* =================================
                    RESOLUCIÓN
                ================================= */}

                {specs.Resolucion && (
                  <li style={listItemStyle}>
                    <strong>
                      Resolución:
                    </strong>{" "}
                    {specs.Resolucion}
                  </li>
                )}

                {/* =================================
                    SISTEMA OPERATIVO
                ================================= */}

                {specs.Sistema_Operativo && (
                  <li style={listItemStyle}>
                    <strong>
                      Sistema operativo:
                    </strong>{" "}
                    {specs.Sistema_Operativo}
                  </li>
                )}

                {/* =================================
                    SIN ESPECIFICACIONES
                ================================= */}

                {Object.keys(specs).length === 0 &&
                  !loading && (
                    <li style={listItemStyle}>
                      No hay especificaciones
                      registradas para este
                      dispositivo.
                    </li>
                  )}

              </ul>

            </div>
          )}

          {/* ====================================
              BOTÓN COMPRAR
          ==================================== */}

          <button
            className="btn btn-primary btn-lg w-100 mt-2 mb-5 shadow"
          >
            Comprar Ahora
          </button>

        </div>
      </div>
    </div>
  );
}