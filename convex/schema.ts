import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const CustomDate = v.object({
    dia: v.string(),
    mes: v.string(),
    ano: v.string()
})

export const Cuenta = v.object({
    monto: v.optional(v.number()),
    tipoMoneda: v.optional(v.string()),
    motivo: v.optional(v.string()),
    fecha: v.optional(CustomDate),
    perasha: v.optional(v.string()),
    aclaracion: v.optional(v.string()),
    status: v.optional(v.string()),
    factura: v.optional(v.string())
})

export const Hijos = v.object({
    nombre: v.optional(v.string()),
    nombreHebreo: v.optional(v.string()),
    apellido: v.optional(v.string()),
    genero: v.optional(v.string()),
    fechaNacimiento: v.optional(CustomDate),
    fechaNacimientoHebreo: v.optional(CustomDate),
    fechaBarMitzva: v.optional(CustomDate),
    fechaBarMitzvaHebreo: v.optional(CustomDate),
    perashaBarMitzva: v.optional(v.string()),
    habilidades: v.optional(v.array(
        v.string()
    )),
})

export const Perasha = v.object({
    aliot: v.array(
        v.object({
            nombre: v.string(),
            nombreHebreo: v.string(),
            apellido: v.optional(v.string()),
            alia: v.string(),
            moneda: v.string(),
            monto: v.number()
        })
    ),
    nombrePerasha: v.string()
})

export const Aniversary = v.object({
    fecha: CustomDate,
    fechaHebreo: CustomDate,
    motivo: v.string(),
    nombreDelAniversario: v.string()
})

export default defineSchema({
  Kehila: defineTable({
    nombre: v.string(),
    minianim: v.array(v.string()),
    perashiot: v.array(
        Perasha
    ),
    usuarios: v.array(
        v.object({
            aniversarios: v.array(
                Aniversary
            ),
            hijos: v.array(
                Hijos
            ),
            cuenta:v.array(
                Cuenta
            ),
            habilidades: v.array(
                v.string()
            ),
            tipoUsuario: v.optional(v.string()),
            nombreEspanol: v.string(),
            nombreHebreo: v.string(),
            apellido: v.string(),
            direccion: v.string(),
            emailComercial: v.string(),
            emailPersonal: v.string(),
            estadoCivil: v.string(),
            fechaBarMitzvaGregoriano: CustomDate,
            fechaBarMitzvaHebreo: CustomDate,
            fechaNacimientoGregoriano: CustomDate,
            fechaNacimientoHebreo: CustomDate,
            grupo: v.string(),
            minian: v.string(),
            nombreEsposaEspanol: v.string(),
            nombreEsposaHebreo: v.string(),
            nombreKehila: v.string(),
            nombreMadreEspanol: v.string(),
            nombreMadreHebreo: v.string(),
            nombrePadreEspanol: v.string(),
            nombrePadreHebreo: v.string(),
            numeroSocio: v.string(),
            perashaBarMitzva: v.string(),
            telefono: v.string()
        })
    ),
    superUsuario: v.object({
        email: v.string(),
        kehila: v.string(),
        nombre: v.string(),
        role: v.string()
    })
  }),

  Usuarios: defineTable({
    email: v.string(),
    kehila: v.string(),
    nombre: v.string(),
    rol: v.string(),
  }),
});