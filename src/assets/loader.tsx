import { ClipLoader } from "react-spinners";
import { colors } from "./colors";
import { CSSProperties } from "react";



export const LoaderComponent = () => {
 return (
    <div style={styles.container}>
        <div style={styles.loaderContainer}>
            <ClipLoader color="blue" loading={true} size={35} />
            <h2 style={{ color: colors.btn_background, marginTop: '20px' }}>Cargando información...</h2>
        </div>
    </div>
);
}

const styles = {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "95%",
    minHeight: "75vh",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  }as CSSProperties,
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    minHeight: "75vh",
  } as CSSProperties,
}