import { Element } from "react-scroll";
import type { MedicamentosSectionProps } from "../../../interfaces/IMedicamentosSectionProps";
import type { Medicamento } from "../../../interfaces/IMedicamentos";
import { useEffect, useState } from "react";

function MedicamentosSection({ residenteId }: MedicamentosSectionProps) {

    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    useEffect(() => {
        fetch(`https://68cb2705430c4476c34c20bf.mockapi.io/medicamentos?residenteId=${residenteId}`)
            .then((res) => res.json())
            .then((data: Medicamento[]) => { setMedicamentos(data)});
    }, [residenteId]);

    return (
        <Element name="medicamentos">

            <div className="medicamentos-container">
                {medicamentos.map(med => (
                    <div key={med.id} className="medicamento-card">
                        <h4>{med.nombre}</h4>
                        <p>Dosis: {med.dosis}</p>
                        <p>Frecuencia: {med.frecuencia}</p>
                        <p>Horario: {med.horario}</p>
                        <p>Observaciones: {med.observaciones}</p>
                    </div>
                ))}
            </div>
        </Element>
    )
}

export default MedicamentosSection;