import { useEffect, useState } from "react";

interface CargaProducto {
  codigoProducto: string;
  codigo: string;
  cantidadBuena: number;
}

export default function CargaProductoPage() {
  const [cargas, setCargas] = useState<CargaProducto[]>([]);
  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidadBuena, setCantidadBuena] = useState(0);
  const [codigo, setCodigo] = useState("");

  // GET
  const fetchCargas = () => {
    fetch("https://almacensanc-production.up.railway.app/api/CargaProducto")
      .then((res) => res.json())
      .then((data) => setCargas(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCargas();
  }, []);

  // POST
  const registrarCarga = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      codigoProducto,
      codigo,
      cantidadBuena,
    };

    fetch("https://almacensanc-production.up.railway.app/api/CargaProducto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        fetchCargas();
        setCodigoProducto("");
        setCodigo("");
        setCantidadBuena(0);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Carga de Productos</h1>

      <h2>Registrar Carga</h2>

      <form onSubmit={registrarCarga}>
        <input
          placeholder="Código Producto"
          value={codigoProducto}
          onChange={(e) => setCodigoProducto(e.target.value)}
        />

        <input
          placeholder="Código Interno"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cantidad Buena"
          value={cantidadBuena}
          onChange={(e) => setCantidadBuena(Number(e.target.value))}
        />

        <button type="submit">Registrar Carga</button>
      </form>

      <h2>Listado de Cargas</h2>

      <table>
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Código Interno</th>
            <th>Cantidad Buena</th>
          </tr>
        </thead>

        <tbody>
          {cargas.map((item, idx) => (
            <tr key={idx}>
              <td>{item.codigoProducto}</td>
              <td>{item.codigo}</td>
              <td>{item.cantidadBuena}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
