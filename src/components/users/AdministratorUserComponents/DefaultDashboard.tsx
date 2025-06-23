import { CSSProperties, useContext, useEffect, useState } from "react";
import { colors } from "../../../assets/colors";
import { Aniversary, Grupo, VisitorUser } from "../../../structs/structs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavigationDashboardButtons } from "./NavigationDahboardButtons";
import { NextAliot } from "./AdministratorPerashiot/NextAliot";
import { OldPerashiotList } from "./AdministratorPerashiot/OldPerashiotList";

import { getUsersList } from "../../../apis/requests";
import { PageContext } from "../../../StoreInfo/page-storage";

export const AdministratorDefaultDashboard = () => {
  const navigate = useNavigate();
  const { logedUser } = useContext(PageContext) as any;
  const personas: VisitorUser[] = [
    {
      nombreKehila: "Kehila Or Hatora",
      nombreEspanol: "Nahuel",
      nombreHebreo: "נהואל",
      apellido: "Szwarc",
  
      fechaNacimientoGregoriano: {
        dia: "18",
        mes: "04",
        ano: "1993",
      },
      fechaNacimientoHebreo: {
        dia: "20",
        mes: "Iyyar",
        ano: "5735",
      },
  
      emailPersonal: "nahuel.sz@gmail.com",
      emailComercial: "contacto@szsolutions.com",
      telefono: "+59891543210",
      direccion: "Gral. Flores 1200, Montevideo",
      minian: "Minian Musaf",
      numeroSocio: "90012",
      grupo: "Levi" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "29",
        mes: "04",
        ano: "2006",
      },
      fechaBarMitzvaHebreo: {
        dia: "1",
        mes: "Iyar",
        ano: "5766",
      },
      perashaBarMitzva: "Ajarei Mot",
      habilidades: ["Tefilá", "Cantar Zemirot"],
  
      nombreMadreEspanol: "Estela",
      nombreMadreHebreo: "אסתר",
      nombrePadreEspanol: "Rubén",
      nombrePadreHebreo: "ראובן",
  
      estadoCivil: "Casado",
      nombreEsposaEspanol: "Yael",
      nombreEsposaHebreo: "יעל",

      aniversarios: [
        {
          motivo: "Boda",
          nombreDelAniversario: "Casamiento con Esther",
          fecha: {
            dia: "15",
            mes: "09",
            ano: "2010",
          },
          fechaHebreo: {
            dia: "7",
            mes: "Iyyar",
            ano: "5771",
          },
        },
        {
          motivo: "Aliá",
          nombreDelAniversario: "Aliá a Israel",
          fecha: {
            dia: "01",
            mes: "08",
            ano: "2022",
          },
          fechaHebreo: {
            dia: "14",
            mes: "Iyyar",
            ano: "5785",
          },
        },
        {
          motivo: "Aliá",
          nombreDelAniversario: "Aliá a Israel",
          fecha: {
            dia: "01",
            mes: "08",
            ano: "2022",
          },
          fechaHebreo: {
            dia: "14",
            mes: "Iyyar",
            ano: "5785",
          },
        },  
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi padre",
          fecha: {
            dia: "15",
            mes: "10",
            ano: "2020",
          },
          fechaHebreo: {
            dia: "7",
            mes: "Cheshvan",
            ano: "5781",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi madre",
          fecha: {
            dia: "22",
            mes: "03",
            ano: "2018",
          },
          fechaHebreo: {
            dia: "6",
            mes: "Nisan",
            ano: "5778",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi abuelo",
          fecha: {
            dia: "01",
            mes: "07",
            ano: "1995",
          },
          fechaHebreo: {
            dia: "3",
            mes: "Iyyar",
            ano: "5784",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi hermano",
          fecha: {
            dia: "09",
            mes: "12",
            ano: "2005",
          },
          fechaHebreo: {
            dia: "8",
            mes: "Kislev",
            ano: "5766",
          },
        }
      ] as Aniversary[]
    },
  
    {
      nombreKehila: "Kehila Shomer Emunim",
      nombreEspanol: "Matías",
      nombreHebreo: "מתתיהו",
      apellido: "Benlolo",
  
      fechaNacimientoGregoriano: {
        dia: "02",
        mes: "07",
        ano: "1991",
      },
      fechaNacimientoHebreo: {
        dia: "20",
        mes: "Tamuz",
        ano: "5751",
      },
  
      emailPersonal: "matias.benlolo@gmail.com",
      emailComercial: "info@benlolostore.uy",
      telefono: "+59892345678",
      direccion: "Garibaldi 678, Montevideo",
      minian: "Minian Arbit",
      numeroSocio: "61123",
      grupo: "Israel" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "13",
        mes: "07",
        ano: "2004",
      },
      fechaBarMitzvaHebreo: {
        dia: "17",
        mes: "Iyyar",
        ano: "5764",
      },
      perashaBarMitzva: "Pinjas",
      habilidades: ["Leer Torah"],
  
      nombreMadreEspanol: "Claudia",
      nombreMadreHebreo: "חיה",
      nombrePadreEspanol: "Yosef",
      nombrePadreHebreo: "יוסף",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      aniversarios: [
            {
              motivo: "Boda",
              nombreDelAniversario: "Casamiento con Esther",
              fecha: {
                dia: "15",
                mes: "09",
                ano: "2010",
              },
              fechaHebreo: {
                dia: "7",
                mes: "Tishrei",
                ano: "5771",
              },
            },
            {
              motivo: "Aliá",
              nombreDelAniversario: "Aliá a Israel",
              fecha: {
                dia: "01",
                mes: "08",
                ano: "2022",
              },
              fechaHebreo: {
                dia: "14",
                mes: "Iyyar",
                ano: "5782",
              },
            },
            {
              motivo: "Iortzai",
              nombreDelAniversario: "Iortzai de mi padre",
              fecha: {
                dia: "15",
                mes: "10",
                ano: "2020",
              },
              fechaHebreo: {
                dia: "17",
                mes: "Iyyar",
                ano: "5781",
              },
            },
            {
              motivo: "Iortzai",
              nombreDelAniversario: "Iortzai de mi madre",
              fecha: {
                dia: "22",
                mes: "03",
                ano: "2018",
              },
              fechaHebreo: {
                dia: "6",
                mes: "Nisan",
                ano: "5778",
              },
            },
            {
              motivo: "Iortzai",
              nombreDelAniversario: "Iortzai de mi abuelo",
              fecha: {
                dia: "01",
                mes: "07",
                ano: "1995",
              },
              fechaHebreo: {
                dia: "3",
                mes: "Tammuz",
                ano: "5755",
              },
            },
            {
              motivo: "Iortzai",
              nombreDelAniversario: "Iortzai de mi hermano",
              fecha: {
                dia: "09",
                mes: "12",
                ano: "2005",
              },
              fechaHebreo: {
                dia: "8",
                mes: "Kislev",
                ano: "5766",
              },
            },
            
      ] as Aniversary[],
    },
    {
      nombreKehila: "Kehila Neve Shalom",
      nombreEspanol: "Samuel",
      nombreHebreo: "שמואל",
      apellido: "Serfaty",
  
      fechaNacimientoGregoriano: {
        dia: "23",
        mes: "09",
        ano: "1987",
      },
      fechaNacimientoHebreo: {
        dia: "1",
        mes: "Tishrei",
        ano: "5748",
      },
  
      emailPersonal: "samuel.serfaty@yahoo.com",
      emailComercial: "samuel@nevesh.com",
      telefono: "+59898887766",
      direccion: "Av. Brasil 2332, Montevideo",
      minian: "Minian Shajarit",
      numeroSocio: "72110",
      grupo: "Cohen" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "06",
        mes: "10",
        ano: "2000",
      },
      fechaBarMitzvaHebreo: {
        dia: "7",
        mes: "Tishrei",
        ano: "5761",
      },
      perashaBarMitzva: "Haazinu",
      habilidades: ["Dar Shiur", "Liderar Tefilá"],
  
      nombreMadreEspanol: "Rina",
      nombreMadreHebreo: "רינה",
      nombrePadreEspanol: "Yehuda",
      nombrePadreHebreo: "יהודה",
  
      estadoCivil: "Casado",
      nombreEsposaEspanol: "Tamar",
      nombreEsposaHebreo: "תמר",

      aniversarios: [
        {
          motivo: "Boda",
          nombreDelAniversario: "Casamiento con Esther",
          fecha: {
            dia: "15",
            mes: "09",
            ano: "2010",
          },
          fechaHebreo: {
            dia: "7",
            mes: "Tishrei",
            ano: "5771",
          },
        },
        {
          motivo: "Aliá",
          nombreDelAniversario: "Aliá a Israel",
          fecha: {
            dia: "01",
            mes: "08",
            ano: "2022",
          },
          fechaHebreo: {
            dia: "4",
            mes: "Av",
            ano: "5782",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi padre",
          fecha: {
            dia: "15",
            mes: "10",
            ano: "2020",
          },
          fechaHebreo: {
            dia: "17",
            mes: "Iyyar",
            ano: "5785",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi madre",
          fecha: {
            dia: "22",
            mes: "03",
            ano: "2018",
          },
          fechaHebreo: {
            dia: "6",
            mes: "Nisan",
            ano: "5778",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi abuelo",
          fecha: {
            dia: "01",
            mes: "07",
            ano: "1995",
          },
          fechaHebreo: {
            dia: "3",
            mes: "Tammuz",
            ano: "5755",
          },
        },
        {
          motivo: "Iortzai",
          nombreDelAniversario: "Iortzai de mi hermano",
          fecha: {
            dia: "09",
            mes: "12",
            ano: "2005",
          },
          fechaHebreo: {
            dia: "8",
            mes: "Kislev",
            ano: "5766",
          },
        },
            
      ] as Aniversary[],
      
    },
    {
      nombreKehila: "Kehila Tikvá",
      nombreEspanol: "Jonathan",
      nombreHebreo: "יונתן",
      apellido: "Benchimol",
  
      fechaNacimientoGregoriano: {
        dia: "08",
        mes: "02",
        ano: "1996",
      },
      fechaNacimientoHebreo: {
        dia: "19",
        mes: "Shevat",
        ano: "5756",
      },
  
      emailPersonal: "jon.benchimol@gmail.com",
      emailComercial: "ventas@tikvatech.uy",
      telefono: "+59897776655",
      direccion: "Canelones 3001, Montevideo",
      minian: "Minian Musaf",
      numeroSocio: "54321",
      grupo: "Israel" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "20",
        mes: "02",
        ano: "2009",
      },
      fechaBarMitzvaHebreo: {
        dia: "25",
        mes: "Shevat",
        ano: "5769",
      },
      perashaBarMitzva: "Mishpatim",
      habilidades: ["Tocar Shofar"],
  
      nombreMadreEspanol: "Verónica",
      nombreMadreHebreo: "ורד",
      nombrePadreEspanol: "Isaac",
      nombrePadreHebreo: "יצחק",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      aniversarios: []
    },
    {
      nombreKehila: "Kehila Mishkan David",
      nombreEspanol: "Daniel",
      nombreHebreo: "דניאל",
      apellido: "Saada",
  
      fechaNacimientoGregoriano: {
        dia: "14",
        mes: "05",
        ano: "1989",
      },
      fechaNacimientoHebreo: {
        dia: "9",
        mes: "Iyar",
        ano: "5749",
      },
  
      emailPersonal: "daniel.saada@gmail.com",
      emailComercial: "daniel@mishkansaada.com",
      telefono: "+59896665544",
      direccion: "Cno. Carrasco 456, Montevideo",
      minian: "Minian Diario",
      numeroSocio: "60987",
      grupo: "Levi" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "23",
        mes: "05",
        ano: "2002",
      },
      fechaBarMitzvaHebreo: {
        dia: "12",
        mes: "Iyar",
        ano: "5762",
      },
      perashaBarMitzva: "Behar",
      habilidades: ["Liderar Tefilá"],
  
      nombreMadreEspanol: "Judith",
      nombreMadreHebreo: "יהודית",
      nombrePadreEspanol: "Ezra",
      nombrePadreHebreo: "עזריה",
  
      estadoCivil: "Casado",
      nombreEsposaEspanol: "Débora",
      nombreEsposaHebreo: "דבורה",

      aniversarios: []
    },
    {
      nombreKehila: "Kehila Beit Israel",
      nombreEspanol: "David",
      nombreHebreo: "דוד",
      apellido: "Cohen",
  
      fechaNacimientoGregoriano: {
        dia: "05",
        mes: "11",
        ano: "1990",
      },
      fechaNacimientoHebreo: {
        dia: "17",
        mes: "Cheshvan",
        ano: "5751",
      },
  
      emailPersonal: "david.cohen@gmail.com",
      emailComercial: "info@cohenconsulting.com",
      telefono: "+59891111222",
      direccion: "Ellauri 1234, Montevideo",
      minian: "Minian Musaf",
      numeroSocio: "12345",
      grupo: "Cohen" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "28",
        mes: "10",
        ano: "2003",
      },
      fechaBarMitzvaHebreo: {
        dia: "2",
        mes: "Cheshvan",
        ano: "5764",
      },
      perashaBarMitzva: "Lej Lejá",
      habilidades: ["Shofar", "Dar Dvar Torah"],
  
      nombreMadreEspanol: "Raquel",
      nombreMadreHebreo: "רחל",
      nombrePadreEspanol: "Itzjak",
      nombrePadreHebreo: "יצחק",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      aniversarios: []
    },
    {
      nombreKehila: "Kehila Beit Israel",
      nombreEspanol: "Daniel",
      nombreHebreo: "דוד",
      apellido: "Cohen",
  
      fechaNacimientoGregoriano: {
        dia: "05",
        mes: "11",
        ano: "1990",
      },
      fechaNacimientoHebreo: {
        dia: "17",
        mes: "Cheshvan",
        ano: "5751",
      },
  
      emailPersonal: "david.cohen@gmail.com",
      emailComercial: "info@cohenconsulting.com",
      telefono: "+59891111222",
      direccion: "Ellauri 1234, Montevideo",
      minian: "Minian Musaf",
      numeroSocio: "12345",
      grupo: "Cohen" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "28",
        mes: "10",
        ano: "2003",
      },
      fechaBarMitzvaHebreo: {
        dia: "2",
        mes: "Cheshvan",
        ano: "5764",
      },
      perashaBarMitzva: "Lej Lejá",
      habilidades: ["Shofar", "Dar Dvar Torah"],
  
      nombreMadreEspanol: "Raquel",
      nombreMadreHebreo: "רחל",
      nombrePadreEspanol: "Itzjak",
      nombrePadreHebreo: "יצחק",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      aniversarios: []
    },
  
    {
      nombreKehila: "Kehila Magen David",
      nombreEspanol: "Gabriel",
      nombreHebreo: "גבריאל",
      apellido: "Bitton",
  
      fechaNacimientoGregoriano: {
        dia: "15",
        mes: "03",
        ano: "1985",
      },
      fechaNacimientoHebreo: {
        dia: "22",
        mes: "Adar",
        ano: "5745",
      },
  
      emailPersonal: "gabriel.bitton@hotmail.com",
      emailComercial: "ventas@bittongroup.uy",
      telefono: "+59894443322",
      direccion: "Av. Rivera 2345, Montevideo",
      minian: "Minian Arbit",
      numeroSocio: "33221",
      grupo: "Israel" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "25",
        mes: "03",
        ano: "1998",
      },
      fechaBarMitzvaHebreo: {
        dia: "27",
        mes: "Adar",
        ano: "5758",
      },
      perashaBarMitzva: "Tzav",
      habilidades: ["Leer Haftará"],
  
      nombreMadreEspanol: "Sara",
      nombreMadreHebreo: "שרה",
      nombrePadreEspanol: "Moshé",
      nombrePadreHebreo: "משה",
  
      estadoCivil: "Casado",
      nombreEsposaEspanol: "Noa",
      nombreEsposaHebreo: "נעה",

      aniversarios: []
    },
  
    {
      nombreKehila: "Kehila Sefaradí",
      nombreEspanol: "Isaac",
      nombreHebreo: "יצחק",
      apellido: "Toledano",
  
      fechaNacimientoGregoriano: {
        dia: "30",
        mes: "08",
        ano: "1992",
      },
      fechaNacimientoHebreo: {
        dia: "2",
        mes: "Elul",
        ano: "5752",
      },
  
      emailPersonal: "isaac.t92@gmail.com",
      emailComercial: "isaac@toledano.uy",
      telefono: "+59892221133",
      direccion: "Bulevar Artigas 987, Montevideo",
      minian: "Minian Shabat",
      numeroSocio: "55678",
      grupo: "Levi" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "12",
        mes: "09",
        ano: "2005",
      },
      fechaBarMitzvaHebreo: {
        dia: "8",
        mes: "Elul",
        ano: "5765",
      },
      perashaBarMitzva: "Ki Tetzé",
      habilidades: ["Tocar Shofar", "Liderar Tefilá"],
  
      nombreMadreEspanol: "Miriam",
      nombreMadreHebreo: "מרים",
      nombrePadreEspanol: "Eliyahu",
      nombrePadreHebreo: "אליהו",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      cuenta: [
        {
          monto: 1000,
          tipoMoneda: "USD",
          motivo: "Alia",
          perasha: "Vayikra",
          fecha: {
            dia: "01",
            mes: "01",
            ano: "2023",
          },
          status: "PENDIENTE",
        },
        {
          monto: 500,
          tipoMoneda: "ARS",
          motivo: "Otro",
          fecha: {
            dia: "15",
            mes: "02",
            ano: "2023",
          },
          aclaracion: "Donación para la Kehila",
          status: "PENDIENTE",
        },
        {
          monto: 500,
          tipoMoneda: "ARS",
          motivo: "Otro",
          fecha: {
            dia: "15",
            mes: "02",
            ano: "2023",
          },
          aclaracion: "Donación para la Kehila",
          status: "PENDIENTE",
        },
        {
          monto: 500,
          tipoMoneda: "USD",
          motivo: "Otro",
          fecha: {
            dia: "15",
            mes: "02",
            ano: "2023",
          },
          aclaracion: "Donación para la Kehila",
          status: "PAGADA",
        }
      ] as any[],

      aniversarios: []
    },
  
    {
      nombreKehila: "Kehila Etz Jaim",
      nombreEspanol: "Elías",
      nombreHebreo: "אליהו",
      apellido: "Nahón",
  
      fechaNacimientoGregoriano: {
        dia: "21",
        mes: "01",
        ano: "1982",
      },
      fechaNacimientoHebreo: {
        dia: "26",
        mes: "Tevet",
        ano: "5742",
      },
  
      emailPersonal: "elias.nahon@gmail.com",
      emailComercial: "info@nahonabogados.com",
      telefono: "+59893456789",
      direccion: "Luis Alberto de Herrera 789, Montevideo",
      minian: "Minian Diario",
      numeroSocio: "87123",
      grupo: "Cohen" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "03",
        mes: "02",
        ano: "1995",
      },
      fechaBarMitzvaHebreo: {
        dia: "2",
        mes: "Shevat",
        ano: "5755",
      },
      perashaBarMitzva: "Beshalaj",
      habilidades: ["Jazan", "Dar Shiur"],
  
      nombreMadreEspanol: "Lea",
      nombreMadreHebreo: "לאה",
      nombrePadreEspanol: "Abraham",
      nombrePadreHebreo: "אברהם",
  
      estadoCivil: "Casado",
      nombreEsposaEspanol: "Rivka",
      nombreEsposaHebreo: "רבקה",

      aniversarios: []
    },
  
    {
      nombreKehila: "Kehila Benei Torah",
      nombreEspanol: "Yonatan",
      nombreHebreo: "יונתן",
      apellido: "Mizrahi",
  
      fechaNacimientoGregoriano: {
        dia: "10",
        mes: "12",
        ano: "1995",
      },
      fechaNacimientoHebreo: {
        dia: "18",
        mes: "Kislev",
        ano: "5756",
      },
  
      emailPersonal: "yonatan.mizrahi@gmail.com",
      emailComercial: "yonatan@mizrahicorp.com",
      telefono: "+59898765432",
      direccion: "Br. Espana 3210, Montevideo",
      minian: "Minian Shajarit",
      numeroSocio: "76543",
      grupo: "Israel" as Grupo,
  
      fechaBarMitzvaGregoriano: {
        dia: "22",
        mes: "12",
        ano: "2008",
      },
      fechaBarMitzvaHebreo: {
        dia: "25",
        mes: "Kislev",
        ano: "5769",
      },
      perashaBarMitzva: "Miketz",
      habilidades: ["Leer Torah", "Tocar Shofar"],
  
      nombreMadreEspanol: "Esther",
      nombreMadreHebreo: "אסתר",
      nombrePadreEspanol: "Daniel",
      nombrePadreHebreo: "דניאל",
  
      estadoCivil: "Soltero",
      nombreEsposaEspanol: "",
      nombreEsposaHebreo: "",

      aniversarios: []
    },
  ];

  const usuarios = logedUser != undefined ? getUsersList(logedUser.kehila) : []
  
  const [step, setStep] = useState(1)
  const [oldPerashaInfo, setOldPerashaInfo] = useState(false)
  const [peopleList, setPeopleList] = useState<VisitorUser[]>();
  const [peopleFilter, setPeopleFilter] = useState(peopleList);

  const getEstadoDeCuenta = (cuenta: any[]) => {
    let hasPendingDonation;
    if (!cuenta || cuenta.length === 0) {
      hasPendingDonation = "SIN MOVIMIENTOS"
    } else {
      const pendingDonation = cuenta.some((movimiento) => movimiento.status === "PENDIENTE");
      hasPendingDonation = pendingDonation ? "PENDIENTE" : "PAGADA";
    }
    return hasPendingDonation
  }; 
  
  useEffect(() => {
    setPeopleList(usuarios)
    setPeopleFilter(usuarios)
    //console.log("Lista de usuarios: ", peopleFilter);
    oldPerashaInfo ? setStep(3) : setStep(1)
  }, [usuarios])
  
  return (
    <div style={styles.container}>     
      <NavigationDashboardButtons 
        peopleList={peopleList} 
        setPeopleFilter={setPeopleFilter} 
        peopleFilter={peopleFilter} 
        setStep={setStep}
        step={step}  />

      {step == 1 ? (
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecorationLine: 'underline', textDecorationColor: 'orange', marginTop: '10px', marginBottom: '10px'}}>
            {`Lista de participantes de la Kehila`}
          </div>
          <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px",  }}>
            {peopleFilter != undefined && peopleFilter!.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Nombre</th>
                    <th style={styles.th}>Nombre Hebreo</th>
                    <th style={styles.th}>Numero de Socio</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Fecha Nacimiento Gregoriano</th>
                    <th style={styles.th}>Fecha Nacimiento Hebreo</th>
                    <th style={styles.th}>Estado Cuenta</th>
                  </tr>
                </thead>
                <tbody>
                  {peopleFilter!.map((persona, index) => {
                    const nombre = persona.nombreEspanol + " " + persona.apellido;
                    const nombreHebreo = persona.nombreHebreo;
                    const numeroSocio = persona.numeroSocio;
                    const grupo = persona.grupo;
                    const fechaNacimientoGreg = `${persona.fechaNacimientoGregoriano!.dia}/${persona.fechaNacimientoGregoriano!.mes}/${persona.fechaNacimientoGregoriano!.ano}`;
                    const fechaNacimientoHeb = `${persona.fechaNacimientoHebreo!.dia} ${persona.fechaNacimientoHebreo!.mes} ${persona.fechaNacimientoHebreo!.ano}`;
                    const estadoCuenta = getEstadoDeCuenta(persona.cuenta? persona.cuenta : []);

                    return (
                      <tr key={index}>
                        <td style={styles.td} data-label="Nombre">{nombre}</td>
                        <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                        <td style={styles.td} data-label="NumeroSocio">{numeroSocio}</td>
                        <td style={styles.td} data-label="Grupo">{grupo}</td>
                        <td style={styles.td} data-label="FechaNacimientoGreg">{fechaNacimientoGreg}</td>
                        <td style={styles.td} data-label="FechaNacimientoHeb">{fechaNacimientoHeb}</td>
                        <td style={styles.td} data-label="EstadoCuenta">
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: estadoCuenta === "PENDIENTE" ? "#fef3c7" :
                                            estadoCuenta === "PAGADA" ? "#d1fae5" :
                                            "#e0e7ff",
                            color: estadoCuenta === "PENDIENTE" ? "#92400e" :
                                  estadoCuenta === "PAGADA" ? "#065f46" :
                                  "#3730a3"
                          }}>
                            {estadoCuenta}
                          </span>
                        </td>
                        <td 
                          style={{...styles.td, color: "green", alignItems: "center", cursor:"pointer"}}
                          data-label="EstadoCuenta"
                          onClick={() => navigate(`/administrator-user-info/${persona.nombreEspanol}-${persona.apellido!}`)}
                        >
                          <FaArrowAltCircleRight className="text-3xl text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                        </td>
                      </tr>
                    );
                  })} 
                </tbody>
              </table>
            )
            : 
            (
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                <h5 style={{ color: colors.btn_background }}>No hay usuarios registrados</h5>
              </div>
            )}
          </div>
        </div>
      ) : (
        null
      )}
      {step == 2 ? (
        <NextAliot peopleList={peopleList}/>
      ) : (
        null
      )}
      {step == 3 ? (
        <OldPerashiotList setOldPerashaInfo={setOldPerashaInfo} setStep={setStep}/>
      ) : (
        null
      )}
    </div>
  );
}

