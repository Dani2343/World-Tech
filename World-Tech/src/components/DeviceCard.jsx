export function DeviceCard({ device, select }) {
  return (
    <div
      className="card m-3 shadow"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={() => select(device)}
    >
      
      {/* CONTENEDOR DE IMAGEN FIJO */}
      <div style={{ height: "220px", overflow: "hidden" }}>
        <img
          src={device.image}
          alt={device.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      {/* BODY */}
      <div className="card-body text-center">
        <h5 className="card-title">{device.name}</h5>
        <p className="text-muted mb-1">{device.brand}</p>
        <strong className="text-primary">${device.price}</strong>
      </div>

    </div>
  );
}