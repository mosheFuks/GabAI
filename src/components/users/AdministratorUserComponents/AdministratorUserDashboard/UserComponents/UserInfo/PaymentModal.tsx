import { useState, CSSProperties } from 'react';
import { Donacion } from '../../../../../../structs/structs';

interface PaymentModalProps {
  isOpen: boolean;
  donacion: Donacion | null;
  onConfirm: (montoAbonado: number) => void;
  onCancel: () => void;
}

export const PaymentModal = ({ isOpen, donacion, onConfirm, onCancel }: PaymentModalProps) => {
  const [montoAbonado, setMontoAbonado] = useState<number>(donacion?.monto || 0);

  if (!isOpen || !donacion) return null;

  const montoTotal = donacion.monto || 0;
  const montoYaPagado = donacion.monto_abonado || 0;
  const montoDisponible = montoTotal - montoYaPagado;
  const montoPendiente = montoAbonado < montoDisponible ? montoDisponible - montoAbonado : 0;

  const handleConfirm = () => {
    if (montoAbonado > 0 && montoAbonado <= montoDisponible) {
      onConfirm(montoAbonado);
      setMontoAbonado(donacion.monto || 0);
    }
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Registrar Pago</h2>

        <div style={styles.infoContainer}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Total de la donación:</span>
            <span style={styles.value}>{montoTotal} {donacion.tipoMoneda}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Ya abonado:</span>
            <span style={styles.value}>{montoYaPagado} {donacion.tipoMoneda}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Disponible a abonar:</span>
            <span style={styles.value}>{montoDisponible} {donacion.tipoMoneda}</span>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>¿Cuánto abonás ahora?</label>
            <input
              type="number"
              min="0"
              max={montoDisponible}
              value={montoAbonado}
              onChange={(e) => setMontoAbonado(parseFloat(e.target.value) || 0)}
              style={styles.input}
            />
            <span style={styles.inputHelper}>(Máximo: {montoDisponible} {donacion.tipoMoneda})</span>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Total a abonar:</span>
            <span style={styles.value}>{montoTotal} {donacion.tipoMoneda}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Abonando ahora:</span>
            <span style={styles.value}>{montoAbonado} {donacion.tipoMoneda}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Todavía falta abonar:</span>
            <span style={{ ...styles.value, color: '#f59e0b' }}>{montoPendiente} {donacion.tipoMoneda}</span>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button
            style={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={montoAbonado <= 0 || montoAbonado > montoDisponible}
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as CSSProperties,
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '32px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  } as CSSProperties,
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '24px',
    margin: 0,
  } as CSSProperties,
  infoContainer: {
    marginBottom: '24px',
  } as CSSProperties,
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  } as CSSProperties,
  label: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
  } as CSSProperties,
  value: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: '600',
  } as CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '16px 0',
  } as CSSProperties,
  inputGroup: {
    marginBottom: '16px',
  } as CSSProperties,
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
  } as CSSProperties,
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '4px',
  } as CSSProperties,
  inputHelper: {
    fontSize: '12px',
    color: '#9ca3af',
  } as CSSProperties,
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  } as CSSProperties,
  cancelBtn: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as CSSProperties,
  confirmBtn: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as CSSProperties,
};
