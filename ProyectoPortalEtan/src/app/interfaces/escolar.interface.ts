export interface Calificacion {
    matricula?: string;
    plan: string;
    curso: string;
    maestro: string;
    materia: string;
    calificacion?: number;
    fecha?: string; // Formato YYYY-MM-DD
  }