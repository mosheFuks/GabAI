export interface VisitorUser {
    nombreKehila?: string,
    nombreEspañol?: string,
    nombreHebreo?: string,
    apellido?: string,
    fechaNacimientoGregoriano?: CustomDate,
    fechaNacimientoHebreo?: CustomDate,
    emailPersonal?: string,
    emailComercial?: string, //Opcional
    telefono?: string,
    direccion?: string,
    minian?: string,
    numeroSocio?: string,
    grupo?: string

    fechaBarMitzvaGregoriano?: CustomDate,
    fechaBarMitzvaHebreo?: CustomDate,
    perashaBarMitzva?:  string,
    habilidades?: Ability[], //Leer tora, haftara, ser jazan
    nombreMadreEspañol?: string,
    nombreMadreHebreo?: string,
    nombrePadreEspañol?: string,
    nombrePadreHebreo?: string,

    estadoCivil?: string,
    nombreEsposaEspañol?: string,
    nombreEsposaHebreo?: string,

    hijos?: Son[]
    aniversarios?: Aniversary[]

    cuenta?: Donacion[]
}

export interface Son {
    nombre?: string,
    nombreHebreo?: string,
    apellido?: string,
    genero?: string,
    fechaNacimiento?: CustomDate,
    fechaNacimientoHebreo?: CustomDate,
    fechaBarMitzva?: CustomDate,
    fechaBarMitzvaHebreo?: CustomDate,
    perashaBarMitzva?: string,
    habilidades?: Ability[]
}
export interface Aniversary {
    fecha?: CustomDate,
    fechaHebreo?: CustomDate,
    motivo?: string,
    nombreDelAniversario?: string
}

export interface SignInfo {
    nombre?: string,
    email?: string,
    password?: string
}

export interface CustomDate {
    dia?: string,
    mes?: string,
    año?: string
}

export interface ToastData {
    message: string,
    type: "error" | "success" | "info",
    show: boolean
}

export interface Donacion {
    monto?: number,
    tipoMoneda?: "USD" | "ARS" | any,
    motivo?: string,
    fecha?: CustomDate,
    perasha?: string,
    aclaracion?: string,
    status?: "PENDIENTE" | "PAGADO" | any,
}

export type Ability = "Leer Torah" | "Jazan" | "Leer Haftara" | "Leer Meguila";

export type Grupo = "Cohen" | "Levi" | "Israel";

export const HEBREW_MONTHS = [
    "Nisan",
    "Iyyar",
    "Sivan",
    "Tamuz",
    "Av",
    "Elul",
    "Tishrei",
    "Cheshvan",
    "Kislev",
    "Tevet",
    "Sh'vat",
    "Adar",
    "Adar I",
    "Adar II"
] as const;
