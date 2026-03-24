import { useEffect, useState } from 'react'
import { CSSProperties } from 'react';

import { DonationModal } from '../NewDonationModal/DonationModal';
import { CustomDate, VisitorUser } from '../../../../../../structs/structs';
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
    <div style={styles.container}>
      {/* Pending Donations Summary */}
      {logedVisitorUser.cuenta!.length > 0 && (
        <div style={styles.summarySection}>
          <div style={styles.pendingCard}>
            <div style={styles.cardLabel}>Pago pendiente en pesos</div>
            <div style={styles.cardAmount}>${arsPendingDonations}</div>
          </div>
          <div style={styles.pendingCard}>
            <div style={styles.cardLabel}>Pago pendiente en dólares</div>
            <div style={styles.cardAmount}>USD {usdPendingDonations}</div>
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div style={styles.controlsSection}>
        <div style={styles.filterButtons}>
          {logedVisitorUser.cuenta!.length > 0 && (
            <>
              <button
                type="button"
                style={{
                  ...styles.filterBtn,
                  backgroundColor: statusFilter === "All" ? "#3b82f6" : "#f3f4f6",
                  color: statusFilter === "All" ? "#ffffff" : "#6b7280",
                  border: "1.5px solid #3b82f6",
                }}
                onClick={() => setStatusFilter("All")}
              >
                Todas
              </button>
              <button
                type="button"
                style={{
                  ...styles.filterBtn,
                  backgroundColor: statusFilter === "PAGADA" ? "#10b981" : "#f3f4f6",
                  color: statusFilter === "PAGADA" ? "#ffffff" : "#6b7280",
                  border: "1.5px solid #059669",
                }}
                onClick={() => setStatusFilter("PAGADA")}
              >
                Pagadas
              </button>
              <button
                type="button"
                style={{
                  ...styles.filterBtn,
                  backgroundColor: statusFilter === "PENDIENTE" ? "#f59e0b" : "#f3f4f6",
                  color: statusFilter === "PENDIENTE" ? "#ffffff" : "#6b7280",
                  border: "1.5px solid #f59e0b",
                }}
                onClick={() => setStatusFilter("PENDIENTE")}
              >
                Pendientes
              </button>
            </>
          )}
        </div>
        <button
          type="button"
          style={styles.addBtn}
          onClick={() => setIsDonationModalOpen(true)}
        >
          + Agregar Donación
        </button>
      </div>

      {/* Table */}
      {filteredDonations.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Perasha</th>
                <th style={styles.th}>Motivo</th>
                <th style={styles.th}>Monto</th>
                <th style={styles.th}>Moneda</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donacion, index) => {
                const monto = donacion.monto;
                const moneda = donacion.tipoMoneda;
                const esOtro = donacion.aclaracion != '';

                return (
                  <tr key={index}>
                    <td style={styles.td}>{formatDate(donacion.fecha)}</td>
                    <td style={styles.td}>{donacion.perasha || '-'}</td>
                    <td style={styles.td}>
                      {esOtro ? (
                        <span
                          style={styles.cellPopover}
                          onClick={() =>
                            setExpandedIndex(expandedIndex === index ? null : index)
                          }
                        >
                          {donacion.motivo}
                          {expandedIndex === index && donacion.aclaracion && (
                            <div style={styles.popover}>{donacion.aclaracion}</div>
                          )}
                        </span>
                      ) : (
                        donacion.motivo || '-'
                      )}
                    </td>
                    <td style={styles.td}>{monto}</td>
                    <td style={styles.td}>{moneda}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            donacion.status === "PENDIENTE"
                              ? "#fef3c7"
                              : donacion.status === "PAGADA"
                              ? "#d1fae5"
                              : "#e0e7ff",
                          color:
                            donacion.status === "PENDIENTE"
                              ? "#b45309"
                              : donacion.status === "PAGADA"
                              ? "#065f46"
                              : "#3730a3",
                        }}
                      >
                        {donacion.status || '-'}
                      </span>
                    </td>
                    <td style={{...styles.td, textAlign: "center"}}>
                      {donacion.status === 'PENDIENTE' && (
                        <button
                          type="button"
                          style={styles.confirmBtn}
                          onClick={() => {
                            modDonationStatus(
                              logedVisitorUser.nombreKehila!,
                              logedVisitorUser.nombreEspanol!,
                              logedVisitorUser.apellido!,
                              donacion.fecha,
                              donacion.status === 'PENDIENTE' ? "PAGADA" : "PENDIENTE",
                              donacion.monto
                            );
                            if (donacion.status === 'PENDIENTE') {
                              donacion.status = 'PAGADA';
                            } else {
                              donacion.status = 'PENDIENTE';
                            }
                            setCompleteDonationsList([...completeDonationsList]);
                            filterDonations();
                          }}
                        >
                          Confirmar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <h3 style={styles.emptyStateText}>No hay donaciones registradas</h3>
        </div>
      )}

      {isDonationModalOpen && (
        <DonationModal
          modalAniversaryIsOpen={isDonationModalOpen}
          setModalAniversaryIsOpen={setIsDonationModalOpen}
          setCompleteDonationsList={setCompleteDonationsList}
          logedVisitorUser={logedVisitorUser}
        />
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

const styles = {
  container: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  } as CSSProperties,
  summarySection: {
    display: "flex",
    gap: "16px",
  } as CSSProperties,
  pendingCard: {
    flex: 1,
    padding: "16px 20px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  } as CSSProperties,
  cardLabel: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: "8px",
  } as CSSProperties,
  cardAmount: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#f59e0b",
  } as CSSProperties,
  controlsSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  } as CSSProperties,
  filterButtons: {
    display: "flex",
    gap: "8px",
  } as CSSProperties,
  filterBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  } as CSSProperties,
  addBtn: {
    padding: "10px 18px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
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
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb",
  } as CSSProperties,
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "14px",
  } as CSSProperties,
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "12px",
  } as CSSProperties,
  cellPopover: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  } as CSSProperties,
  popover: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 12px",
    zIndex: 1000,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  } as CSSProperties,
  confirmBtn: {
    padding: "6px 12px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
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
