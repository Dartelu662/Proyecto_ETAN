export interface Escolar {
    id?: string;
    Matricula: string;
    Plan: string;
    planId: string;
    Curso: string;
    cursoId: string;
    Maestro: string;
    maestroId: string;
    Materia: string;
    materiaId: string;
    Calificacion?: number;
    FechaActualizacion?: string;
    Activo: boolean;
  }