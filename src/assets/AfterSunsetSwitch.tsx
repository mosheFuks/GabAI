import { CSSProperties } from "react";

interface AfterSunsetSwitchProps {
    isCheked: boolean,
    setIsCheked: (isCheked: boolean) => void
}

export const AfterSunsetSwitch = ({isCheked, setIsCheked}: AfterSunsetSwitchProps) => {

  const handleToggle = () => {
    setIsCheked(!isCheked);
  };

  return (
    <div style={styles.container}>
      <label style={{ display: 'block', width: 180, marginBottom: 5}}>
        Después de Tzet Hacojavim
      </label>
      <button
        onClick={handleToggle}
        type="button"
        style={{...styles.btn_container, backgroundColor: isCheked ? "#4CAF50" : "#ccc"}}
      >
        <div style={{...styles.icons, left: isCheked ? "32px" : "3px"}}>
          {isCheked ? ( "✅" ) : ( "❌" )}
        </div>
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    padding: 10,
    border: '1px solid',
    borderColor: 'green',
    borderRadius: 25
  },
  btn_container: {
    width: "60px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    padding: "3px",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "background-color 0.3s ease",
  },
  icons: {
    width: "24px",
    height: "24px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    transition: "left 0.3s ease",
  }
};
