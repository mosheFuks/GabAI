import { query } from "./_generated/server";
import { mutation } from './_generated/server';
import { v } from "convex/values";
import { Aniversary, Cuenta, CustomDate, Hijos } from "./schema";

export const getAllKehilot = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Kehila").collect();
  },
});

/*--------------GET INFO OF ONE THING------------*/
export const getKehilaName = query({
  args: {
    nombre: v.string(),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    return kehila.nombre ?? [];
  },
});

export const getKehilaPerashaInfo = query({
  args: {
    nombre: v.string(),
    nombrePerasha: v.string()
  },
  handler: async (ctx, args) => {
    console.log("Perasha en Kehila: ", args.nombrePerasha);
    
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    let perasha = kehila.perashiot.find(
      (per) =>
        per.nombrePerasha == args.nombrePerasha
    );

    if (!perasha) {
      return "NOT FOUND"
    }

    return perasha;
  },
});

export const getVisitorUser = query({
  args: {
    nombreKehila: v.string(),
    nombreUsuario: v.string(),
    apellidoUsuario: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Enter here from here to here to user");

    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombreKehila))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    const usuario = kehila.usuarios.find(
      (usu) =>
        usu.nombreEspanol == args.nombreUsuario &&
        usu.apellido == args.apellidoUsuario
    );

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return usuario;
  },
});

export const getVisitorUserOnSignIn = query({
  args: {
    nombreKehila: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Enter here from here to here to user");

    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombreKehila))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    const usuario = kehila.usuarios.find(
      (usu) =>
        usu.emailPersonal == args.email
    );

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return usuario;
  },
});

/*------------------GET LIST INFO----------------*/
export const getKehilotNames= query({
  args: {},
  handler: async (ctx) => {
    const kehilaList = await ctx.db.query("Kehila").collect();
    return kehilaList.map((kehila) => kehila.nombre);
  },
});

export const getKehilaUsersList = query({
  args: {
    nombre: v.string(),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }
    
    return kehila.usuarios ?? [];
  },
});

export const getKehilaMinianimList = query({
  args: {
    nombre: v.string(),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    return kehila.minianim ?? [];
  },
});

export const getAniversariesFromAllUsers = query({
  args: {
    nombre: v.string(),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    const aniversarios = kehila.usuarios
        .map((usu) => usu.aniversarios)
        .filter((ani) => ani.length > 0);
    
    if (!aniversarios) {
      throw new Error("No hay usuarios con aniversarios");
    }

    return aniversarios
  },
})

export const getUserOnSignIn = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const superUser = await ctx.db
      .query("Usuarios")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!superUser) {
      throw new Error("Usuario no encontrado");
    }

    return superUser;
  },
});

export const getUserOnSignInDirect = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Usuarios")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }
});

/*------------------POST A NEW INFO---------------*/
export const addAnAliaInAPerasha = mutation({
  args: {
    nombre: v.string(),
    nombrePerasha: v.string(),
    nuevaAlia: 
      v.object({
        nombre: v.string(),
        apellido: v.optional(v.string()),
        nombreHebreo: v.string(),
        alia: v.string(),
        moneda: v.string(),
        monto: v.number(),
      })
  },
  handler: async (ctx, args) => {
    console.log("Adding an alia in a perasha", args.nombre, args.nombrePerasha, args.nuevaAlia);
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    // Copiamos el array de perashiot
    const perashiotActualizadas = (kehila.perashiot ?? []).map(perasha => {
      if (perasha.nombrePerasha === args.nombrePerasha) {
        return {
          ...perasha,
          aliot: [...(perasha.aliot ?? []), args.nuevaAlia]
        };
      }
      return perasha;
    });

    await ctx.db.patch(kehila._id, {
      perashiot: perashiotActualizadas,
    });
  },
});

export const addPerashaToKehila = mutation({
  args: {
    nombre: v.string(),           // Nombre de la kehila
    nombrePerasha: v.string(),    // Nombre de la nueva perasha
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    const nuevaPerasha = {
      nombrePerasha: args.nombrePerasha,
      aliot: []
    };

    const nuevasPerashiot = [...kehila.perashiot, nuevaPerasha];

    await ctx.db.patch(kehila._id, {
      perashiot: nuevasPerashiot
    });

    console.log("✅ Perasha agregada sin validación:", nuevaPerasha);

    return nuevaPerasha;
  }
});

export const addVisitorUser = mutation({
  args: {
    nombre: v.string(),           // Nombre de la kehila
    nuevoUsuario: v.object({
      tipoUsuario: v.string(),
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
    }),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombre))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    const nuevosUsuarios = [...kehila.usuarios, args.nuevoUsuario];

    await ctx.db.patch(kehila._id, {
      usuarios: nuevosUsuarios
    });

    console.log("✅ Usuario agregado sin validación:", args.nuevoUsuario);

    return args.nuevoUsuario;
  }
})

export const addUserToUsuariosList = mutation({
  args: {
    nuevoUsuario: v.object({
      nombre: v.string(),
      email: v.string(),
      kehila: v.string(),
      rol: v.string(), // ahora sí está incluido
    }),
  },
  handler: async (ctx, args) => {
    // Insertamos directamente un nuevo usuario en la colección "Usuarios"
    const id = await ctx.db.insert("Usuarios", {
      nombre: args.nuevoUsuario.nombre,
      email: args.nuevoUsuario.email,
      kehila: args.nuevoUsuario.kehila,
      rol: args.nuevoUsuario.rol,
    });

    console.log("✅ Usuario Operador agregado:", id);

    return { _id: id, ...args.nuevoUsuario };
  },
});

