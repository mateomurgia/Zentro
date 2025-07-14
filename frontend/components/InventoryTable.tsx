// frontend/components/InventoryTable.tsx

import React from "react";
import type { Producto } from "../lib/api";

type Props = {
  productos: Producto[];
  onEdit: (sku: string) => void;
  onDelete: (sku: string) => void;
};

const InventoryTable: React.FC<Props> = ({ productos, onEdit, onDelete }) => {
  if (!productos.length)
    return <div className="mt-4 text-gray-500">No hay productos cargados.</div>;

  return (
    <table className="min-w-full border mt-4">
      <thead>
        <tr>
          <th className="border px-4 py-2">SKU</th>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Stock</th>
          <th className="border px-4 py-2">Ubicación</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.sku}>
            <td className="border px-4 py-2">{p.sku}</td>
            <td className="border px-4 py-2">{p.nombre}</td>
            <td className="border px-4 py-2">{p.stock}</td>
            <td className="border px-4 py-2">{p.ubicacion}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(p.sku)}
                className="text-blue-600 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(p.sku)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
