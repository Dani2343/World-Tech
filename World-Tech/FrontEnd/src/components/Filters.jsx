export function Filters({ setBrand, setType, setSort }) {
  return (
    <div className="row mb-4">
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Todas las marcas</option>
          <option value="Samsung">Samsung</option>
          <option value="Apple">Apple</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Motorola">Motorola</option>
          <option value="Huawei">Huawei</option>
          <option value="Lenovo">Lenovo</option>
          <option value="HP">HP</option>
          <option value="Dell">Dell</option>
          <option value="Asus">Asus</option>
          <option value="Acer">Acer</option>
        </select>
      </div>

      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="Celular">Celular</option>
          <option value="Tablet">Tablet</option>

          {/* IMPORTANTE: el value NO lleva tilde */}
          <option value="Portatil">Portátil</option>
        </select>
      </div>

      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Ordenar por fecha</option>
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>
    </div>
  );
}