import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    const fetchData = () => {
      const usersRef = ref(db, "users");
      onValue(
        usersRef,
        (snapshot) => {
          const data = snapshot.val();
          let list = [];
          for (let id in data) {
            list.push({ id, ...data[id] });
          }
          setData(list);
        },
        (error) => {
          console.log("Error fetching data: ", error);
        }
      );
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const db = getDatabase();
    try {
      const userRef = ref(db, `users/${id}`);
      await remove(userRef);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
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
              onClick={() => handleDelete(params.row.id)}
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
      <div className="datatableTitle">Historial de Usuarios</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;