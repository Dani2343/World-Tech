export function Filters({ setBrand, setType, setSort }) {
  return (
    <div className="d-flex justify-content-center mb-4 gap-2">

      {/* Selector de Marca */}
      <select
        className="form-select form-select-sm"
        onChange={(e) => setBrand(e.target.value)}
        defaultValue=""
      >
        <option value="">Todas las marcas</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="Lenovo">Lenovo</option>
      </select>

      {/* Selector de Tipo */}
      <select
        className="form-select form-select-sm"
        onChange={(e) => setType(e.target.value)}
        defaultValue=""
      >
        <option value="">Todos los tipos</option>
        <option value="Celular">Celular</option>
        <option value="Tablet">Tablet</option>
        <option value="Portátil">Portátil</option>
      </select>

      {/* Filtro por Fecha de lanzamiento */}
      <select
        className="form-select form-select-sm"
        onChange={(e) => setSort(e.target.value)}
        defaultValue=""
      >
        <option value="">Ordenar por fecha</option>
        <option value="newest">Más recientes</option>
        <option value="oldest">Más antiguos</option>
      </select>

    </div>
  );
}