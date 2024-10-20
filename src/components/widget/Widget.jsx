import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";  
import { getDatabase, ref, onValue } from "firebase/database";  // Realtime Database
import { db as firestoreDb } from "../../firebase";  
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;

  switch (type) {
    case "users":
      data = {
        title: "Usuarios",
        isMoney: false,
        link: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            Ver usuarios
          </Link>
        ),
        query: "users",  
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Pedidos realizados",
        query: "orders",  
        link: (
          <Link to="/orders" style={{ textDecoration: "none" }}>
            Ver ordenes
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "Productos en stock",
        query: "products", 
        link: (
          <Link to="/products" style={{ textDecoration: "none" }}>
            Ver detalles
          </Link>
        ),
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.query === "users") {
        //fetch from Realtime Database for users
        const db = getDatabase();  //initilize for user firebasereal-time db 
        const usersRef = ref(db, "users");  
        onValue(usersRef, (snapshot) => {
          const usersData = snapshot.val();
          if (usersData) {
            setAmount(Object.keys(usersData).length);  //count the number of ''
          } else {
            setAmount(0);  
          }
          setDiff(0); 
        });
      } else if (data && (data.query === "products" || data.query === "orders")) {
        const querySnapshot = await getDocs(collection(firestoreDb, data.query));
        setAmount(querySnapshot.size); 
        setDiff(0); 
      }
    };
    fetchData();
  }, [data.query]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount} {/*to display the # of users, products and orders */}
        </span>
        <span className="link">{data.link}</span>
      </div>

    </div>
  );
};

export default Widget;