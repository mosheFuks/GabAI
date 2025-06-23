import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'react';

import { DonationModal } from '../NewDonationModal/DonationModal';
import { CustomDate, VisitorUser } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';
import { changeDonationStatus } from '../../../../../../apis/requests';

interface FormPersonalDataProps {
  logedVisitorUser: VisitorUser
}

export const VisitorAccountInfo = ({ logedVisitorUser }: FormPersonalDataProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [arsPendingDonations, setArsPendingDonations] = useState<number>(0);
  const [usdPendingDonations, setUsdPendingDonations] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<'All' | 'PENDIENTE' | 'PAGADA'>('All');
  const [completeDonationsList, setCompleteDonationsList] = useState<any[]>(logedVisitorUser.cuenta!);
  const [filteredDonations, setFilteredDonations] = useState(completeDonationsList);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const formatDate = (date?: CustomDate) => {
    if (!date) return '';
    return `${date.dia}/${date.mes}/${date.ano}`;
  };

  const filterDonations = () => {
    let donations_filtered: any= []
    if (completeDonationsList.length > 0) {
      donations_filtered = completeDonationsList.filter(
        dona=>  dona.status == statusFilter || statusFilter == "All"
      )
    }
    setFilteredDonations([])
    setFilteredDonations(donations_filtered)
  }

  const getAllPendingDonations = () => {
    const pendingDonations = completeDonationsList.filter(donacion => donacion.status === 'PENDIENTE');
    const arsTotal = pendingDonations.reduce((total, donacion) => {
      if (donacion.tipoMoneda === 'ARS') {
        return total + (donacion.monto || 0);
      }
      return total;
    }, 0);
    const usdTotal = pendingDonations.reduce((total, donacion) => {
      if (donacion.tipoMoneda === 'USD') {
        return total + (donacion.monto || 0);
      }
      return total;
    }, 0);
    setArsPendingDonations(arsTotal);
    setUsdPendingDonations(usdTotal);
  }

  const modDonationStatus = changeDonationStatus()

  useEffect(() => {
    getAllPendingDonations()
    filterDonations()
  }, [completeDonationsList])

  useEffect(() => {
    filterDonations()
  }, [statusFilter])
  
  return (
    <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>
          <div style={styles.headerButtons}>
            {logedVisitorUser.cuenta!.length > 0 && (
              <div style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
                <div style={styles.pendingCard}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {`Pago pendiente en pesos:`}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                    ${arsPendingDonations}
                  </div>
                </div>

                <div style={styles.pendingCard}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {`Pago pendiente en dolares:`}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                    USD {usdPendingDonations} 
                  </div>
                </div> 
              </div>
            )}
            {logedVisitorUser.cuenta!.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <button type='button' style={{...styles.statusBadge, fontWeight: "bold", border: 'none',
                  backgroundColor: statusFilter === "All" ? "#60A5FA" : '#f9f9f9',
                  color: statusFilter === "All" ? "white" : "black"
                }} onClick={() => setStatusFilter("All")}>
                  {`Todas`}
                </button>

                <button type='button' style={{...styles.statusBadge, fontWeight:"bold", border: 'none',
                  backgroundColor: statusFilter === "PAGADA" ? "#34D399" : '#f9f9f9',            
                  color: statusFilter === "PAGADA" ? "white" : "black"  
                }} onClick={() => setStatusFilter("PAGADA")}>
                  {`Pagadas`}
                </button>

                <button type='button' style={{...styles.statusBadge, fontWeight: "bold",  border: 'none',
                  backgroundColor: statusFilter === "PENDIENTE" ? "#FDE68A" :  '#f9f9f9',            
                  color: statusFilter === "PENDIENTE" ? "white" : "black"    
                }} onClick={() => setStatusFilter("PENDIENTE")}>
                  {`Pendientes`}
                </button>

                <button type='button' style={styles.button} onClick={() => setIsDonationModalOpen(true)}>
                  Agregar Donación
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
                <button type='button' style={styles.button} onClick={() => setIsDonationModalOpen(true)}>
                  Agregar Donación
                </button>
              </div>
            )}
          </div>
          {filteredDonations.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Moneda</th>
                  <th style={styles.th}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donacion, index) => {
                  const monto = donacion.monto;
                  const moneda = donacion.tipoMoneda;
                  const esOtro = donacion.aclaracion != '';

                  return (
                    <tr key={index}>
                      <td style={styles.td} data-label="Fecha">
                        {formatDate(donacion.fecha)}
                      </td>
                      <td style={styles.td} data-label="Motivo">
                        {esOtro ? (
                          <span
                            style={styles.cellPopover}
                            onClick={() =>
                              setExpandedIndex(expandedIndex === index ? null : index)
                            }
                          >
                            {donacion.motivo} <span style={{ marginLeft: '5px' }}>&#9660;</span>
                            {expandedIndex === index && donacion.aclaracion && (
                              <div style={styles.popover}>{donacion.aclaracion}</div>
                            )}
                          </span>
                        ) : (
                          donacion.motivo || '-'
                        )}
                      </td>
                      <td style={styles.td} data-label="Monto">{monto}</td>
                      <td style={styles.td} data-label="Moneda">{moneda}</td>
                      <td style={styles.td} data-label="EstadoCuenta">
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: donacion.status === "PENDIENTE" ? "#fef3c7" :
                                            donacion.status === "PAGADA" ? "#d1fae5" :
                                            "#e0e7ff",
                            color: donacion.status === "PENDIENTE" ? "#92400e" :
                                  donacion.status === "PAGADA" ? "#065f46" :
                                  "#3730a3"
                          }}>
                            {donacion.status || '-'}
                          </span>
                        </td>
                      {donacion.status === 'PENDIENTE' && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 16px',}}>
                          <button
                            type="button"
                            style={{...styles.button, backgroundColor: donacion.status === 'PENDIENTE' ? 'green' : 'orange'}}
                            onClick={() => {
                              modDonationStatus(
                                logedVisitorUser.nombreKehila!,
                                logedVisitorUser.nombreEspanol!,
                                logedVisitorUser.apellido!,
                                donacion.fecha,
                                donacion.status === 'PENDIENTE' ? "PAGADA" : "PENDIENTE",
                                donacion.monto
                              )
                              if (donacion.status === 'PENDIENTE') {
                                donacion.status = 'PAGADA';
                              } else {
                                donacion.status = 'PENDIENTE';
                              }
                              setCompleteDonationsList([...completeDonationsList]);
                              filterDonations();
                            }}
                          >
                            Confirmar Pago
                          </button>
                        </div>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
              <h5 style={{ color: colors.btn_background }}>No hay donaciones registradas</h5>
            </div>
          )}
      </div>

      {isDonationModalOpen && (
        <DonationModal
          modalAniversaryIsOpen={isDonationModalOpen} 
          setModalAniversaryIsOpen={setIsDonationModalOpen}
          setCompleteDonationsList={setCompleteDonationsList}
          logedVisitorUser={logedVisitorUser}/>
      )}
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
    textAlign: 'center'
  } as CSSProperties,
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
  } as CSSProperties,
  pendingCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '3px solid orange',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#f9f9f9'
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
    border: "1px solid orange",
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
    backgroundColor: 'orange',
    fontWeight: 'bold'
  } as CSSProperties,
};
