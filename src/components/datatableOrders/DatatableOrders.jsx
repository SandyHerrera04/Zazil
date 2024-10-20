import "./DatatableOrders.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, orderRows } from "../../dataOrdersSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const DatatableOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {

      const docId = String(id);
      
      await deleteDoc(doc(db, "orders", docId));
      
      setData((prevData) => prevData.filter((item) => item.id !== docId));
  
      console.log(`Order with ID ${docId} deleted successfully.`);
    } catch (err) {
      console.log("Error deleting document:", err);
      alert("Failed to delete order. Please try again.");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => {
                if (!params.row.id) {
                  console.error("Missing row ID:", params.row);
                  return;
                }
                handleDelete(params.row.id);
              }}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Historial de Pedidos
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableOrders;
