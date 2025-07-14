import React, { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";

type Producto = {
  sku: string;
  nombre: string;
  stock: number;
  ubicacion: string;
  fotoUrl?: string;
};

const InventoryPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/inventory")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <InventoryTable productos={productos} />
    </div>
  );
};

export default InventoryPage;
