// src/components/DeviceCard.jsx

export function DeviceCard({ device, select }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("es-CO").format(value || 0);

  return (
    <div
      className="card device-card m-3 shadow"
      onClick={() => select(device)}
      style={{ cursor: "pointer", width: "18rem" }}
    >
      {/* Imagen */}
      <div className="card-img-wrapper">
        <img
          src={`/assets/${device.Imagen}`}
          alt={device.Nombre_Dispositivo}
          className="card-img-top"
          onError={(e) => {
            e.target.src = "/assets/device1.jpg";
          }}
        />
      </div>

      {/* Contenido */}
      <div className="card-body text-center">
        <h5 className="card-title">{device.Nombre_Dispositivo}</h5>

        <p className="text-muted mb-1">{device.Marca_Dispositivo}</p>

        <strong className="text-primary">
          ${formatPrice(device.Precio)}
        </strong>
      </div>
    </div>
  );
}