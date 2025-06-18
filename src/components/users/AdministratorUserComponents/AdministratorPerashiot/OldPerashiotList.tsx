import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";

export const OldPerashiotList = ({setStep}: any) => {
  const parashiotByBook = {
    Bereshit: [ 
      "Bereshit",
      "Noaj",
      "Lej Lejá",
      "Vayerá",
      "Jayé Sará",
      "Toldot",
      "Vayetze",
      "Vayishlaj",
      "Vayeshev",
      "Miketz",
      "Vayigash",
      "Vayejí"
    ],
    Shemot: [
      "Shemot",
      "Vaerá",
      "Bo",
      "Beshalaj",
      "Yitró",
      "Mishpatim",
      "Terumá",
      "Tetzavé",
      "Ki Tisá",
      "Vayakhel",
      "Pekudei"
    ],
    Vayikrá: [
      "Vayikrá",
      "Tzav",
      "Shemini",
      "Tazria",
      "Metzorá",
      "Ajarei Mot",
      "Kedoshim",
      "Emor",
      "Behar",
      "Bejukotai"
    ],
    Bamidbar: [
      "Bamidbar",
      "Naso",
      "Behaalotejá",
      "Shelaj Lejá",
      "Koraj",
      "Jukat",
      "Balak",
      "Pinjas",
      "Matot",
      "Masei"
    ],
    Devarim: [
      "Devarim",
      "Vaetjanan",
      "Ekev",
      "Reé",
      "Shoftim",
      "Ki Tetze",
      "Ki Tavó",
      "Nitzavim",
      "Vayelej",
      "Haazinu",
      "Vezot Haberajá"
    ]
  } as const;

  const [selected, setSelected] = useState<string | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
        <div></div>
        <h2 style={styles.title}>Seleccione una perasha para ver sus donaciones</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <button style={styles.delButton} onClick={() =>setOpenDeleteModal(true)}>Eliminar</button>
        </div>
      </div>
      {Object.entries(parashiotByBook).map(([book, parashiot]) => (
        <div key={book}>
          <div style={styles.bookTitle}>{book}</div>
          <div style={styles.buttonGroup}>
            {parashiot.map((name) => {
              const isSelected = selected === name
              return (
                <button
                  key={name}
                  onClick={() => {setSelected(name), navigate(`/perasha-info/${name}`), setStep(2)}}
                  style={{
                    ...styles.button,
                    fontWeight: isSelected ? "bold" : "normal",
                    background: isSelected ? "linear-gradient(to right, orange, #ff6ec4)" : "white",
                  }}
                  onMouseDown={(e) => e.preventDefault()} // evita estilo de focus/fondo
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {
        <DelAllPereashiotInfoModal
          action={"DEL_ALL"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      }
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center"
  } as CSSProperties,
  bookTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center"
  } as CSSProperties,
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textDecorationLine: 'underline', 
    textDecorationColor: 'orange',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 100,
    marginLeft: 200
  }as CSSProperties,
  button: {
    border: "1px solid orange",
    borderRadius: "9999px",
    padding: "6px 16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "black",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    appearance: "none" as const,
    WebkitTapHighlightColor: "transparent"
  },
  delButton: {
    backgroundColor: "red",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "1px solid green",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  },
}