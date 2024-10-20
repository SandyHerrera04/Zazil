import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// Componente New para agregar nuevos productos
const New = ({ inputs, title }) => {
  const [file, setFile] = useState(""); // Estado para manejar el archivo de imagen
  const [data, setData] = useState({}); // Estado para manejar los datos del formulario
  const [discountEnabled, setDiscountEnabled] = useState(false); // Para manejar si el descuento está habilitado
  const [discountPercent, setDiscountPercent] = useState(0); // Porcentaje de descuento
  const [discountAmount, setDiscountAmount] = useState(0); // Monto del descuento
  const [per, setPerc] = useState(null); // Porcentaje de progreso de la carga de la imagen
  const navigate = useNavigate(); // Hook para la navegación

  // useEffect para manejar la carga del archivo de imagen
  useEffect(() => {
    const uploadFile = () => {
      const product = new Date().getTime() + file.name; // Nombre único para el archivo
      const storageRef = ref(storage, product); // Referencia de almacenamiento en Firebase
      const uploadTask = uploadBytesResumable(storageRef, file); // Tarea de carga

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calcula el progreso
          setPerc(progress); // Actualiza el estado del progreso
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error); // Manejo de errores
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL })); // Actualiza el estado con la URL de la imagen
          });
        }
      );
    };
    file && uploadFile(); // Llama a uploadFile si hay un archivo seleccionado
  }, [file]);

  // Maneja los cambios en los inputs del formulario
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });

    // Si estamos manejando el precio o el porcentaje de descuento
    if (id === "price" && discountEnabled) {
      calculateDiscount(value, discountPercent);
    }
    if (id === "discountPercent") {
      setDiscountPercent(value);
      calculateDiscount(data.price, value);
    }
  };

  // Maneja el cambio en el checkbox de habilitar descuento
  const handleDiscountChange = (e) => {
    setDiscountEnabled(e.target.checked);
    if (e.target.checked && data.price && discountPercent) {
      calculateDiscount(data.price, discountPercent);
    } else {
      setDiscountAmount(data.price); // Si no hay descuento, usar el precio completo
    }
  };

  // Calcula el monto del descuento
  const calculateDiscount = (price, discountPercent) => {
    if (price && discountPercent) {
      const discount = price - (price * discountPercent) / 100;
      setDiscountAmount(discount.toFixed(2)); // Redondear a 2 decimales
    } else {
      setDiscountAmount(price); // Si no hay descuento, mostrar el precio completo
    }
  };

  // Maneja el envío del formulario
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        discountAmount, // Incluir el precio con descuento calculado
        timeStamp: serverTimestamp(),
      });
      navigate(-1); // Navega hacia atrás después de agregar el producto
    } catch (err) {
      console.log(err); // Manejo de errores
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Imagen: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* Renderizar los campos desde productInputs.js */}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.id === "discountAmount" ? discountAmount : data[input.id] || ""}
                    onChange={input.id === "discountAmount" ? undefined : handleInput} // No permitir cambios en discountAmount
                    readOnly={input.readOnly || false} // Respeta el readOnly definido en los inputs
                  />
                </div>
              ))}

              <button disabled={per !== null && per < 100} type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
