import { colors } from "../../../../assets/colors";
import { CSSProperties, useEffect, useState } from "react";
import { HDate } from '@hebcal/core';
import { Grupo, VisitorUser } from "../../../../structs/structs";
import { FaFilter } from "react-icons/fa";

interface DaysOfThisWeek {
  currentYear: number,
  currentMonth: string,
  sunday: string,
  friday: string
}

interface NextAliotProps {
  peopleList: VisitorUser[]
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
    año: string
  },
  fechaAniHeb: {
    dia: string,
    mes: string,
    año: string
  }
}

export const NextAliot = ({peopleList}: NextAliotProps) => {
  const [thisWeekAniversaries, setThisWeekAniversaries] = useState<AniversariesList[]>([])
  const [filteredAniversaries, setFilteredAniversaries] = useState<AniversariesList[]>([])
  const [daysOfThisWeek, setDaysOfThisWeek] = useState<DaysOfThisWeek>({
    currentYear: 0,
    currentMonth: "",
    sunday: "",
    friday: ""
  })

  const getCurrentHebrewWeek = (daysOfThisWeek: DaysOfThisWeek) => {
    const today = new HDate();
    let nextFriday = new HDate(today);
    let previousSunday = new HDate(today);

    daysOfThisWeek.currentYear = nextFriday.getFullYear()
    daysOfThisWeek.currentMonth = nextFriday.getMonthName()

    while (previousSunday.getDay() !== 0) {
      previousSunday = previousSunday.prev();
    }
    daysOfThisWeek.sunday = previousSunday.toString();

    while (nextFriday.getDay() !== 5) {
      nextFriday = nextFriday.next();
    }
    daysOfThisWeek.friday = nextFriday.toString();

    console.log("daysOfThisWeek: ", daysOfThisWeek);
    return daysOfThisWeek
  }

  const getCurrentWeekAniversaries = (currentMonthAniversaries: AniversariesList[], sundayDate: string, fridayDate: string) => {
    console.log("Sunday dates: ", sundayDate);
    console.log("Friday dates: ", fridayDate);
    
    
    const nearSundayDay: number = parseInt(sundayDate.toString().match(/^\d+/)![0], 10)
    const nearFridayDay: number = parseInt(fridayDate.toString().match(/^\d+/)![0], 10)
    console.log("Just day: Sunday: ", nearSundayDay, ", Friday: ", nearFridayDay);
    
    const aniversariosFiltrados = currentMonthAniversaries.filter((ani) => {
      return parseInt(ani.fechaAniHeb.dia) >= nearSundayDay && parseInt(ani.fechaAniHeb.dia) <= nearFridayDay
    })

    console.log("Aniversarios entre los días:", nearSundayDay, "y", nearFridayDay, aniversariosFiltrados);
    return aniversariosFiltrados || [];
  }

  const getCurrentMonthAniversaries = (currentMonth: string) => {
    console.log("People List: ", peopleList);

    const monthAniversaries = peopleList
      .filter((persona) =>
        persona.aniversarios!.some((ani) => ani.fechaHebreo!.mes === currentMonth)
      )
      .flatMap((persona) =>
        persona.aniversarios!
        .filter((ani) => ani.fechaHebreo!.mes === currentMonth)
        .map((ani) => ({
          motivo: ani.motivo,
          nombre: persona.nombreEspañol,
          apellido: persona.apellido,
          nombreHebreo: persona.nombreHebreo,
          numeroSocio: persona.numeroSocio,
          grupo: persona.grupo,
          minian: persona.minian,
          habilidades: persona.habilidades,
          fechaAniGreg: {
            dia: ani.fecha?.dia,
            mes: ani.fecha?.mes,
            año: ani.fecha?.año,
          },
          fechaAniHeb: {
            dia: ani.fechaHebreo?.dia,
            mes: ani.fechaHebreo?.mes,
            año: ani.fechaHebreo?.año,
          },
        } as AniversariesList))
      );

    const monthBirthdates = peopleList
      .filter(persona => persona.fechaNacimientoHebreo?.mes === currentMonth)
      .map(per => ({
        motivo: "Cumpleaños",
        nombre: per.nombreEspañol,
        apellido: per.apellido,
        nombreHebreo: per.nombreHebreo,
        numeroSocio: per.numeroSocio,
        grupo: per.grupo,
        minian: per.minian,
        habilidades: per.habilidades,
        fechaAniGreg: {
          dia: per.fechaNacimientoGregoriano?.dia,
          mes: per.fechaNacimientoGregoriano?.mes,
          año: per.fechaNacimientoGregoriano?.año,
        },
        fechaAniHeb: {
          dia: per.fechaNacimientoHebreo?.dia,
          mes: per.fechaNacimientoHebreo?.mes,
          año: per.fechaNacimientoHebreo?.año,
        },
      } as AniversariesList));

    const monthBarMitzvaAniversary = peopleList
      .filter(persona => persona.fechaBarMitzvaHebreo?.mes === currentMonth)
      .map(per => ({
        motivo: "Bar Mitzva",
        nombre: per.nombreEspañol,
        apellido: per.apellido,
        nombreHebreo: per.nombreHebreo,
        numeroSocio: per.numeroSocio,
        grupo: per.grupo,
        minian: per.minian,
        habilidades: per.habilidades,
        fechaAniGreg: {
          dia: per.fechaBarMitzvaGregoriano?.dia,
          mes: per.fechaBarMitzvaGregoriano?.mes,
          año: per.fechaBarMitzvaGregoriano?.año,
        },
        fechaAniHeb: {
          dia: per.fechaBarMitzvaHebreo?.dia,
          mes: per.fechaBarMitzvaHebreo?.mes,
          año: per.fechaBarMitzvaHebreo?.año,
        },
      } as AniversariesList));

    const allAniversaries: AniversariesList[] = [
      ...monthAniversaries,
      ...monthBirthdates,
      ...monthBarMitzvaAniversary
    ];

    console.log("This Month Aniversaries (formatted): ", allAniversaries);
    return allAniversaries || [];
  };

  /*const getCurrentYearAniversaries = (currentWeekAniversaries: AniversariesList[], currentYear: number) => {
    const thisYearAniversaries = currentWeekAniversaries.filter((ani) => {
      return +ani.fechaAniHeb.año === currentYear
    })

    console.log("This Year Aniversaries: ", thisYearAniversaries);
    return thisYearAniversaries || [];
  }*/

  const getThisWeekAniversaries = (datesOfThisWeek: DaysOfThisWeek) => {
    const currentMonthAniversaries = getCurrentMonthAniversaries(datesOfThisWeek.currentMonth)
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
    const lowerKey = key.trim().toLowerCase();

    if (lowerKey === "") {
      setFilteredAniversaries(thisWeekAniversaries); // sin filtro, mostrar todos
    } else {
      const filtered = thisWeekAniversaries.filter(
        ani => ani.motivo.toLowerCase().startsWith(lowerKey) || ani.minian.toLowerCase().includes(lowerKey)
      );
      setFilteredAniversaries(filtered);
    }
  };

  useEffect(() => {
    const thisWeekAniversaries = getThisWeekAniversariesFromAllUsers()
    setThisWeekAniversaries(thisWeekAniversaries)
    setFilteredAniversaries(thisWeekAniversaries)
  }, [])

  return (
    <div>
      <div style={styles.headerButtons}>
        <div style={{ display: "flex", gap: '10px', width: '100%', marginTop: '20px', justifyContent: "flex-end"}}>
          <div style={{...styles.rightGroup, display: "flex",border: '3px solid orange', padding: '10px', borderRadius: '20px'}}>
            <FaFilter className="text-orange" />
            <input
              type="text"
              placeholder="Busca por motivo o Minian"
              style={styles.input}
              onChange={(e) => searchAniByMotiveOrMinian(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex",fontSize: '1.5rem', fontWeight: 'bold', justifyContent: "flex-start", textDecorationLine: 'underline', textDecorationColor: 'orange'}}>
        {`Lista de aniversarios que caen en la semana del ${daysOfThisWeek.sunday.toString().match(/^\d+/)} al ${daysOfThisWeek.friday.toString().match(/^\d+/)} de ${daysOfThisWeek.currentMonth}:`}
      </div>
      <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>
          {filteredAniversaries.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Nombre Hebreo</th>
                  <th style={styles.th}>Numero de Socio</th>
                  <th style={styles.th}>Grupo</th>
                  <th style={styles.th}>Minian</th>
                  <th style={styles.th}>Habilidades</th>
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
                  const fechaAniGreg = `${ani.fechaAniGreg.dia}/${ani.fechaAniGreg.mes}/${ani.fechaAniGreg.año}`;
                  const fechaAniHeb = `${ani.fechaAniHeb.dia} ${ani.fechaAniHeb.mes} ${ani.fechaAniHeb.año}`;

                  return (
                    <tr key={index}>
                      <td style={styles.td} data-label="Motivo">{motivo}</td>
                      <td style={styles.td} data-label="Nombre">{nombre}</td>
                      <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                      <td style={styles.td} data-label="NumeroSocio">{numeroSocio}</td>
                      <td style={styles.td} data-label="Grupo">{grupo}</td>
                      <td style={styles.td} data-label="Minian">{minian}</td>
                      <td style={styles.td} data-label="Habilidades">{habilidades?.join(', ')}</td>
                      <td style={styles.td} data-label="FechaNacimientoGreg">{fechaAniGreg}</td>
                      <td style={styles.td} data-label="FechaNacimientoHeb">{fechaAniHeb}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
          : 
          (
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
              <h5 style={{ color: colors.btn_background }}>Ningun usuario tiene un aniversario en esta fecha</h5>
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
    width: "80%",
    minHeight: "75vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  } as CSSProperties,
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  } as CSSProperties,
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    fontWeight: 'bold',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 2,
  } as CSSProperties,
  td: {
    border: '1px solid #ccc',
    padding: '8px',
  } as CSSProperties,
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