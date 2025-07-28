import { colors } from "../../../../assets/colors";
import { CSSProperties, useEffect, useState } from "react";
import { HDate } from '@hebcal/core';
import { Grupo, HEBREW_MONTHS, VisitorUser } from "../../../../structs/structs";
import { FaArrowAltCircleRight, FaFilter } from "react-icons/fa";
import { DateToDateAniversary } from "./DateToDateAniversary";
import { useNavigate } from "react-router-dom";

interface DaysOfThisWeek {
  currentYear: number,
  currentMonth: string,
  nextMonth: string,
  sunday: string,
  friday: string
}

interface NextAliotProps {
  peopleList?: VisitorUser[]
}

interface AniversariesList {
  motivo: string,
  nombre: string,
  apellido: string,
  nombreHebreo: string,
  numeroSocio: string,
  grupo: Grupo,
  minian: string,
  habilidades: [],
  fechaAniGreg: {
    dia: string,
    mes: string,
    ano: string
  },
  fechaAniHeb: {
    dia: string,
    mes: string,
    ano: string
  }
}

export const NextAliot = ({peopleList}: NextAliotProps) => {
  const navigate = useNavigate();
  const [thisWeekAniversaries, setThisWeekAniversaries] = useState<AniversariesList[]>([])
  const [filteredAniversaries, setFilteredAniversaries] = useState<AniversariesList[]>([])
  const [daysOfThisWeek, setDaysOfThisWeek] = useState<DaysOfThisWeek>({
    currentYear: 0,
    currentMonth: "",
    nextMonth: "",
    sunday: "",
    friday: ""
  })

  const [clicked, setClicked] = useState<boolean>(false)
  const [renderedAniversaries, setRenderedAniversaries] = useState<AniversariesList[]>([]);

  function getNextHebrewMonth(currentMonth: string) {
    const index = HEBREW_MONTHS.indexOf(currentMonth as typeof HEBREW_MONTHS[number]);
    if (index === -1) {
      throw new Error("Mes hebreo inválido");
    }
    const nextIndex = (index + 1) % HEBREW_MONTHS.length;
    return HEBREW_MONTHS[nextIndex];
  }

  const getCurrentHebrewWeek = (thisWeekDays: DaysOfThisWeek) => {
    const today = new HDate();
    let nextFriday = new HDate(today);
    let previousSunday = new HDate(today);

    thisWeekDays.currentYear = nextFriday.getFullYear()
    thisWeekDays.currentMonth = nextFriday.getMonthName()

    while (previousSunday.getDay() !== 0) {
      previousSunday = previousSunday.prev();
    }
    thisWeekDays.sunday = previousSunday.toString();

    while (nextFriday.getDay() !== 5) {  
      nextFriday = nextFriday.next();
    }

    if (nextFriday < previousSunday) {
      const nextMonth = getNextHebrewMonth(thisWeekDays.currentMonth);
      thisWeekDays.nextMonth = nextMonth;
    }

    thisWeekDays.friday = nextFriday.toString();

    setDaysOfThisWeek(thisWeekDays);

    return thisWeekDays
  }

  const getCurrentWeekAniversaries = (currentMonthAniversaries: AniversariesList[], sundayDate: string, fridayDate: string) => {
    const nearSundayDay: number = parseInt(sundayDate.toString().match(/^\d+/)![0], 10)
    const nearFridayDay: number = parseInt(fridayDate.toString().match(/^\d+/)![0], 10)
    
    const filteredAniversaries = currentMonthAniversaries.filter((ani) => {
      return parseInt(ani.fechaAniHeb.dia) >= nearSundayDay && parseInt(ani.fechaAniHeb.dia) <= nearFridayDay
    })
    
    setRenderedAniversaries(filteredAniversaries);

    return filteredAniversaries || [];
  }

  const getCurrentMonthAniversaries = (currentMonth: string, nextMonth: string) => {
    const monthAniversaries = peopleList!
      .filter((persona) =>
        persona.aniversarios!.some((ani) => ani.fechaHebreo!.mes === currentMonth || ani.fechaHebreo!.mes === nextMonth)
      )
      .flatMap((persona) =>
        persona.aniversarios!
        .filter((ani) => ani.fechaHebreo!.mes === currentMonth || ani.fechaHebreo!.mes === nextMonth)
        .map((ani) => ({
          motivo: ani.motivo,
          nombre: persona.nombreEspanol,
          apellido: persona.apellido,
          nombreHebreo: persona.nombreHebreo,
          numeroSocio: persona.numeroSocio,
          grupo: persona.grupo,
          minian: persona.minian,
          habilidades: persona.habilidades,
          fechaAniGreg: {
            dia: ani.fecha?.dia,
            mes: ani.fecha?.mes,
            ano: ani.fecha?.ano,
          },
          fechaAniHeb: {
            dia: ani.fechaHebreo?.dia,
            mes: ani.fechaHebreo?.mes,
            ano: ani.fechaHebreo?.ano,
          },
        } as AniversariesList))
      );

    const monthBirthdates = peopleList!
      .filter(persona => persona.fechaNacimientoHebreo?.mes === currentMonth || persona.fechaNacimientoHebreo!.mes === nextMonth)
      .map(per => ({
        motivo: "Cumpleaños",
        nombre: per.nombreEspanol,
        apellido: per.apellido,
        nombreHebreo: per.nombreHebreo,
        numeroSocio: per.numeroSocio,
        grupo: per.grupo,
        minian: per.minian,
        habilidades: per.habilidades,
        fechaAniGreg: {
          dia: per.fechaNacimientoGregoriano?.dia,
          mes: per.fechaNacimientoGregoriano?.mes,
          ano: per.fechaNacimientoGregoriano?.ano,
        },
        fechaAniHeb: {
          dia: per.fechaNacimientoHebreo?.dia,
          mes: per.fechaNacimientoHebreo?.mes,
          ano: per.fechaNacimientoHebreo?.ano,
        },
      } as AniversariesList));

    const monthBarMitzvaAniversary = peopleList!
      .filter(persona => persona.fechaBarMitzvaHebreo?.mes === currentMonth || persona.fechaBarMitzvaHebreo!.mes === nextMonth)
      .map(per => ({
        motivo: "Bar Mitzva",
        nombre: per.nombreEspanol,
        apellido: per.apellido,
        nombreHebreo: per.nombreHebreo,
        numeroSocio: per.numeroSocio,
        grupo: per.grupo,
        minian: per.minian,
        habilidades: per.habilidades,
        fechaAniGreg: {
          dia: per.fechaBarMitzvaGregoriano?.dia,
          mes: per.fechaBarMitzvaGregoriano?.mes,
          ano: per.fechaBarMitzvaGregoriano?.ano,
        },
        fechaAniHeb: {
          dia: per.fechaBarMitzvaHebreo?.dia,
          mes: per.fechaBarMitzvaHebreo?.mes,
          ano: per.fechaBarMitzvaHebreo?.ano,
        },
      } as AniversariesList));

    const allAniversaries: AniversariesList[] = [
      ...monthAniversaries,
      ...monthBirthdates,
      ...monthBarMitzvaAniversary
    ];

    return allAniversaries || [];
  };

  /*const getCurrentYearAniversaries = (currentWeekAniversaries: AniversariesList[], currentYear: number) => {
    const thisYearAniversaries = currentWeekAniversaries.filter((ani) => {
      return +ani.fechaAniHeb.ano === currentYear
    })

    console.log("This Year Aniversaries: ", thisYearAniversaries);
    return thisYearAniversaries || [];
  }*/

  const getThisWeekAniversaries = (datesOfThisWeek: DaysOfThisWeek) => {
    const currentMonthAniversaries = getCurrentMonthAniversaries(datesOfThisWeek.currentMonth, datesOfThisWeek.nextMonth)
    const currentWeekAniversaries = getCurrentWeekAniversaries(currentMonthAniversaries, datesOfThisWeek.sunday, datesOfThisWeek.friday)
    //const currentYearAniversaries = getCurrentYearAniversaries(currentWeekAniversaries, datesOfThisWeek.currentYear)
    return currentWeekAniversaries
  }

  const getThisWeekAniversariesFromAllUsers = () => {
    const datesOfThisWeek = getCurrentHebrewWeek(daysOfThisWeek)  
    const thisWeekAniversaries = getThisWeekAniversaries(datesOfThisWeek)
    return thisWeekAniversaries
  }

  const searchAniByMotiveOrMinian = (key: string) => {
    const keySearch = key.trim().toLowerCase();

    if (keySearch === "") {
      // Mostrar nuevamente todos los aniversarios disponibles (ya filtrados por fecha)
      setFilteredAniversaries(renderedAniversaries);
      return;
    }

    const filtered = filteredAniversaries.filter(ani =>
      ani.motivo.toLowerCase().startsWith(keySearch) ||
      ani.minian.toLowerCase().startsWith(keySearch)
    );

    setFilteredAniversaries(filtered);
  };


  useEffect(() => {
    const thisWeekAniversaries = getThisWeekAniversariesFromAllUsers()
    setThisWeekAniversaries(thisWeekAniversaries)
    setFilteredAniversaries(thisWeekAniversaries)
  }, [])

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={styles.headerButtons}>
        {<div style={{ display: "flex", gap: '10px', width: '100%', marginTop: '20px'}}>
          <DateToDateAniversary peopleList={peopleList!} setFilteredAniversaries={setFilteredAniversaries} daysOfThisWeek={daysOfThisWeek} setRenderedAniversaries={setRenderedAniversaries} />
        </div>}
        {thisWeekAniversaries.length > 0 && (
          <div style={{ display: "flex", gap: '10px', width: '100%', marginTop: '20px', justifyContent: "flex-end"}}>
            <div style={{...styles.rightGroup, display: "flex", padding: '10px', borderRadius: '20px'}}>
              <FaFilter className="text-orange" />
              <input
                type="text"
                placeholder="Busca por motivo o Minian"
                style={{...styles.input, borderColor: clicked ? "orange" : "#ccc"}}
                onChange={(e) => searchAniByMotiveOrMinian(e.target.value)}
                onClick={() => setClicked(true)}
                onBlur={() => setClicked(false)}
              />
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>
          {filteredAniversaries.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Nombre Hebreo</th>
                  <th style={styles.th}>Numero de Socio</th>
                  <th style={styles.th}>Estatus Halájico</th>
                  <th style={styles.th}>Minian</th>
                  <th style={styles.th}>Conocimientos</th>
                  <th style={styles.th}>Fecha Aniversario Gregoriano</th>
                  <th style={styles.th}>Fecha Aniversario Hebreo</th>
                </tr>
              </thead>
              <tbody>
                {filteredAniversaries.map((ani: AniversariesList, index) => {
                  const motivo = ani.motivo
                  const nombre = ani.nombre + " " + ani.apellido;
                  const nombreHebreo = ani.nombreHebreo;
                  const numeroSocio = ani.numeroSocio;
                  const grupo = ani.grupo;
                  const minian = ani.minian
                  const habilidades = ani.habilidades
                  const fechaAniGreg = `${ani.fechaAniGreg.dia}/${ani.fechaAniGreg.mes}/${ani.fechaAniGreg.ano}`;
                  const fechaAniHeb = `${ani.fechaAniHeb.dia} ${ani.fechaAniHeb.mes} ${ani.fechaAniHeb.ano}`;

                  return (
                    <tr key={index}>
                      <td style={styles.td} data-label="Motivo">{motivo}</td>
                      <td style={styles.td} data-label="Nombre">{nombre}</td>
                      <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                      <td style={styles.td} data-label="NumeroSocio">{numeroSocio}</td>
                      <td style={styles.td} data-label="Grupo">{grupo}</td>
                      <td style={styles.td} data-label="Minian">{minian}</td>
                      <td style={styles.td} data-label="Conocimientos">{habilidades?.join(', ')}</td>
                      <td style={styles.td} data-label="FechaNacimientoGreg">{fechaAniGreg}</td>
                      <td style={styles.td} data-label="FechaNacimientoHeb">{fechaAniHeb}</td>
                      <td 
                        style={{...styles.td, color: "green", alignItems: "center", cursor:"pointer"}}
                        data-label="EstadoCuenta"
                        onClick={() => navigate(`/administrator-user-info/${ani.nombre}-${ani.apellido}`)}
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
              <h5 style={{ color: colors.btn_background }}>Ningún usuario tiene un aniversario en estas fecha</h5>
            </div>
          )}
        </div>
      </div>
    </div>
)}

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
    height: "75vh",
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between",
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
  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    backgroundColor: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "2px solid",
    outline: "none",
    width: "100%",
    color: "black",
    fontSize: "16px",
  },
  tableContainer: {
    height: 'auto',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
  } as CSSProperties,
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
    //gap: '10px',
    marginBottom: '10px',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    //backgroundColor: 'red',
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