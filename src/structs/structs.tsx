export interface VisitorUser {
    nombreKehila?: string,
    nombreEspañol?: string,
    nombreHebreo?: string,
    apellido?: string,
    fechaNacimientoGregoriano?: string,
    fechaNacimientoHebreo?: string,
    emailPersonal?: string,
    emailComercial?: string, //Opcional
    telefono?: string,
    direccion?: string,
    minian?: string,
    numeroSocio?: string,
    grupo?: string

    fechaBarMitzvaGregoriano?: string,
    fechaBarMitzvaHebreo?: string,
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
}

export interface Son {
    nombre?: string,
    nombreHebreo?: string,
    apellido?: string,
    genero?: string,
    fechaNacimiento?: string,
    fechaNacimientoHebreo?: string,
    fechaBarMitzva?: string,
    fechaBarMitzvaHebreo?: string,
    perashaBarMitzva?: string,
    fechaBatMitzva?: string,
    fechaBatMitzvaHebreo?: string,
    habilidades?: Ability[]
}

export type Ability = "Leer Torah" | "Jazan" | "Leer Haftara" | "Leer Meguila";

export type Grupo = "Cohen" | "Levi" | "Israel";
