import { CSSProperties, useEffect, useState } from "react";
import { HDate } from '@hebcal/core';
import { Grupo, HEBREW_MONTHS, Motivo, UserToAddInThePerasha, VisitorUser } from "../../../../structs/structs";
import { FaArrowAltCircleRight, FaSearch, FaPlus } from "react-icons/fa";
import { DateToDateAniversary } from "./DateToDateAniversary";
import { useNavigate } from "react-router-dom";
import { AddUserToAliaModal } from "./AddUserToPerashaModal";

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

export const ThisWeekAniversariesList = ({peopleList}: NextAliotProps) => {
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
  const [openAddMitpalelToPerashaModal, setOpenAddMitpalelToPerashaModal] = useState<boolean>(false);

  const [userToAddInThePerasha, setUserToAddInThePerasha] = useState<UserToAddInThePerasha>({
    nombre: "",
    apellido: "",
    nombreHebreo: "",
    aniversario: "",
    fechaAniversarioHebreo: "",
    minian: "", 
    grupo: null as any
  });

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

    if (nextFriday.dd < previousSunday.dd) {
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
        motivo: Motivo.Cumpleaños,
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
    console.log("Dates of this week when searching for aniversaries: ", datesOfThisWeek);
    
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

  const openModal = (open: boolean, nombre: string, apellido: string, nombreHebreo: string, minian: string, aniversario: string, fechaAniversarioHebreo: string, grupo: Grupo) => {
    setOpenAddMitpalelToPerashaModal(open);
    setUserToAddInThePerasha({
      nombre: nombre,
      apellido: apellido,
      nombreHebreo: nombreHebreo,
      minian: minian,
      aniversario: aniversario,
      fechaAniversarioHebreo: fechaAniversarioHebreo,
      grupo: grupo
    });
  };

  useEffect(() => {
    const thisWeekAniversaries = getThisWeekAniversariesFromAllUsers()
    setThisWeekAniversaries(thisWeekAniversaries)
    setFilteredAniversaries(thisWeekAniversaries)
  }, [])

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <DateToDateAniversary peopleList={peopleList!} setFilteredAniversaries={setFilteredAniversaries} daysOfThisWeek={daysOfThisWeek} setRenderedAniversaries={setRenderedAniversaries} setThisWeekAniversaries={setThisWeekAniversaries} />
        {thisWeekAniversaries.length > 0 && (
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Busca por motivo o Minian"
              style={{...styles.searchInput, borderColor: clicked ? "#3b82f6" : "#e5e7eb"}}
              onChange={(e) => searchAniByMotiveOrMinian(e.target.value)}
              onClick={() => setClicked(true)}
              onBlur={() => setClicked(false)}
            />
          </div>
        )}
      </div>

      {/* Table Section */}
      <div style={styles.tableSection}>
        {filteredAniversaries.length > 0 ? (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.actionTh}></th>
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
                      <td 
                        style={styles.actionTd}
                        data-label="Agregar"
                        onClick={() => openModal(true, ani.nombre, ani.apellido, nombreHebreo, minian, motivo, fechaAniHeb, grupo)}
                      >
                        <FaPlus style={styles.actionIcon} />
                      </td>
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
                        style={styles.actionTd}
                        data-label="Ver"
                        onClick={() => navigate(`/administrator-user-info/${ani.nombre}-${ani.apellido}`)}
                      >
                        <FaArrowAltCircleRight style={styles.actionIcon} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyStateText}>No hay aniversarios registrados en estas fechas</h3>
          </div>
        )}
      </div>

      {openAddMitpalelToPerashaModal && (
        <AddUserToAliaModal
          openAliaModal={openAddMitpalelToPerashaModal}
          setOpenAliaModal={setOpenAddMitpalelToPerashaModal}
          userToAddInThePerasha={userToAddInThePerasha}
        />
      )}
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
      border: 1px solid #e5e7eb;
      padding: 10px;
      border-radius: 8px;
      background: #ffffff;
    }
    td {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      border: none;
      border-bottom: 1px solid #f3f4f6;
    }
    td::before {
      content: attr(data-label);
      font-weight: bold;
      flex-basis: 50%;
    }
  }
`}
</style>

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflowY: "auto",
    minHeight: "100%",
    width: "100%",
    padding: "20px",
  } as CSSProperties,
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  } as CSSProperties,
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 12px",
    minWidth: "240px",
  } as CSSProperties,
  searchIcon: {
    color: "#9ca3af",
    fontSize: "16px",
  } as CSSProperties,
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    flex: 1,
  } as CSSProperties,
  tableSection: {
    flex: 1,
    overflowY: "auto",
  } as CSSProperties,
  tableWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  } as CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
  } as CSSProperties,
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    fontSize: "14px",
    borderBottom: "none",
    borderRadius: "6px",
  } as CSSProperties,
  actionTh: {
    padding: "14px 16px",
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    fontSize: "14px",
    borderBottom: "none",
    borderRadius: "6px",
    width: "50px",
  } as CSSProperties,
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "14px",
  } as CSSProperties,
  actionTd: {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
    cursor: "pointer",
    width: "50px",
  } as CSSProperties,
  actionIcon: {
    fontSize: "18px",
    color: "#3b82f6",
    transition: "color 0.2s",
  } as CSSProperties,
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textAlign: "center",
  } as CSSProperties,
  emptyStateText: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0,
  } as CSSProperties,
};