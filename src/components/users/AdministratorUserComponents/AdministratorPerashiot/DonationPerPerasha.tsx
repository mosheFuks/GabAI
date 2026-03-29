  import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaSearch } from "react-icons/fa";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";
import { colors } from "../../../../assets/colors";

export const DonationPerPersha = () => {
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
  const [searchTerm, setSearchTerm] = useState<string>("")
  
  const navigate = useNavigate()

  // Filtrar las perashás por término de búsqueda
  const filteredBooks = Object.entries(parashiotByBook).reduce((acc, [book, parashiot]) => {
    const filtered = parashiot.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filtered.length > 0 || searchTerm === "") {
      (acc as any)[book] = searchTerm === "" ? parashiot : filtered
    }
    return acc
  }, {} as Record<string, typeof parashiotByBook[keyof typeof parashiotByBook]>)

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Donaciones por Parashá</h2>
        <div style={styles.headerRight}>
          <div style={styles.searchBox}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar Parashá..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button style={styles.delButton} onClick={() => setOpenDeleteModal(true)}>Eliminar</button>
        </div>
      </div>

      <div style={styles.description}>Seleccione una Parashá para ver los aportes</div>

      <div style={styles.cardsContainer}>
        {Object.entries(filteredBooks).map(([book, parashiot]) => (
          <div key={book} style={styles.card}>
            <div style={styles.cardHeader}>
              <FaBook style={styles.bookIcon} />
              <h3 style={styles.cardTitle}>{book}</h3>
            </div>
            <div style={styles.tagsContainer}>
              {parashiot.map((name) => {
                return (
                  <button
                    key={name}
                    onClick={() => {navigate(`/perasha-info/donation/${name}`)}}
                    style={{
                      ...styles.tag,
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

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
    backgroundColor: colors.main_background,
    //borderRadius: "0",
    //width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    //alignItems: "flex-start",
    margin: "0",
    //textAlign: "left",
    overflow: "auto",
    //boxSizing: "border-box",
    gap: "24px",
    padding: "24px",
  } as CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap" as const,
  } as CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  } as CSSProperties,
  description: {
    fontSize: "18px",
    color: "#6b7280",
    marginTop: "-16px",
  } as CSSProperties,
  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  } as CSSProperties,
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 12px",
    minWidth: "240px",
  } as CSSProperties,
  searchIcon: {
    color: "#9ca3af",
    fontSize: "16px",
  } as CSSProperties,
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    flex: 1,
  } as CSSProperties,
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  } as CSSProperties,
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  } as CSSProperties,
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f3f4f6",
  } as CSSProperties,
  bookIcon: {
    fontSize: "24px",
    color: "#f59e0b",
  } as CSSProperties,
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  } as CSSProperties,
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  } as CSSProperties,
  tag: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #c7d2fe",
    backgroundColor: "#e0e7ff",
    color: "#3b82f6",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s",
    outline: "none",
  } as CSSProperties,
  delButton: {
    backgroundColor: "#ef4444",
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontSize: "14px",
    transition: "background-color 0.2s",
  } as CSSProperties,
}