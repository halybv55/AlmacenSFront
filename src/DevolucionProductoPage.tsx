import { useEffect, useState } from "react";
import "./theme.css";
interface DevolucionProducto {
  codigoProducto: string;
  codigo: string;
  cantidadBuena: number;
  estado: string;
  descripcion: string;
}

export default function DevolucionProductoPage() {
  const [devoluciones, setDevoluciones] = useState<DevolucionProducto[]>([]);

  useEffect(() => {
    fetch("https://almacensanc-production.up.railway.app/api/DevolucionProducto")
      .then((res) => res.json())
      .then((data) => setDevoluciones(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Devoluciones de Productos</h1>

      <table>
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Código</th>
            <th>Cantidad Buena</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>

        <tbody>
          {devoluciones.map((item, idx) => (
            <tr key={idx}>
              <td>{item.codigoProducto}</td>
              <td>{item.codigo}</td>
              <td>{item.cantidadBuena}</td>
              <td>{item.estado}</td>
              <td>{item.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
