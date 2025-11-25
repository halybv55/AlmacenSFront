import { useEffect, useState } from "react";
import "./theme.css";
// ENDPOINTS REALES
const API_BASE = "https://almacensanc-production.up.railway.app/api/Producto";
const API_CATALOGO = `${API_BASE}/catalogo-simple`;

export default function App() {
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    stockMinimo: 0,
  });

  // CARGAR LISTA DE PRODUCTOS
  const cargarProductos = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setProductos(data);
  };

  // CARGAR CATÁLOGO SIMPLE
  const cargarCatalogo = async () => {
    const res = await fetch(API_CATALOGO);
    const data = await res.json();
    setCatalogo(data);
  };

  useEffect(() => {
    cargarProductos();
    cargarCatalogo();
  }, []);

  // CREAR PRODUCTO
  const crearProducto = async (e: any) => {
    e.preventDefault();

    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // limpiar
    setForm({ codigo: "", nombre: "", stockMinimo: 0 });

    // recargar
    cargarProductos();
    cargarCatalogo();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Almacén – Gestión de Productos</h1>

      {/* FORMULARIO */}
      <h2>Registrar Producto</h2>

      <form onSubmit={crearProducto}>
        <input
          type="text"
          placeholder="Código"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Mínimo"
          value={form.stockMinimo}
          onChange={(e) =>
            setForm({ ...form, stockMinimo: Number(e.target.value) })
          }
        />
        <button type="submit">Crear</button>
      </form>

      {/* INVENTARIO SIMPLE */}
      <h2>Inventario de Productos</h2>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Stock Mínimo</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p: any) => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.stockMinimo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CATÁLOGO SIMPLE */}
      <h2>Catálogo Simple</h2>

      <ul>
        {catalogo.map((c: any) => (
          <li key={c.codigo}>
            {c.codigo} – {c.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
