import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; // o el path que corresponda
import { Alia, CustomDate, LogedUserData } from "../structs/structs";

/*----------------GET LISTS-----------------------*/
export const getUsersList = (kehilaName: string) => {
  return useQuery(api.kehila.getKehilaUsersList, {
    nombre: kehilaName,
  });
}

export const getMinianimList = async (convex: any, nombre: string) => {
  return await convex.query(api.kehila.getKehilaMinianimList, {
    nombre
  });
};

export const getAniversariesFromAllUsers = (userName: string) => {
  return useQuery(api.kehila.getAniversariesFromAllUsers, {
    nombre: userName
  })
}

/*----------------GET INFO OF ONE-------------------*/
export const getKehilotNames = () => {
  return useQuery(api.kehila.getKehilotNames);
}

export const getKehilaName = (kehilaName: string) => {
  return useQuery(api.kehila.getKehilaName, {
    nombre: kehilaName,
  });
}

export const getUserOnSignIn = (superUserEmail: string ) => {
  return useQuery(api.kehila.getUserOnSignIn, {
    email: superUserEmail
  })
}

export const getUserOnSignInDirect = async (convex: any, email: string) => {
  return await convex.query(api.kehila.getUserOnSignInDirect, {
    email
  });
};

export const getPerashaInfo = (kehilaName: string, perashaName: string) => {
  console.log("Perasha Name: ", perashaName);
  
  return useQuery(api.kehila.getKehilaPerashaInfo, {
    nombre: kehilaName,
    nombrePerasha: perashaName
  });
}

export const getVisitorUserInfo = (kehilaName: string, userName: string,  userSurname: string ) => {
  console.log("🔍 Hook getVisitorUserInfo ejecutado con:", kehilaName, userName, userSurname);
  return useQuery(api.kehila.getVisitorUser, {
    nombreKehila: kehilaName,
    nombreUsuario: userName,
    apellidoUsuario: userSurname
  })
}

export const getVisitorUserInfoOnSignIn = async (convex: any, kehilaName: string, email: string ) => {
  console.log("🔍 Hook getVisitorUserInfo ejecutado con:", kehilaName, email);
  return await convex.query(api.kehila.getVisitorUserOnSignIn, {
    nombreKehila: kehilaName,
    email: email
  })
}

/*-------------POST A NEW ALIA IN TO A PERASHA--------*/
export const addAnAliaInAPerasha = () => {
  const mutation = useMutation(api.kehila.addAnAliaInAPerasha);
  return (kehilaName: string, perashaName: string, newAliaInfo: Alia) =>
    mutation({
      nombre: kehilaName,
      nombrePerasha: perashaName,
      nuevaAlia: newAliaInfo
    });
}

export const addPerashaToKehila = () => {
  const mutation = useMutation(api.kehila.addPerashaToKehila);
  return (kehilaName: string, perashaName: string) =>
    mutation({
      nombre: kehilaName,
      nombrePerasha: perashaName
    });
};

/*-------POST A NEW VISITOR USER IN TO THE KEHILA----*/
export const addAVisitorUserInTheKehila = () => {
  const mutation = useMutation(api.kehila.addVisitorUser);
    return (kehilaName: string, newUser: any) =>
      mutation({
        nombre: kehilaName,
        nuevoUsuario: newUser
      });
}

/*-------POST A NEW USER INTO THE USUARIOS LIST------*/
export const addAUserToTheUsuariosList = () => {
  const mutation = useMutation(api.kehila.addUserToUsuariosList);
  return (newUser: LogedUserData) =>
    mutation({
      nuevoUsuario: newUser
    });
};

/*----------POST A NEW DONATION IN TO A USER--------*/
export const addADonationToUser = () => {
  const mutation = useMutation(api.kehila.addDonationToUser);
  return (kehilaName: string, nombreUsuario: string, apellidoUsuario: string, nuevaDonacion: any) =>
    mutation({
      nombreKehila: kehilaName,
      nombreUsuario,
      apellidoUsuario,
      nuevaDonacion
    });
};

/*-------CHANGE THE STATUS OF A DONATION------------*/
export const changeDonationStatus = () => {
  const mutation = useMutation(api.kehila.changeDonationStatus);
  return (kehilaName: string, nombreUsuario: string, apellidoUsuario: string, fecha: CustomDate, newStatus: string, monto: number) =>
    mutation({
      nombreKehila: kehilaName,
      nombreUsuario,
      apellidoUsuario,
      fecha,
      nuevoStatus: newStatus,
      monto
    });
};

/*-------CHANGE THE STATUS OF A USER----------------*/
export const changeUserVisitorData = () => {
  const mutation = useMutation(api.kehila.changeUserVisitordata);
  return (kehilaName: string, nombreUsuario: string, apellidoUsuario: string, updatedData: { name: string; value: string }[]) =>
    mutation({
      nombreKehila: kehilaName,
      nombreUsuario,
      apellidoUsuario,
      updatedData
    });
};

/*------DELETE ALL PERASHA INFO OF THE KEHILA------*/
export const deleteAllPerashiotInfo = () => {
  const mutation = useMutation(api.kehila.deleteAllPerashiotInfo)
  return (kehilaName: string) =>
    mutation({
      nombreKehila: kehilaName,
    });
}

/*--------DELETE PERASHA INFO OF THE KEHILA--------*/
export const deletePerashaInfo = () => {
  const mutation = useMutation(api.kehila.deletePerashaInfo)
  return (kehilaName: string, perashaName: string) =>
    mutation({
      nombreKehila: kehilaName,
      nombrePerasha: perashaName
    });
}