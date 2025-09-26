import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import ResidenteCard from "./ResidenteCard";
import type { Residente } from "../../../interfaces/IResidentes";


function ResidentesSection() {

    const [residentes, setResidentes] = useState<Residente[]>([]);


    useEffect(() => {
        fetch("https://68cb2705430c4476c34c20bf.mockapi.io/residentes")
            .then(response => response.json())
            .then((data: Residente[]) => setResidentes(data));
    }, []);

    const eliminarResidente = (id: string) => {
        setResidentes(prev => prev.filter(r => r.id !== id));
    };

    const eliminar = async (id: string) => {
        const confirmacion = window.confirm("¿Seguro que quieres eliminar este residente?");
        if (!confirmacion) return;

        await fetch(`https://68cb2705430c4476c34c20bf.mockapi.io/residentes/${id}`, {
        method: "DELETE"
        });

        eliminarResidente(id);
    };

    return (
        <Element name="residentes" className="residentes-section">
            <h2 className="h2-residentes">Residentes</h2>

            <div className="residentes-container">
                {residentes.map(residente => (
                <ResidenteCard key={residente.id} residente={residente}
                    onEliminar={eliminar}
                    onActualizarResidente={(residenteActualizado) => {
                    setResidentes(prev =>
                    prev.map(r => (r.id === residenteActualizado.id ? residenteActualizado : r))
                    )}}
                />
                ))}
            </div>

        </Element>
    )
}

export default ResidentesSection;