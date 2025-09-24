import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import type { Residente } from "../../../interfaces/IResidentes";
import type { Medicamento } from "../../../interfaces/IMedicamentos";

function ReportesSection() {
  const [residentes, setResidentes] = useState<Residente[]>([]);
  const [medicamentos, setMedicamentos] = useState<(Medicamento & { cantidadNum: number; residenteIds: string[] })[]>([]);

  useEffect(() => {
    fetch("https://68cb2705430c4476c34c20bf.mockapi.io/residentes")
      .then(res => res.json())
      .then((data: Residente[]) => setResidentes(data))
      .catch(() => setResidentes([]));
  }, []);

  useEffect(() => {
    fetch("https://68cb2705430c4476c34c20bf.mockapi.io/medicamentos")
      .then(res => res.json())
      .then((data: Medicamento[]) => {
        // Normalizamos los medicamentos
        const normalized = data.map(med => ({
          ...med,
          cantidadNum: Number(med.cantidad || 0),
          residenteIds: med.residenteId?.split(",").map(id => id.trim()) || []
        }));
        setMedicamentos(normalized);
      })
      .catch(() => setMedicamentos([]));
  }, []);

  if (residentes.length === 0 || medicamentos.length === 0) return <p>Cargando...</p>;

  const medicamentosReponer = medicamentos.filter(med => med.cantidadNum < 3);

  return (
    <Element name="reportes">
      <h2>Reportes diarios</h2>

      <h3>Medicamentos a administrar hoy por residente</h3>
      {residentes.map(residente => {
        const medsDelResidente = medicamentos.filter(med =>
          med.residenteIds.includes(residente.id)
        );

        return (
          <div key={residente.id}>
            <h4>{residente.nombre}</h4>
            {medsDelResidente.length > 0 ? (
              <ul>
                {medsDelResidente.map(med => (
                  <li key={med.id}>
                    {med.nombre} - Dosis: {med.dosis} - Horario: {med.horario} - Cantidad: {med.cantidadNum}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tiene medicamentos asignados.</p>
            )}
          </div>
        );
      })}

      <h3>Medicamentos que requieren reposición</h3>
      {medicamentosReponer.length > 0 ? (
        <ul>
          {medicamentosReponer.map(med => {
            const nombresResidentes = med.residenteIds
              .map(id => residentes.find(r => r.id === id)?.nombre || "Desconocido")
              .join(", ");
            return (
              <li key={med.id}>
                {med.nombre} - Residente(s): {nombresResidentes} - Cantidad: {med.cantidadNum}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay medicamentos que requieran reposición.</p>
      )}
    </Element>
  );
}

export default ReportesSection;
