// frontend/lib/api.ts

export type Producto = {
  sku: string;
  nombre: string;
  stock: number;
  ubicacion: string;
  fotoUrl?: string;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

// Obtener productos
export async function fetchProductos(): Promise<Producto[]> {
  const res = await fetch(`${API_URL}/api/inventory`);
  if (!res.ok) throw new Error("Error cargando inventario");
  return res.json();
}

// Agregar producto
export async function addProducto(prod: Producto) {
  const res = await fetch(`${API_URL}/api/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prod),
  });
  if (!res.ok) throw new Error("Error agregando producto");
  return res.json();
}

// Editar producto
export async function editProducto(sku: string, prod: Producto) {
  const res = await fetch(`${API_URL}/api/inventory/${sku}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prod),
  });
  if (!res.ok) throw new Error("Error editando producto");
  return res.json();
}

// ✅ Eliminar producto (sin intentar parsear JSON si no hay contenido)
export async function deleteProducto(sku: string) {
  const res = await fetch(`${API_URL}/api/inventory/${sku}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error eliminando producto");
  // No se hace res.json() porque backend puede devolver 204 vacío
}
