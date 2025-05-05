import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'react';
import { CustomDate, Grupo, Son, VisitorUser } from '../../../structs/structs';
import { colors } from '../../../assets/colors';

interface FormPersonalDataProps {
  logedVisitorUser: any
}

export const VisitorAccountForm = ({ logedVisitorUser }: FormPersonalDataProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [arsPendingDonations, setArsPendingDonations] = useState<number>(0);
  const [usdPendingDonations, setUsdPendingDonations] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<'All' | 'PENDIENTE' | 'PAGADA'>('All');
  const [filteredDonations, setFilteredDonations] = useState(logedVisitorUser.cuenta);

  const formatDate = (date?: CustomDate) => {
    if (!date) return '';
    return `${date.dia}/${date.mes}/${date.año}`;
  };

  const filterDonations = () => {
    let donations_filtered: any= []
    if (logedVisitorUser.cuenta.length > 0) {
      donations_filtered = logedVisitorUser.cuenta.filter(
        dona=>  dona.status == statusFilter || statusFilter == "All"
      )
    }
    setFilteredDonations(donations_filtered)
  }

  const getAllPendingDonations = () => {
    const pendingDonations = logedVisitorUser.cuenta.filter(donacion => donacion.status === 'PENDIENTE');
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

  useEffect(() => {
    getAllPendingDonations()
  }, [])

  useEffect(() => {
    filterDonations()
  }, [statusFilter])
  
  return (
    <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
      {filteredDonations.length > 0 ? (
        <div>
          <div style={styles.headerButtons}>
            <div style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
                <div style={{justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '3px solid orange', borderRadius: '5px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {`Pago pendiente en pesos:`}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                    ${arsPendingDonations}
                  </div>
                </div>

                <div style={{justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '3px solid orange', borderRadius: '5px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {`Pago pendiente en dolares:`}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                    USD {usdPendingDonations} 
                  </div>
                </div> 
            </div>

            <div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <button type='button' style={styles.filterButton} onClick={() => setStatusFilter("All")}>
                  {statusFilter == "All" ? `🟢 Todas` : `Todas`}
                </button>

                <button type='button' style={styles.filterButton} onClick={() => setStatusFilter("PAGADA")}>
                  {statusFilter == "PAGADA"? `🟢 Pagadas` : `Pagadas`}
                </button>

                <button type='button' style={styles.filterButton} onClick={() => setStatusFilter("PENDIENTE")}>
                  {statusFilter == "PENDIENTE"? `🟢 Pendientes` : `Pendientes`}
                </button>
              </div>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Motivo</th>
                <th style={styles.th}>Monto</th>
                <th style={styles.th}>Moneda</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donacion, index) => {
                const monto = donacion.monto;
                const moneda = donacion.tipoMoneda;
                const esOtro = donacion.motivo === 'Otro';

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
                          Otro <span style={{ marginLeft: '5px' }}>&#9660;</span>
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
                    <td style={{...styles.td, color:donacion.status == "PAGADA" ? "green" : "orange", fontWeight: 'bolder'}} data-label="Status">{donacion.status || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )
      : (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
          <h5 style={{ color: colors.btn_background }}>No hay donaciones registradas</h5>
        </div>
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
    borderCollapse: 'collapse',
    width: '100%',
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
