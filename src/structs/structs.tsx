export interface VisitorUser {
    nombreKehila?: string,
    nombreEspanol?: string,
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
    habilidades?: string[], //Leer tora, haftara, ser jazan
    nombreMadreEspanol?: string,
    nombreMadreHebreo?: string,
    nombrePadreEspanol?: string,
    nombrePadreHebreo?: string,

    estadoCivil?: string,
    nombreEsposaEspanol?: string,
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
    habilidades?: string[]
}
export interface Aniversary {
    id?: string,
    fecha?: CustomDate,
    fechaHebreo?: CustomDate,
    motivo?: Motivo,
    nombreDelAniversario?: string
}

export interface SignInfo {
    nombre?: string,
    email?: string,
    password?: string
}

export interface CustomDate {
    dia?: string | number,
    mes?: string | number,
    ano?: string | number  
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

export interface LogedUserData {
  email: string;
  nombre: string;
  rol: string;
  kehila: string;
}

export type Ability = "Leer Torah" | "Jazan" | "Leer Haftara" | "Leer Meguila";

export type Grupo = "Cohen" | "Levi" | "Israel";

export enum Motivo {
  Yortzait = "Yortzait",
  Cumpleaños = "Cumpleaños",
  BarMitzva = "Bar Mitzva",
  BatMitzva = "Bat Mitzva",
  Casamiento = "Casamiento",
  Otro = "Otro"
}

export interface Alia {
  alia: string,
  nombre: string,
  apellido?: string,
  nombreHebreo: string,
  monto: number,
  moneda: string
  perasha?: string
  minian?: string
  aniversario?: string
  fechaAniversarioHebreo?: string;
  grupo?: Grupo
  tipoAlia?: "DONACION" | "ALIA"
}
export interface UserToAddInThePerasha {
  nombre: string;
  apellido: string;
  nombreHebreo: string;
  aniversario: string;
  fechaAniversarioHebreo?: string;
  minian: string,
  grupo: Grupo
}

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

export const GREG_MONTHS = [
    {nombre: "Enero", numero: 0},
    {nombre: "Febrero", numero: 1},
    {nombre: "Marzo", numero: 2},
    {nombre: "Abril", numero: 3},
    {nombre: "Mayo", numero: 4},
    {nombre: "Junio", numero: 5},
    {nombre: "Julio", numero: 6},
    {nombre: "Agosto", numero: 7},
    {nombre: "Septiembre", numero: 8},
    {nombre: "Octubre", numero: 9},
    {nombre: "Noviembre", numero: 10},
    {nombre: "Diciembre", numero: 11}
] as const;
