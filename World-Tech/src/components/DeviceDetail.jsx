export function DeviceDetail({ device, back }) {
  return (
    <div className="container mt-4">

      <button className="btn btn-secondary mb-4" onClick={back}>
        ← Volver
      </button>

      <div className="row">
        <div className="col-md-5">
          <img src={device.image} className="img-fluid rounded" />
        </div>

        <div className="col-md-7">
          <h2>{device.name}</h2>
          <h4 className="text-muted">{device.brand}</h4>

          <p className="mt-3">{device.description}</p>

          <ul className="list-group">
            <li className="list-group-item">Tipo: {device.type}</li>
            <li className="list-group-item">Lanzamiento: {device.release}</li>
            <li className="list-group-item">Precio: ${device.price}</li>
          </ul>
        </div>
      </div>

    </div>
  );
}