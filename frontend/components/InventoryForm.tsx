import React, { useState, useEffect } from "react";
import type { Producto } from "../lib/api";

type Props = {
  initial?: Producto;
  onSave: (prod: Producto) => void;
  onCancel: () => void;
};

const InventoryForm: React.FC<Props> = ({ initial, onSave, onCancel }) => {
  const [producto, setProducto] = useState<Producto>(
    initial || {
      sku: "",
      nombre: "",
      stock: 0,
      ubicacion: "",
      fotoUrl: "",
    }
  );

  useEffect(() => {
    if (initial) setProducto(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto.sku || !producto.nombre) return;
    onSave(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-xl shadow-md space-y-4 mb-2 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="sku"
          placeholder="SKU"
          value={producto.sku}
          onChange={handleChange}
          className="w-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          className="w-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
          className="w-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="ubicacion"
          placeholder="Ubicación"
          value={producto.ubicacion}
          onChange={handleChange}
          className="w-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="fotoUrl"
          placeholder="URL de Foto (opcional)"
          value={producto.fotoUrl}
          onChange={handleChange}
          className="w-full text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded px-3 py-2 col-span-full"
        />
      </div>
      {producto.fotoUrl && (
        <div className="col-span-full flex flex-col items-center">
          <span className="text-gray-600 mb-1 text-xs">Vista previa:</span>
          <img
            src={producto.fotoUrl}
            alt="Vista previa"
            className="h-32 object-contain rounded shadow border"
            style={{ background: "#F8FAFC", padding: 8 }}
          />
        </div>
      )}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="bg-[#2E7D32] hover:bg-[#256427] text-white rounded px-6 py-2 font-bold shadow transition"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 rounded px-6 py-2 font-bold shadow transition hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
