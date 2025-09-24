export interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  horario: string;
  observaciones?: string;
  residenteId: string;
  cantidad?: number;
}