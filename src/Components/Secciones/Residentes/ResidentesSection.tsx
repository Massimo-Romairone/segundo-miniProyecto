import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import ResidenteCard from "./ResidenteCard";
import type { Residente } from "../../../interfaces/IResidentes";


function ResidentesSection() {

    const [residentes, setResidentes] = useState<Residente[]>([]);
    const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);


    useEffect(() => {
        fetch("https://68cb2705430c4476c34c20bf.mockapi.io/residentes")
            .then(response => response.json())
            .then((data: Residente[]) => setResidentes(data));
    }, []);

    const eliminarResidente = (id: string) => {
    setResidentes((prev) => prev.filter((r) => r.id !== id));
    };

    const confirmarEliminar = (id: string) => {
        setIdAEliminar(id);
        setMostrarConfirmar(true);
    };

    const eliminar = async () => {
        if (!idAEliminar) return;

        await fetch(`https://68cb2705430c4476c34c20bf.mockapi.io/residentes/${idAEliminar}`, {
        method: "DELETE",
        });

        eliminarResidente(idAEliminar);
        setMostrarConfirmar(false);
        setIdAEliminar(null);
    };

    return (
        <Element name="residentes" className="residentes-section">
            <div className="h2-button">
                <h2 className="h2-residentes">Residentes</h2>
                <button>Agregar Residente</button>
            </div>

            <div className="residentes-container">
                {residentes.map(residente => (
                <ResidenteCard 
                    key={residente.id} 
                    residente={residente}
                    onEliminar={() => confirmarEliminar(residente.id)}
                    onActualizarResidente={(residenteActualizado) => {
                    setResidentes(prev => prev.map(r => (r.id === residenteActualizado.id ? residenteActualizado : r)))}}
                />
                ))}
            </div>
            
            {mostrarConfirmar && (
                <div className="modal-overlay">
                <div className="modal">
                    <h3>¿Seguro que quieres eliminar este residente?</h3>
                    <div className="acciones">
                    <button onClick={eliminar}>Confirmar</button>
                    <button onClick={() => setMostrarConfirmar(false)}>Cancelar</button>
                    </div>
                </div>
                </div>
            )}
        </Element>
    )
}

export default ResidentesSection;