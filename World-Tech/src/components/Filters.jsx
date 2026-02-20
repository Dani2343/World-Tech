export function Filters({ setBrand, setType }) {
  return (
    <div className="d-flex gap-3 p-3 justify-content-center">

      <select className="form-select w-auto" onChange={e=>setBrand(e.target.value)}>
        <option value="">Marca</option>
        <option>Apple</option>
        <option>Samsung</option>
        <option>HP</option>
      </select>

      <select className="form-select w-auto" onChange={e=>setType(e.target.value)}>
        <option value="">Tipo</option>
        <option>Celular</option>
        <option>Laptop</option>
      </select>

    </div>
  );
}