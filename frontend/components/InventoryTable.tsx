import React from "react";
import type { Producto } from "../lib/api";
import {
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ZoomableImage from "./ZoomableImage"; // 👈 IMPORTANTE

type Props = {
  productos: Producto[];
  onEdit: (sku: string) => void;
  onDelete: (sku: string) => void;
};

const InventoryTable: React.FC<Props> = ({ productos, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-[#A5D6A7] mt-4 overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-[#A5D6A7] text-[#14532D]">
        <tr>
          <th className="p-4 text-left font-bold">Imagen</th>
          <th className="p-4 text-left font-bold">SKU</th>
          <th className="p-4 text-left font-bold">Nombre</th>
          <th className="p-4 text-left font-bold">Stock</th>
          <th className="p-4 text-left font-bold">Ubicación</th>
          <th className="p-4 text-left font-bold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p, idx) => (
          <tr key={p.sku} className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
            <td className="p-4">
              {p.fotoUrl ? (
                <ZoomableImage src={p.fotoUrl} alt={p.nombre} />
              ) : (
                <span className="text-gray-400 italic">Sin imagen</span>
              )}
            </td>
            <td className="p-4 text-gray-800">{p.sku}</td>
            <td className="p-4 text-gray-800">{p.nombre}</td>
            <td className="p-4 text-gray-800">{p.stock}</td>
            <td className="p-4 text-gray-800">{p.ubicacion}</td>
            <td className="p-4 flex gap-2">
              <button
                onClick={() => onEdit(p.sku)}
                className="text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-lg p-1 shadow transition"
                title="Editar"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(p.sku)}
                className="text-red-700 bg-red-50 hover:bg-red-100 rounded-lg p-1 shadow transition"
                title="Eliminar"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {productos.length === 0 && (
      <div className="text-center text-gray-400 py-8">No hay productos cargados.</div>
    )}
  </div>
);

export default InventoryTable;
