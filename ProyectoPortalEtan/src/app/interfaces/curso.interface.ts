export default interface Curso{
    id?: string;
    plan: string;
    curso: string;
    Semanal: string;
    Sabatino: string;
    FechaCursoIni: string;    
    FechaCursoFin?: string;  
    Activo: boolean;  
}