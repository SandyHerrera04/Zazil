import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableProducts from "../../components/datatableProducts/DatatableProducts"
import DatatableOrders from "../../components/datatableOrders/DatatableOrders"

const List = ({ type }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* Condicional para decidir qué tabla cargar */}
        {type === "products" ? (
          <DatatableProducts />
        ) : type === "orders" ? (
          <DatatableOrders />
        ) : (
          <Datatable /> // Usuarios por defecto
        )}
      </div>
    </div>
  );
};

export default List;
