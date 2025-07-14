// frontend/pages/inventory.tsx

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

  // Cargar productos
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

  // Alta
  const handleAdd = async (prod: Producto) => {
    try {
      await addProducto(prod);
      setShowForm(false);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Editar
  const handleEdit = async (prod: Producto) => {
    try {
      await editProducto(prod.sku, prod);
      setEditing(null);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Eliminar
  const handleDelete = async (sku: string) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteProducto(sku);
      cargar();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-6">Cargando inventario...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Nuevo producto
      </button>

      {showForm && (
        <InventoryForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <InventoryForm
          initial={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
        />
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