export const addDonationToUser = mutation({
  args: {
    nombreKehila: v.string(),
    nombreUsuario: v.string(),
    apellidoUsuario: v.string(),
    nuevaDonacion: v.object({
      monto: v.number(),
      tipoMoneda: v.string(),
      motivo: v.string(),
      fecha: v.object({
        dia: v.string(),
        mes: v.string(),
        ano: v.string(),
      }),
      perasha: v.optional(v.string()),
      aclaracion: v.optional(v.string()),
      status: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombreKehila))
      .first();

    if (!kehila) throw new Error("Kehila no encontrada");

    let usuarioEncontrado = false;

    const usuariosActualizados = kehila.usuarios.map((usuario) => {
      if (usuario.nombreEspanol === args.nombreUsuario && usuario.apellido === args.apellidoUsuario) {
        usuarioEncontrado = true;

        const nuevasDonaciones = [...(usuario.cuenta ?? []), args.nuevaDonacion];

        return {
          ...usuario,
          cuenta: nuevasDonaciones,
        };
      }
      return usuario;
    });

    if (!usuarioEncontrado) {
      throw new Error("Usuario no encontrado en la Kehila");
    }

    await ctx.db.patch(kehila._id, {
      usuarios: usuariosActualizados,
    });

    console.log("✅ Donación agregada a:", args.nombreUsuario, args.apellidoUsuario);

    return args.nuevaDonacion;
  },
});

/*-------CHANGE THE STATUS OF A DONATION-----------*/
export const changeDonationStatus = mutation({
  args: {
    nombreKehila: v.string(),
    nombreUsuario: v.string(),
    apellidoUsuario: v.string(),
    fecha: CustomDate,
    nuevoStatus: v.string(), // "PENDIENTE" | "PAGADO"
    monto: v.number(),
  },
  handler: async (ctx, args) => {
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombreKehila))
      .first();

    if (!kehila) throw new Error("Kehila no encontrada");

    let usuarioEncontrado = false;

    const usuariosActualizados = kehila.usuarios.map((usuario) => {
      if (usuario.nombreEspanol === args.nombreUsuario && usuario.apellido === args.apellidoUsuario) {
        usuarioEncontrado = true;

        const cuentaActualizada = usuario.cuenta.map((donacion) => {
          if (
            donacion.fecha!.dia === args.fecha.dia &&
            donacion.fecha!.mes === args.fecha.mes &&
            donacion.fecha!.ano === args.fecha.ano &&
            donacion.monto === args.monto
          ) {
            return { ...donacion, status: args.nuevoStatus };
          }
          return donacion;
        });

        return {
          ...usuario,
          cuenta: cuentaActualizada,
        };
      }
      return usuario;
    });

    if (!usuarioEncontrado) {
      throw new Error("Usuario no encontrado en la Kehila");
    }

    await ctx.db.patch(kehila._id, {
      usuarios: usuariosActualizados,
    });

    console.log("✅ Estado de la donación actualizado para:", args.nombreUsuario, args.apellidoUsuario);

    return { success: true };
  },
});

export const changeUserVisitordata = mutation({
  args: {
    nombreKehila: v.string(),
    nombreUsuario: v.string(),
    apellidoUsuario: v.string(),
    updatedData: v.array(
      v.object({
        name: v.string(),
        value: v.string(),
      })
    ),
  },

  handler: async (ctx, args) => {
    // Paso 1: Buscar la Kehila
    const kehila = await ctx.db
      .query("Kehila")
      .filter((q) => q.eq(q.field("nombre"), args.nombreKehila))
      .first();

    if (!kehila) {
      throw new Error("Kehila no encontrada");
    }

    console.log("🕍 Kehila encontrada:", kehila.nombre);

    // Paso 2: Buscar y actualizar el usuario
    let usuarioFueModificado = false;

    const usuariosActualizados = kehila.usuarios.map((usuario) => {
      if (
        usuario.nombreEspanol === args.nombreUsuario &&
        usuario.apellido === args.apellidoUsuario
      ) {
        const usuarioActualizado = { ...usuario };

        console.log("👤 Usuario encontrado, antes de cambios:", usuario);

        args.updatedData.forEach(({ name, value }) => {
          if (name in usuarioActualizado) {
            (usuarioActualizado as any)[name] = value;
            usuarioFueModificado = true;
            console.log(`✏️ Campo '${name}' actualizado a: ${value}`);
          } else {
            console.warn(`⚠️ Campo '${name}' no existe en el usuario`);
          }
        });

        console.log("✅ Usuario después de cambios:", usuarioActualizado);
        return usuarioActualizado;
      }

      return usuario;
    });

    if (!usuarioFueModificado) {
      throw new Error("Usuario no encontrado o no se modificó ningún campo.");
    }

    // Paso 3: Guardar los usuarios actualizados en la base de datos
    await ctx.db.patch(kehila._id, {
      usuarios: usuariosActualizados,
    });

    console.log("📦 Datos guardados en Convex");

    return { success: true };
  },
});
