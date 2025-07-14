import React from "react";

type Producto = {
  sku: string;
  nombre: string;
  stock: number;
  ubicacion: string;
  fotoUrl?: string;
};

type Props = {
  productos: Producto[];
};

const InventoryTable: React.FC<Props> = ({ productos }) => (
  <table className="min-w-full border mt-4">
    <thead>
      <tr>
        <th className="border px-4 py-2">SKU</th>
        <th className="border px-4 py-2">Nombre</th>
        <th className="border px-4 py-2">Stock</th>
        <th className="border px-4 py-2">Ubicación</th>
        <th className="border px-4 py-2">Foto</th>
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
            {p.fotoUrl ? (
              <img src={p.fotoUrl} alt={p.nombre} width="60" />
            ) : (
              "Sin foto"
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default InventoryTable;
