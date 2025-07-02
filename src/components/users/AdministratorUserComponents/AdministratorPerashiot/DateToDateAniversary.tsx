import { CSSProperties, useEffect, useState } from "react";
import { Grupo, HEBREW_MONTHS, VisitorUser } from "../../../../structs/structs";

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

interface DaysOfThisWeek {
  currentYear: number,
  currentMonth: string,
  nextMonth: string,
  sunday: string,
  friday: string
}

interface DateToDateProps {
  setFilteredAniversaries : (thisWeekAniversaries: AniversariesList[]) => void
  peopleList: VisitorUser[]
  daysOfThisWeek: DaysOfThisWeek
  setRenderedAniversaries: (thisWeekAniversaries: AniversariesList[]) => void
}

export const DateToDateAniversary = ({ peopleList, setFilteredAniversaries, daysOfThisWeek, setRenderedAniversaries }: DateToDateProps) => {
  const [dayStart, setDayStart] = useState<string>('');
  const [monthStart, setMonthStart] = useState<string>("");
  const [dayEnd, setDayEnd] = useState<string>('');
  const [monthEnd, setMonthEnd] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  console.log("Days of this week here:", daysOfThisWeek);
  

  const getImportantDatesFromAllPeopleList = () => {
    const monthsToInclude = getMonthsBetweenInclusiveCyclic();

    const monthAniversaries = peopleList!
      .filter(persona =>
        persona.aniversarios!.some(ani =>
          monthsToInclude.includes(ani.fechaHebreo!.mes as typeof HEBREW_MONTHS[number])
        )
      )
      .flatMap(persona =>
        persona.aniversarios!
          .filter(ani =>
            ani.fechaHebreo?.mes !== undefined && monthsToInclude.includes(ani.fechaHebreo.mes as typeof HEBREW_MONTHS[number])
          )
          .map(ani => ({
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
      .filter(persona =>
        monthsToInclude.includes(persona.fechaNacimientoHebreo?.mes as typeof HEBREW_MONTHS[number])
      )
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
      .filter(persona =>
        monthsToInclude.includes(persona.fechaBarMitzvaHebreo?.mes as typeof HEBREW_MONTHS[number])
      )
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

    allAniversaries.sort((a, b) => {
      const indexA = HEBREW_MONTHS.indexOf(a.fechaAniHeb.mes as typeof HEBREW_MONTHS[number]);
      const indexB = HEBREW_MONTHS.indexOf(b.fechaAniHeb.mes as typeof HEBREW_MONTHS[number]);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      return (parseInt(a.fechaAniHeb.dia ?? "0")) - (parseInt(b.fechaAniHeb.dia ?? "0"));
    });

    return allAniversaries || [];
  };

  const getMonthsBetweenInclusiveCyclic = () => {
    const start = HEBREW_MONTHS.indexOf(monthStart as typeof HEBREW_MONTHS[number]);
    const end = HEBREW_MONTHS.indexOf(monthEnd as typeof HEBREW_MONTHS[number]);

    if (start === -1 || end === -1) return [];
    if (start === end) return [HEBREW_MONTHS[start]];
      
    const result = [HEBREW_MONTHS[start]];

    let i = (start + 1) % HEBREW_MONTHS.length;

    // Mientras no llegamos al final
    while (i !== end) {
      result.push(HEBREW_MONTHS[i]);
      i = (i + 1) % HEBREW_MONTHS.length;
    }

    result.push(HEBREW_MONTHS[end]); // Agregamos el último

    return result;
  }
    
  const handleBuscar = () => {
    if (!dayStart || !monthStart || !dayEnd || !monthEnd) return;

    const allAniversaries = getImportantDatesFromAllPeopleList();
    const monthsToInclude = getMonthsBetweenInclusiveCyclic(); // esto ya devuelve en orden cíclico

    const inRange = allAniversaries.filter((ani) => {
      const mesAni = ani.fechaAniHeb.mes;
      const diaAni = parseInt(ani.fechaAniHeb.dia ?? "0");

      if (!mesAni || !diaAni) return false;

      const indexMesAni = monthsToInclude.indexOf(mesAni as typeof HEBREW_MONTHS[number]);
      const indexMesInicio = monthsToInclude.indexOf(monthStart as typeof HEBREW_MONTHS[number]);
      const indexMesFin = monthsToInclude.indexOf(monthEnd as typeof HEBREW_MONTHS[number]);

      // Mes fuera del rango
      if (indexMesAni === -1) return false;

      // Primer mes
      if (mesAni === monthStart) {
        return diaAni >= parseInt(dayStart);
      }

      // Último mes
      if (mesAni === monthEnd) {
        return diaAni <= parseInt(dayEnd);
      }

      // Mes intermedio
      return indexMesAni > indexMesInicio && indexMesAni < indexMesFin;
    });

    setFilteredAniversaries(inRange);
    setRenderedAniversaries(inRange);
  };

  console.log("Days of this week:", daysOfThisWeek);

  useEffect(() => {
    setMonthStart(daysOfThisWeek.currentMonth);
    setMonthEnd(daysOfThisWeek.nextMonth !== "" ? daysOfThisWeek.nextMonth : daysOfThisWeek.currentMonth);
  }, [daysOfThisWeek]);
  
  return (
    <div style={styles.container}>
      <input
        type="number"
        style={styles.input}
        placeholder={
          (daysOfThisWeek.sunday.toString().match(/^\d+/)?.[0] ?? "")
        }
        value={dayStart}
        onChange={(e) => setDayStart(e.target.value)}
      />
      <label style={styles.label}>de</label>
      <select style={styles.select} value={monthStart} onChange={(e) => setMonthStart(e.target.value)}>
        {HEBREW_MONTHS.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      <label style={styles.label}>-</label>

      <input
        type="number"
        style={styles.input}
        placeholder={
          daysOfThisWeek.friday.toString().match(/^\d+/)?.[0] ?? ""
        }
        value={dayEnd}
        onChange={(e) => setDayEnd(e.target.value)}
      />
      <label style={styles.label}>de</label>
      <select style={styles.select} value={monthEnd} onChange={(e) => setMonthEnd(e.target.value)}>
        {HEBREW_MONTHS.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      <button
        style={{ ...styles.button, backgroundColor: dayStart == "" || dayEnd == "" ? "gray" : "blue", borderColor: clicked ? "orange" : "#ccc" }}
        onClick={handleBuscar}
        disabled={dayStart == "" || dayEnd == ""}
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
      >
        Buscar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'sans-serif',
    fontSize: '14px',
  } as CSSProperties,
  label: {
    marginRight: '4px',
  } as CSSProperties,
  input: {
    width: "10%",
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
  } as CSSProperties,
  select: {
    width: "20%",
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black", 
  } as CSSProperties,
  button: {
    display: "block",
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
    fontWeight: "bold"
  } as CSSProperties,
};