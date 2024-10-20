import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase";  // Ensure you have initialized Firestore

const List = () => {
  const [orders, setOrders] = useState([]);

  // Fetch the last 5 orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"), limit(5)); // Order by createdAt and limit to 5 orders
      const querySnapshot = await getDocs(ordersQuery);
      
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id, // Use the document ID as the order ID
        ...doc.data(), // Spread the rest of the data (amount, currency, etc.)
      }));

      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID Pedido</TableCell>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Precio</TableCell>
            <TableCell className="tableCell">Tipo de moneda</TableCell>
            <TableCell className="tableCell">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="tableCell">{order.id}</TableCell>
              <TableCell className="tableCell">
                {order.createdAt?.seconds 
                  ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('es-ES') 
                  : 'Fecha no disponible'}
              </TableCell>
              <TableCell className="tableCell">{order.amount}</TableCell>
              <TableCell className="tableCell">{order.currency || 'No disponible'}</TableCell>
              <TableCell className="tableCell">{order.status || 'No disponible'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;