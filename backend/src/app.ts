import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Listar todos los productos
app.get("/api/inventory", async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por SKU
app.get("/api/inventory/:sku", async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const producto = await prisma.producto.findUnique({ where: { sku } });
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
});

// Crear producto
app.post("/api/inventory", async (req: Request, res: Response) => {
  try {
    const { sku, nombre, descripcion, stock, ubicacion, fotoUrl } = req.body;
    if (!sku || !nombre) return res.status(400).json({ error: "Faltan datos requeridos" });
    const producto = await prisma.producto.create({
      data: { sku, nombre, descripcion, stock, ubicacion, fotoUrl },
    });
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// Editar producto
app.put("/api/inventory/:sku", async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const { nombre, descripcion, stock, ubicacion, fotoUrl } = req.body;
    const producto = await prisma.producto.update({
      where: { sku },
      data: { nombre, descripcion, stock, ubicacion, fotoUrl },
    });
    res.json(producto);
  } catch (err) {
    res.status(404).json({ error: "Producto no encontrado o error de actualización" });
  }
});

// Eliminar producto
app.delete("/api/inventory/:sku", async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    await prisma.producto.delete({ where: { sku } });
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: "Producto no encontrado o error al borrar" });
  }
});

app.listen(3001, () => console.log("Backend corriendo en http://localhost:3001/api/inventory"));
