import { CSSProperties, useContext, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { addPerashaToKehila, addAnAliaInAPerasha, getPerashaInfo } from '../../../../apis/requests';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { toast } from 'react-toastify';
import { Alia, UserToAddInThePerasha } from '../../../../structs/structs';

interface AddUserToAliaModalProps {
  openAliaModal: boolean;
  setOpenAliaModal: (openAliaModal: boolean) => void;
  userToAddInThePerasha?: UserToAddInThePerasha;
}

export const AddUserToAliaModal = ({openAliaModal, setOpenAliaModal, userToAddInThePerasha}: AddUserToAliaModalProps) => {
  const { logedUser } = useContext(PageContext) as any

  const addPerasha = addPerashaToKehila();
  const addAliaInAPerasha = addAnAliaInAPerasha();
  
  //const deletePerashiotInfo = deleteAllPerashiotInfo()
  //const deleteOnePerashaInfo = deletePerashaInfo()
  const [formAliaData, setFormAliaData] = useState<Alia>({
    nombre: userToAddInThePerasha?.nombre!,
    apellido: userToAddInThePerasha?.apellido!,
    nombreHebreo: userToAddInThePerasha?.nombreHebreo!,
    aniversario: userToAddInThePerasha?.aniversario!,
    minian: userToAddInThePerasha?.minian!,
    fechaAniversarioHebreo: userToAddInThePerasha?.fechaAniversarioHebreo!,
    perasha: "",
    alia: "",
    grupo: userToAddInThePerasha?.grupo!,
    tipoAlia: "ALIA",
    monto: 0,
    moneda: "",
  });
  const perashaInfo = getPerashaInfo(logedUser.kehila, formAliaData.perasha!);

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
  
  const closeModal = async () => {
    console.log("Form Alia Data: ", formAliaData);

    if (perashaInfo === undefined) {
      await addPerasha(logedUser.kehila, formAliaData.perasha!);
    }
    await addAliaInAPerasha(logedUser.kehila, formAliaData.perasha!, formAliaData);
    toast.success("Se agregó un nuevo Mitpalel a la Parashá", {
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
    setOpenAliaModal(false)
  }

  const parashaSelector = () => {
    const allParashiot = Object.values(parashiotByBook).flat();
    const [query, setQuery] = useState("");

    const filtered = allParashiot.filter((p) =>
      p.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (p: string) => {
      console.log("Perasha selected:", p);
      setFormAliaData((prev) => ({ ...prev, perasha: p }));
      setQuery(p);
    };

    return (
      <div style={{ position: "relative", width: 250 }}>
        <label htmlFor="userParasha" style={{ display: "block", fontWeight: "bold" }}>
          Parashá
        </label>

        <input
          id="userParasha"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFormAliaData((prev) => ({ ...prev, perasha: "" }));
          }}
          placeholder="Escriba para buscar..."
          style={styles.input}
        />

        {query && filtered.length > 0 && !formAliaData.perasha && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              position: "absolute",
              zIndex: 10,
              background: "white",
              width: "100%",
              border: "1px solid #ddd",
              maxHeight: 150,
              overflowY: "auto",
            }}
          >
            {filtered.map((p, i) => (
              <li
                key={i}
                onClick={() => handleSelect(p)}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  
  return (
    <div>
      <Modal
        isOpen={openAliaModal}
        onRequestClose={() => setOpenAliaModal(false)}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Perashiot Info Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>
          Selecciona una Alia para {formAliaData.nombre} {formAliaData.apellido}
        </h2>
        <div>    
            <label htmlFor="userMinian" style={{ display: "block", fontWeight: 'bold'}}>Minian</label>
            <input
              type="text"
              id="userMinian"
              value={formAliaData.minian}
              style={styles.input}
              disabled={true}
            />

            <label htmlFor="userAniv" style={{ display: "block", fontWeight: 'bold'}}>Aniversario</label>
            <input
              type="text"
              id="userAniv"
              value={formAliaData.aniversario}
              style={styles.input}
              disabled={true}
            />

            <label htmlFor="userAnivHebreo" style={{ display: "block", fontWeight: 'bold'}}>Fecha Aniversario Hebreo</label>
            <input
              type="text"
              id="userAnivHebreo"
              value={formAliaData.fechaAniversarioHebreo}
              style={styles.input}
              disabled={true}
            />

            <label htmlFor="userGrupo" style={{ display: "block", fontWeight: 'bold'}}>Status Halajico</label>
            <input
              type="text"
              id="userGrupo"
              value={formAliaData.grupo}
              style={styles.input}
              disabled={true}
            />

            {/*Select of all the Parashiot list
            <label htmlFor="userParasha" style={{ display: "block", fontWeight: 'bold'}}>Parashá</label>
            <select
                id="userParasha"
                value={formAliaData.perasha}
                onChange={(e) => setFormAliaData({ ...formAliaData, perasha: e.target.value })}
                style={styles.input}
            >
                <option value="">Seleccione una opción</option>
                {.map((parasha, index) => (
                  <option key={index} value={parasha}>{parasha}</option>
                ))}
            </select>
            */}

            {parashaSelector()}

            <label htmlFor="userAlia" style={{ display: "block", fontWeight: 'bold'}}>Alia</label>
            <input
              type="text"
              id="userAlia"
              value={formAliaData.alia}
              onChange={(e) => setFormAliaData({ ...formAliaData, alia: e.target.value })}
              style={styles.input}
            />

            <button onClick={closeModal} style={{...styles.button, backgroundColor: formAliaData.alia == "" && formAliaData.perasha == "" ? 'gray' : colors.btn_background}} disabled={formAliaData.alia == "" && formAliaData.perasha == ""}>
              Guardar
            </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "25px", 
    width: "50%",
    height: "50%",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflowX: "hidden",
    zIndex: 9999
  } as CSSProperties,
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
  } as CSSProperties,
  button: {
    display: "block", fontWeight: 'bold',
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  } as CSSProperties,
  switchContainer: {
    display: "flex",
    //justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  } as CSSProperties,
  switch: {
    width: "25px",
    height: "25px",
    accentColor: colors.btn_background, // o el azul de tu estilo
    cursor: "pointer",
  } as CSSProperties,
};