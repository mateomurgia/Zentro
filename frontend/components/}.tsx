import React from "react";
import type { Producto } from "../lib/api";
import {
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type Props = {
  productos: Producto[];
  onEdit: (sku: string) => void;
  onDelete: (sku: string) => void;
};

const InventoryTable: React.FC<Props> = ({ productos, onEdit, onDelete }) => (
  <div className="bg-white rounded shadow border mt-4 overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-indigo-50 text-gray-700">
        <tr>
          <th className="p-3 text-left font-semibold">Imagen</th>
          <th className="p-3 text-left font-semibold">SKU</th>
          <th className="p-3 text-left font-semibold">Nombre</th>
          <th className="p-3 text-left font-semibold">Stock</th>
          <th className="p-3 text-left font-semibold">Ubicación</th>
          <th className="p-3 text-left font-semibold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.sku} className="border-t hover:bg-gray-50">
            <td className="p-3">
              {p.fotoUrl ? (
                <img
                  src={p.fotoUrl}
                  alt={p.nombre}
                  className="h-12 w-12 object-contain rounded border"
                />
              ) : (
                <span className="text-gray-400 italic">Sin imagen</span>
              )}
            </td>
            <td className="p-3 text-gray-800">{p.sku}</td>
            <td className="p-3 text-gray-800">{p.nombre}</td>
            <td className="p-3 text-gray-800">{p.stock}</td>
            <td className="p-3 text-gray-800">{p.ubicacion}</td>
            <td className="p-3 flex gap-2">
              <button
                onClick={() => onEdit(p.sku)}
                className="text-indigo-600 hover:bg-indigo-100 rounded p-1"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(p.sku)}
                className="text-red-600 hover:bg-red-100 rounded p-1"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {productos.length === 0 && (
      <div className="text-center text-gray-400 py-6">No hay productos cargados.</div>
    )}
  </div>
);

export default InventoryTable;
