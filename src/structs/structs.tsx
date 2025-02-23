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
    grupo?: Grupo

    fechaBarMitzvaGregoriano?: string,
    fechaBarMitzvaHebreo?: string,
    perashaBarMitzva?:  string,
    habilidades?: string, //Leer tora, haftara, ser jazan
    nombreMadreEspañol?: string,
    nombreMadreHebreo?: string,
    nombrePadreEspañol?: string,
    nombrePadreHebreo?: string,

    estadoCivil?: string,
    nombreEsposaEspañol?: string,
    nombreEsposaHebreo?: string,
    numeroSociaEsposa?: string,

    hijos?: Hijo[]
}

export interface Grupo {
    Cohen: string,
    Levi: string,
    Israel: string
}

export interface Hijo {
    nombre?: string,
    nombreHebreo?: string,
    apellido?: string,
    sexo?: string,
    fechaNacimiento?: string,
    fechaNacimientoHebreo?: string,
    fechaBarMitzva?: string,
    fechaBarMitzvaHebreo?: string,
    perashaBarMitzva?: string,
    fechaBatMitzva?: string,
    fechaBatMitzvaHebreo?: string,
    habilidades?: string
}