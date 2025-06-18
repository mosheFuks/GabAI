import { CSSProperties, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    toast.success("Hola gente", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: { backgroundColor: 'green', color: 'white' },
        });
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <h2 style={styles.text}>Cargando...</h2>
    </div>
  );
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#ffffff',
      animation: 'fadeIn 1s ease-in-out',
    } as CSSProperties,
    logo: {
      width: 120,
      animation: 'rotate 2s linear infinite',
    } as CSSProperties,
    text: {
      marginTop: 20,
      fontSize: '1.2rem',
      color: '#555555',
    } as CSSProperties
};