<style>
{`
  @media (max-width: 768px) {
    table {
      display: block;
      width: 100%;
    }
    thead {
      display: none;
    }
    tbody {
      display: block;
    }
    tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
      background: #f9f9f9;
    }
    td {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      border: none;
      border-bottom: 1px solid #eee;
    }
    td::before {
      content: attr(data-label);
      font-weight: bold;
      flex-basis: 50%;
    }
  }
`}
</style>


const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "95%",
    minHeight: "75vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
    textAlign:"center"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    border: `2px solid ${colors.btn_background}`,
    borderColor: colors.btn_background,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.btn_background,
    borderRadius: "30px",
    padding: "10px 20px",
    maxWidth: "900px",
    marginTop: "20px",
    width: "100%"
  },
  buttonGroup: {
    display: "flex",
    flex: 1,
    gap: "10px",
  },
  button: {
    backgroundColor: "green",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "1px solid green",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    backgroundColor: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
    width: "180px",
    color: "black",
    fontSize: "16px",
  },
  tableContainer: {
    height: 'auto',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
  } as CSSProperties,
  table: {
    borderCollapse: 'separate',
    borderSpacing: '10px 12px', // espacio vertical entre filas
    width: '100%',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'center',
    fontWeight: 'bolder ',
    background: '#f9f9f9',
    color: '#333',
    fontSize: '1.05rem',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: '14px 16px',
    background: '#fff',
    fontSize: '1.05rem',
    color: '#333',
    borderRadius: '8px', // importante
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
  },
  cellPopover: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    justifyContent: 'space-between',
    width: '100%',
  } as CSSProperties,
  popover: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '5px',
    zIndex: 1000,
    whiteSpace: 'nowrap',
  } as CSSProperties,
  headerButtons: {
    display: "flex",
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterButton: {
    border: "1px solid blue",
    color: 'black',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: colors.main_background
  } as CSSProperties
};