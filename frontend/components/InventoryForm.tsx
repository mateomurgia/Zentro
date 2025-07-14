// frontend/components/InventoryForm.tsx

import React, { useState, useEffect } from "react";
import type { Producto } from "../lib/api";

type Props = {
  initial?: Producto;
  onSubmit: (p: Producto) => void;
  onCancel: () => void;
};

const InventoryForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<Producto>({
    sku: "",
    nombre: "",
    stock: 0,
    ubicacion: "",
    fotoUrl: "",
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        required
        name="sku"
        placeholder="SKU"
        value={form.sku}
        disabled={!!initial}
        onChange={handleChange}
        className="border px-2 py-1"
      />
      <input
        required
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="border px-2 py-1"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="border px-2 py-1"
      />
      <input
        name="ubicacion"
        placeholder="Ubicación"
        value={form.ubicacion}
        onChange={handleChange}
        className="border px-2 py-1"
      />
      <input
        name="fotoUrl"
        placeholder="URL de Foto (opcional)"
        value={form.fotoUrl || ""}
        onChange={handleChange}
        className="border px-2 py-1"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Guardar
        </button>
        <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;
