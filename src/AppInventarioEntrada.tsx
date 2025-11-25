import { useEffect, useState } from "react";

/* ---------------------- ATOMS ---------------------- */

const Input = ({ label, ...props }: any) => (
  <div className="mb-2">
    <label className="block font-semibold text-sm mb-1">{label}</label>
    <input
      {...props}
      className="border px-2 py-1 w-full rounded"
    />
  </div>
);

const TextArea = ({ label, ...props }: any) => (
  <div className="mb-2">
    <label className="block font-semibold text-sm mb-1">{label}</label>
    <textarea
      {...props}
      className="border px-2 py-1 w-full rounded"
    />
  </div>
);

const Button = ({ children, ...props }: any) => (
  <button
    {...props}
    className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
  >
    {children}
  </button>
);

/* ---------------------- MOLECULES ---------------------- */

const EntradaForm = ({ onSubmit }: any) => {
  const [form, setForm] = useState({
    codigoProducto: "",
    cantidad: "",
    observaciones: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h2 className="text-lg font-bold mb-3">Registrar Entrada</h2>

      <Input
        label="Código de Producto"
        name="codigoProducto"
        value={form.codigoProducto}
        onChange={handleChange}
        required
      />

      <Input
        label="Cantidad"
        type="number"
        name="cantidad"
        value={form.cantidad}
        onChange={handleChange}
        required
      />

      <TextArea
        label="Observaciones"
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        required
      />

      <Button type="submit">Guardar</Button>
    </form>
  );
};

/* ---------------------- ORGANISMS ---------------------- */

const TablaEntradas = ({ data }: any) => (
  <table className="w-full border mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-2 py-1">Código</th>
        <th className="border px-2 py-1">Cantidad</th>
        <th className="border px-2 py-1">Observaciones</th>
        <th className="border px-2 py-1">Fecha Entrada</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item: any, i: number) => (
        <tr key={i}>
          <td className="border px-2 py-1">{item.codigoProducto}</td>
          <td className="border px-2 py-1">{item.cantidad}</td>
          <td className="border px-2 py-1">{item.observaciones}</td>
          <td className="border px-2 py-1">{item.fechaEntrada}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const TablaInventarioGeneral = ({ data }: any) => (
  <table className="w-full border mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-2 py-1">Código</th>
        <th className="border px-2 py-1">Nombre</th>
        <th className="border px-2 py-1">Stock Mínimo</th>
        <th className="border px-2 py-1">Cantidad</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item: any, i: number) => (
        <tr key={i}>
          <td className="border px-2 py-1">{item.codigo}</td>
          <td className="border px-2 py-1">{item.nombre}</td>
          <td className="border px-2 py-1">{item.stockMinimo}</td>
          <td className="border px-2 py-1">{item.cantidad}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

/* ---------------------- PAGE COMPLETA ---------------------- */

export default function InventarioEntradasPage() {
  const [entradas, setEntradas] = useState([]);
  const [inventario, setInventario] = useState([]);

  const GET_ENTRADAS = "https://almacensanc-production.up.railway.app/api/InventarioEntradas";
  const POST_ENTRADAS = "https://almacensanc-production.up.railway.app/api/InventarioEntradas";
  const GET_INVENTARIO = "https://almacensanc-production.up.railway.app/api/InventarioEntradas/inventario";

  const cargarDatos = async () => {
    const res1 = await fetch(GET_ENTRADAS);
    const data1 = await res1.json();
    setEntradas(data1);

    const res2 = await fetch(GET_INVENTARIO);
    const data2 = await res2.json();
    setInventario(data2);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const registrarEntrada = async (form: any) => {
    await fetch(POST_ENTRADAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    cargarDatos();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventario – Entradas</h1>

      <EntradaForm onSubmit={registrarEntrada} />

      <h2 className="text-xl font-bold mt-8 mb-2">Entradas Registradas</h2>
      <TablaEntradas data={entradas} />

      <h2 className="text-xl font-bold mt-8 mb-2">Inventario General</h2>
      <TablaInventarioGeneral data={inventario} />
    </div>
  );
}
