import "./productDetails.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

// Componente ProductDetails para mostrar y actualizar los detalles de un producto
const ProductDetails = () => {
  const { productId } = useParams(); // Obtiene el ID del producto desde los parámetros de la URL
  const [file, setFile] = useState(null); // Estado para manejar el archivo de imagen
  const [data, setData] = useState({
    price: "",
    discountPercent: "",
    discountAmount: "",
  }); // Estado para manejar los datos del producto
  const [per, setPerc] = useState(null); // Estado para manejar el progreso de la carga de la imagen
  const navigate = useNavigate(); // Hook para la navegación

  // Obtener los datos del producto desde Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId); // Referencia al documento del producto en Firestore
      const docSnap = await getDoc(docRef); // Obtiene el documento
      if (docSnap.exists()) {
        setData(docSnap.data()); // Establece los datos del producto en el estado
      } else {
        console.log("Producto no encontrado");
      }
    };
    fetchProduct();
  }, [productId]);

  // Subir nueva imagen a Firebase si se selecciona
  useEffect(() => {
    const uploadFile = () => {
      const fileName = new Date().getTime() + file.name; // Nombre único para el archivo
      const storageRef = ref(storage, fileName); // Referencia de almacenamiento en Firebase
      const uploadTask = uploadBytesResumable(storageRef, file); // Tarea de carga

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calcula el progreso
          setPerc(progress); // Actualiza el estado del progreso
        },
        (error) => {
          console.log(error); // Manejo de errores
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prevData) => ({ ...prevData, img: downloadURL })); // Actualiza el estado con la URL de la imagen
          });
        }
      );
    };
    file && uploadFile(); // Llama a uploadFile si hay un archivo seleccionado
  }, [file]);

  // Manejar cambios en los inputs
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [id]: value })); // Actualiza el estado con los nuevos valores de los inputs
  };

  // Calcular Precio con Descuento cuando cambia el porcentaje de descuento
  const handleDiscountChange = (e) => {
    const discountPercent = e.target.value;
    const price = data.price;
    if (price && discountPercent) {
      const discountAmount = price - (price * discountPercent) / 100;
      setData((prevData) => ({
        ...prevData,
        discountPercent,
        discountAmount: discountAmount.toFixed(2), // Redondear a 2 decimales
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        discountPercent,
        discountAmount: "", // Limpiar si no hay descuento
      }));
    }
  };

  // Actualizar el producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", productId); // Referencia al documento del producto en Firestore
      await updateDoc(docRef, {
        ...data,
      }); // Actualiza el documento con los nuevos datos
      navigate("/products"); // Redirigir a la lista de productos después de actualizar
    } catch (err) {
      console.log(err); // Manejo de errores
    }
  };

  return (
    <div className="productDetails">
      <Sidebar />
      <div className="productDetailsContainer">
        <Navbar />
        <div className="top">
          <h1>Actualizar Producto</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : data.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
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

              {/* Inputs del formulario */}
              <div className="formInput">
                <label>Nombre del Producto</label>
                <input
                  id="product"
                  type="text"
                  value={data.product || ""}
                  onChange={handleInput}
                  placeholder="Nombre del Producto"
                />
              </div>
              <div className="formInput">
                <label>Descripción del Producto</label>
                <input
                  id="description"
                  type="text"
                  value={data.description || ""}
                  onChange={handleInput}
                  placeholder="Descripción del Producto"
                />
              </div>
              <div className="formInput">
                <label>Precio</label>
                <input
                  id="price"
                  type="number"
                  value={data.price || ""}
                  onChange={handleInput}
                  placeholder="Precio del Producto"
                />
              </div>
              <div className="formInput">
                <label>Porcentaje de Descuento</label>
                <input
                  id="discountPercent"
                  type="number"
                  value={data.discountPercent || ""}
                  onChange={handleDiscountChange}
                  placeholder="Porcentaje de Descuento"
                />
              </div>
              <div className="formInput">
                <label>Precio con Descuento</label>
                <input
                  id="discountAmount"
                  type="number"
                  value={data.discountAmount || ""}
                  readOnly
                  placeholder="Precio con Descuento"
                />
              </div>
              <div className="formInput">
                <label>Categoría del Producto</label>
                <input
                  id="category"
                  type="text"
                  value={data.category || ""}
                  onChange={handleInput}
                  placeholder="Categoría del Producto"
                />
              </div>
              <div className="formInput">
                <label>Cantidad de Stock</label>
                <input
                  id="stock"
                  type="number"
                  value={data.stock || ""}
                  onChange={handleInput}
                  placeholder="Número de Unidades"
                />
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
