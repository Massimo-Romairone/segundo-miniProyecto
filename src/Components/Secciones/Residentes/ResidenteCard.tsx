import { useState } from "react";
import './Residentes.css'
import MedicamentosSection from "../Medicamentos/MedicamentosSection";
import Modal from "../../../utils/modal";
import type { ResidenteCardProps } from "../../../interfaces/IResidenteCardProps";

function ResidenteCard({ residente, onEliminar, onActualizarResidente }: ResidenteCardProps) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirEditar, setAbrirEditar] = useState(false);

  const [nombre, setNombre] = useState(residente.nombre);
  const [edad, setEdad] = useState(residente.edad);
  const [contacto, setContacto] = useState(residente.contacto);

  const actualizar = async (e: React.FormEvent) => {
    e.preventDefault();

    const residenteActualizado = { ...residente, nombre, edad, contacto };

    const response = await fetch(
      `https://68cb2705430c4476c34c20bf.mockapi.io/residentes/${residente.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(residenteActualizado)
      }
    );

    const data = await response.json();
    onActualizarResidente(data);
    setAbrirEditar(false);
  };

  return (
    <div className="residente-card">
      <h3>{residente.nombre}</h3>
      <p>Edad: {residente.edad}</p>
      <p>Contacto: {residente.contacto}</p>

      <button onClick={() => setAbrirModal(true)}>Ver Medicamentos</button>
      <button onClick={() => setAbrirEditar(true)}>Editar</button>
      <button onClick={() => onEliminar(residente.id)}>Eliminar</button>

      {abrirModal && (
        <Modal onClose={() => setAbrirModal(false)}>
          <h2>Medicamentos de {residente.nombre}</h2>
          <MedicamentosSection residenteId={residente.id} />
          <button onClick={() => setAbrirModal(false)}>Cerrar</button>
        </Modal>
      )}

      {abrirEditar && (
        <Modal onClose={() => setAbrirEditar(false)}>
          <h2>Editar Residente</h2>
          <form onSubmit={actualizar}>
            <label>
              Nombre:
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </label>
            <label>
              Edad:
              <input type="number" value={edad} onChange={e => setEdad(Number(e.target.value))} required />
            </label>
            <label>
              Contacto:
              <input type="text" value={contacto} onChange={e => setContacto(e.target.value)} required />
            </label>

            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setAbrirEditar(false)}>Cancelar</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ResidenteCard;
