export interface Escolar {
    id?: string;
    Matricula: string;
    Plan: string;
    Curso: string;
    Maestro: string;
    Materia: string;
    Calificacion?: number;
    FechaActualizacion?: string;
    Activo: boolean;
  }