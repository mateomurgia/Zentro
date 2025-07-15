import React, { useEffect, useState } from "react";
import {
  fetchProductos,
  addProducto,
  editProducto,
  deleteProducto,
  Producto,
} from "../lib/api";
import InventoryTable from "../components/InventoryTable";
import InventoryForm from "../components/InventoryForm";

export default function InventoryPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState(false);

  const cargar = () => {
    setLoading(true);
    fetchProductos()
      .then(setProductos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleAdd = async (prod: Producto) => {
    try {
      await addProducto(prod);
      setShowForm(false);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = async (prod: Producto) => {
    try {
      await editProducto(prod.sku, prod);
      setEditing(null);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (sku: string) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteProducto(sku);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 border-b border-[#A5D6A7] pb-4">
        <h1 className="text-3xl font-extrabold text-[#2E7D32] tracking-tight">
          Inventario
        </h1>
      </div>
      <button
        className="mb-6 bg-[#2E7D32] hover:bg-[#256427] text-white font-bold px-6 py-2 rounded-xl shadow transition duration-200"
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        + Nuevo producto
      </button>
      {(showForm || editing) && (
        <div className="mb-8">
          <InventoryForm
            initial={editing || undefined}
            onSave={editing ? handleEdit : handleAdd}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}
      {loading && (
        <div className="p-8 text-center text-[#2E7D32] font-bold text-lg">
          Cargando inventario...
        </div>
      )}
      {error && (
        <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-lg my-4">
          {error}
        </div>
      )}
      <InventoryTable
        productos={productos}
        onEdit={(sku) => {
          const p = productos.find((p) => p.sku === sku);
          if (p) {
            setEditing(p);
            setShowForm(false);
          }
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
