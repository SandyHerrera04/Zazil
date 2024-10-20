

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

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [discountEnabled, setDiscountEnabled] = useState(false); // Para manejar si el descuento está habilitado
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const product = new Date().getTime() + file.name;
      const storageRef = ref(storage, product);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
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
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

  /*const handleDiscountChange = (e) => {
    setDiscountEnabled(e.target.checked);
    if (e.target.checked && data.price && discountPercent) {
      calculateDiscount(data.price, discountPercent);
    } else {
      setDiscountAmount(data.price); // Si no hay descuento, usar el precio completo
    }
  };*/

  const calculateDiscount = (price, discountPercent) => {
    if (price && discountPercent) {
      const discount = price - (price * discountPercent) / 100;
      setDiscountAmount(discount.toFixed(2)); // Redondear a 2 decimales
    } else {
      setDiscountAmount(price); // Si no hay descuento, mostrar el precio completo
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        discountAmount, // Incluir el precio con descuento calculado
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
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
