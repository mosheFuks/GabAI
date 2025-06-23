import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'react';

import { Aniversary, CustomDate, Son } from '../../../../../../structs/structs';
import { HDate } from '@hebcal/core';
import { colors } from '../../../../../../assets/colors';

interface FormPersonalDataProps {
  logedVisitorUser: any; // VisitorUser;
}

export const VisitorPerashiotInfo = ({ logedVisitorUser }: FormPersonalDataProps) => {
  const [completeIortzaiList, setCompleteIortzaiList] = useState<any[]>([]);
  const [notIortzaiAniversaryList, setNotIortzaiAniversaryList] = useState<any>({
    aniversariesList: [],
    sonList: [],
    userImportantDatesList: []
  })
  const [step, setStep] = useState<number>(1);

  const today = new Date();
    // Convertirla a fecha hebrea
  const hToday = new HDate(today);

  const hebYear = hToday.getFullYear(); // ej. 5785

  const formatDate = (date?: CustomDate) => {
    if (!date) return '';
    return `${date.dia}/${date.mes}/${date.ano}`;
  };

  const getAllIortzaiAniversaries = () => {
    return logedVisitorUser.aniversarios.filter(ani => ani.motivo == "Iortzai")
  }

  const getAllNotIortzaiAniversaries = () => {
    const notIortzaiAniversaries: any= {
      aniversariesList: [],
      sonList: [],
      userImportantDatesList: {}
    }
    const userImportantDates = {
      birthDate: logedVisitorUser.fechaNacimientoGregoriano,
      birthDateHeb: logedVisitorUser.fechaNacimientoHebreo,
      barMitzvaDateGreg: logedVisitorUser.fechaBarMitzvaGregoriano,
      barMitzvaDateHeb: logedVisitorUser.fechaBarMitzvaHebreo
    }
    notIortzaiAniversaries.userImportantDatesList = userImportantDates
    notIortzaiAniversaries.aniversariesList.push(logedVisitorUser.aniversarios.filter(ani => ani.motivo != "Iortzai"))
    logedVisitorUser.hijos.length > 0 ? notIortzaiAniversaries.sonList.push(logedVisitorUser.hijos.filter(son => son.genero == "Masculino")) : null

    return notIortzaiAniversaries
  }

  const getNextAnivesaryHebDate = (fechaAniversarioHebreo: CustomDate | undefined) => {
    const today = new Date();
    // Convertirla a fecha hebrea
    const hToday = new HDate(today);

    const hebDay = +fechaAniversarioHebreo?.dia!
    const hebMonth = fechaAniversarioHebreo?.mes
    const hebYear = hToday.getFullYear(); // ej. 5785

    const hdate = new HDate(hebDay, hebMonth, hebYear);
    const gregDate: Date = hdate.greg();
    const dayGreg = gregDate.getDate()
    const monthGreg = gregDate.getMonth() + 1
    const yearGreg = gregDate.getFullYear()

    return dayGreg+"/"+monthGreg+"/"+yearGreg
  }

  useEffect(() => {
    const justIortzai = getAllIortzaiAniversaries();
    const notIortzaiAniversaries = getAllNotIortzaiAniversaries()
    setCompleteIortzaiList(justIortzai)
    setNotIortzaiAniversaryList(notIortzaiAniversaries)
  }, []);
  
  
  return (
    <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
      {completeIortzaiList.length > 0 ? (
        <div>
          <div style={styles.headerButtons}>
            <div style={{ display: "flex", flexDirection: "row", border: '2px solid orange', borderRadius: '50px', paddingLeft: '10px', paddingRight: '10px', justifyContent: 'center', gap: '20px'}}>
              <div>
                <h3 onClick={() => setStep(1)} style={{...styles.sectionTitle, color: step === 1 ? "orange" : "black", textDecoration: step === 1 ? "underline" : "none"}}>Proximos Iortzai</h3>
              </div>

              <div>
                <div style={{ display: 'flex'}}>
                  <h3 onClick={() => setStep(2)} style={{...styles.sectionTitle, color: step === 2 ? "orange" : "black", textDecoration: step === 2 ? "underline" : "none"}}>Aniversarios Personales</h3>
                </div>
              </div>

              {logedVisitorUser.hijos.length > 0 && (
                <div>
                  <div style={{ display: 'flex', marginRight: '20px'}}>
                    <h3 onClick={() => setStep(3)} style={{...styles.sectionTitle, color: step === 3 ? "orange" : "black", textDecoration: step === 3 ? "underline" : "none"}}>Aniversarios de sus hijos</h3>
                  </div>
                </div>
              )}
            </div>
          </div>

          {step == 1 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Aclaracion</th>
                  <th style={styles.th}>Fecha Fallecimiento</th>
                  <th style={styles.th}>Fecha Fallecimiento Hebreo</th>
                  <th style={styles.th}>{`Fecha Aniversario según año Hebreo en curso (${hebYear})`}</th>
                </tr>
              </thead>
              <tbody>
                {completeIortzaiList.map((aniversario: Aniversary, index) => {
                  const aclaracion = aniversario.nombreDelAniversario;
                  const fecha = aniversario.fecha;
                  const fechaHebreo = aniversario.fechaHebreo;
                  const motivo = aniversario.motivo;
                  const fechaDeCumplimientoAniversario = getNextAnivesaryHebDate(aniversario.fechaHebreo)

                  return (
                    <tr key={index}>
                      <td style={styles.td} data-label="Motivo">{motivo}</td>
                      <td style={styles.td} data-label="Aclaracion">{aclaracion}</td>
                      <td style={styles.td} data-label="Fecha">
                        {formatDate(fecha)}
                      </td>
                      <td style={styles.td} data-label="FechaHebreo">
                        {formatDate(fechaHebreo)}
                      </td>
                      <td style={styles.td} data-label="ProximaFechaDelAniversarioHebreo">
                        {fechaDeCumplimientoAniversario}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {step == 2 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha Nacimiento</th>
                  <th style={styles.th}>Fecha Hebreo</th>
                  <th style={styles.th}>Fecha Bar Mitzva</th>
                  <th style={styles.th}>Fecha Bar Mitzva Hebreo</th>
                  <th style={styles.th}>{`Fecha cumpleaños según año Hebreo en curso (${hebYear})`}</th>
                  <th style={styles.th}>{`Fecha Bar Mitzva según año Hebreo en curso (${hebYear})`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td} data-label="FechaNacimiento">{formatDate(notIortzaiAniversaryList.userImportantDatesList.birthDate)}</td>
                  <td style={styles.td} data-label="FechaNacimientoHeb">{formatDate(notIortzaiAniversaryList.userImportantDatesList.birthDateHeb)}</td>
                  <td style={styles.td} data-label="FechaBarMitzva">
                    {formatDate(notIortzaiAniversaryList.userImportantDatesList.barMitzvaDateGreg)}
                  </td>
                  <td style={styles.td} data-label="FechaBarMitzvaHebreo">
                    {formatDate(notIortzaiAniversaryList.userImportantDatesList.barMitzvaDateHeb)}
                  </td>
                  <td style={styles.td} data-label="ProximaFechaDelAniversarioHebreo">
                    {getNextAnivesaryHebDate(notIortzaiAniversaryList.userImportantDatesList.birthDateHeb)}
                  </td>
                  <td style={styles.td} data-label="ProximaFechaDelAniversarioHebreo">
                    {getNextAnivesaryHebDate(notIortzaiAniversaryList.userImportantDatesList.barMitzvaDateHeb)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {step == 3 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Nombre Hebreo</th>
                  <th style={styles.th}>Conocimientos</th>
                  <th style={styles.th}>Fecha Bar Mitzva</th>
                  <th style={styles.th}>Fecha Bar Mitzva Hebreo</th>
                </tr>
              </thead>
              <tbody>
                {notIortzaiAniversaryList.sonList[0].map((son: Son, index) => {
                  const nombre = `${son.nombre} ${son.apellido}`;
                  const nombreHebreo = son.nombreHebreo;
                  const habilidades = son.habilidades
                  const fechaBarMitzva = son.fechaBarMitzva;
                  const fechaBarMitzvaHebreo = son.fechaBarMitzvaHebreo;

                  return (
                    <tr key={index}>
                      <td style={styles.td} data-label="Motivo">Bar Mitzva</td>
                      <td style={styles.td} data-label="Nombre">{nombre}</td>
                      <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                      <td style={styles.td} data-label="Conocimientos">
                        {habilidades?.join(', ')}
                      </td>
                      <td style={styles.td} data-label="FechaBarMitzva">
                        {formatDate(fechaBarMitzva)}
                      </td>
                      <td style={styles.td} data-label="FechaBarMitzvaHebreo">
                        {formatDate(fechaBarMitzvaHebreo)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )
      : (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
          <h5 style={{ color: colors.btn_background }}>No hay aniversarios registrados</h5>
        </div>
      )}

      {/*isDonationModalOpen && (
        <DonationModal
          modalAniversaryIsOpen={isDonationModalOpen} 
          setModalAniversaryIsOpen={setIsDonationModalOpen}
          setCompleteAniversaryList={setCompleteAniversaryList}/>
      )*/}
    </div>
  );
};

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

const styles = {
  container: {
    height: 'auto',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
  } as CSSProperties,
  table: {
    borderCollapse: 'separate',
    borderSpacing: '10px 12px', // espacio vertical entre filas
    width: '100%',
  } as CSSProperties,
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
  } as CSSProperties,
  td: {
   padding: '14px 16px',
    background: '#fff',
    fontSize: '1.05rem',
    color: '#333',
    borderRadius: '8px', // importante
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    textAlign: "center"
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
    marginBottom: '22px',
    justifyContent: 'center',
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
  } as CSSProperties,
  button: {
    border: "none",
    color: 'white',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: colors.btn_background
  } as CSSProperties,
  sectionTitle: {
    cursor: "pointer", 
    alignSelf: "center",
    textAlign: 'center', 
    marginRight: 0
  } as CSSProperties,
};

