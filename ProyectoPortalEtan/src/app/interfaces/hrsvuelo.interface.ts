export interface HrsVuelo {
    Matricula: string;
    Fecha: Date | string;
    Hora: string;
    Avion: string;
    MetodoPago: string; // 'paypal' o 'credito'
    Monto: number;
    hrsVuelo?: number;   // positivo (abono) o negativo (descuento)
    PagoInfo?: any;      // datos de PayPal
    id?: string;         // para Firestore
  }