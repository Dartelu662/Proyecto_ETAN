export default interface Curso{
    [x: string]: string | boolean | undefined;
    id?: string;
    plan: string;
    curso: string;
    Semanal: string;
    Sabatino: string;
    hrsvuelo: string;
    FechaCursoIni: string;    
    FechaCursoFin?: string;  
    Activo: boolean;  
}