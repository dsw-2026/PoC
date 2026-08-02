import type { EstadoFiltro } from "../types/Filtro";


interface FilterBarProps {
  filtro: EstadoFiltro;
  onFiltroChange: (filtro: EstadoFiltro) => void;
}

function FilterBar({ filtro, onFiltroChange }: FilterBarProps) {
  const opciones: EstadoFiltro[] = ["todas", "pendiente", "completada"];

  return (
    <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => onFiltroChange(opcion)}
          style={{ fontWeight: filtro === opcion ? "bold" : "normal" }}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;