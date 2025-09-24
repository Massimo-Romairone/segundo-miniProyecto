import type { Residente } from "./IResidentes";

export interface ResidenteCardProps {
  residente: Residente;
  onEliminar: (id: string) => void;
  onActualizarResidente: (residente: Residente) => void;
}