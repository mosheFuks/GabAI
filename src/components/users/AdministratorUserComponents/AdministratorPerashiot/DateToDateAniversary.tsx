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
  sunday: string,
  friday: string
}

interface DateToDateProps {
    setFilteredAniversaries : (thisWeekAniversaries: AniversariesList[]) => void
    peopleList: VisitorUser[]
    daysOfThisWeek: DaysOfThisWeek
}

export const DateToDateAniversary = ({ peopleList, setFilteredAniversaries, daysOfThisWeek}: DateToDateProps) => {
  console.log("Days of this week: ", daysOfThisWeek);
  
  const [dayStart, setDayStart] = useState<string>('');
  const [monthStart, setMonthStart] = useState<string>('');
  const [dayEnd, setDayEnd] = useState<string>('');
  const [monthEnd, setMonthEnd] = useState<string>('');
  const [kehilaAniversaries, setKehilaAniversaries] = useState<AniversariesList[]>()

  useEffect(() => {
    setKehilaAniversaries(
    peopleList
    .flatMap((persona) =>
        persona.aniversarios!
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
            }
        } as AniversariesList)
    )))
    if (monthStart == '' && monthEnd == '') {
      setMonthStart(daysOfThisWeek.currentMonth)
      setMonthEnd(daysOfThisWeek.currentMonth)
    }
  }, [])

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
    console.log("Enter here: ", dayStart, monthStart, dayEnd, monthEnd);
    
    if (!dayStart || !monthStart || !dayEnd || !monthEnd) return;

    console.log("Kehila Ani Length: ", kehilaAniversaries?.length);
    
    const inRange = kehilaAniversaries!.filter((ani, index) => {
      /*const { dia, mes } = ani.fechaHebreo;
      const hAni = new HDate(parseInt(day), mes, 5785);

      return hAni.abs() >= hStart.abs() && hAni.abs() <= hEnd.abs();*/
      console.log("Minian number: ", index);
      console.log("Ani now is equal month: Start month: ", ani.fechaAniHeb?.mes, " is equal ? ", ani.fechaAniHeb?.mes == monthStart, " End month: ", ani.fechaAniHeb?.mes, " is equal ? ", ani.fechaAniHeb?.mes == monthEnd);
      const selectedMonths = getMonthsBetweenInclusiveCyclic()

      if (selectedMonths.includes(ani.fechaAniHeb.mes as typeof HEBREW_MONTHS[number])) {
        console.log("Ani day: ", ani.fechaAniHeb.dia! , ", Selected Satrt Day: ", dayStart, "Is gratter or equal: ", parseInt(ani.fechaAniHeb.dia!) >= parseInt(dayStart), ", Selected End Day: ", dayEnd,  ", is lower or equal: ", parseInt(ani.fechaAniHeb.dia!) <= parseInt(dayEnd));
        console.log("Is between the days: ", parseInt(ani.fechaAniHeb.dia!) >= parseInt(dayStart) || parseInt(ani.fechaAniHeb.dia!) <= parseInt(dayEnd));
        if (parseInt(ani.fechaAniHeb.dia!) >= parseInt(dayStart) || parseInt(ani.fechaAniHeb.dia!) <= parseInt(dayEnd)) {
          return ani
        }
      }
    });

    console.log("In range: ", inRange);
    

    setFilteredAniversaries(inRange);
  };
    
    return (
    <div style={styles.container}>
      <input type="number" style={styles.input} placeholder={daysOfThisWeek.sunday.toString().match(/^\d+/)} value={dayStart} onChange={(e) => setDayStart(e.target.value)} />
      <label style={styles.label}>de</label>
      <select style={styles.select} value={monthStart} onChange={(e) => setMonthStart(e.target.value)}>
        <option value="">{daysOfThisWeek.currentMonth}</option>
        {HEBREW_MONTHS.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      <label style={styles.label}>-</label>

      <input type="number" style={styles.input} placeholder={daysOfThisWeek.friday.toString().match(/^\d+/)} value={dayEnd} onChange={(e) => setDayEnd(e.target.value)} />
      <label style={styles.label}>de</label>
      <select style={styles.select} value={monthEnd} onChange={(e) => setMonthEnd(e.target.value)}>
        <option value="">{daysOfThisWeek.currentMonth}</option>
        {HEBREW_MONTHS.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      <button
        style={{ ...styles.button, backgroundColor: dayStart == "" || dayEnd == "" ? "gray" : "blue" }}
        onClick={handleBuscar}
        disabled={dayStart == "" || dayEnd == ""}
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