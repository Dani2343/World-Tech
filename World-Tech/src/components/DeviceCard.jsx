// src/components/DeviceCard.jsx
export function DeviceCard({ device, select }) {
  return (
    <div
      className="card device-card m-3 shadow"
      onClick={() => select(device)}
    >
      {/* Contenedor de imagen ajustable */}
      <div className="card-img-wrapper">
        <img
          src={device.image}
          alt={device.name}
          className="card-img-top"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-body text-center">
        <h5 className="card-title">{device.name}</h5>
        <p className="text-muted mb-1">{device.brand}</p>
        <strong className="text-primary">${device.price}</strong>
      </div>
    </div>
  );
}