import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

// Componente principal Home
const Home = () => {
  return (
    <div className="home">
      {/* Barra lateral */}
      <Sidebar />
      
      <div className="homeContainer">
        {/* Video de fondo */}
        <video autoPlay loop muted className="background-video">
          <source src={require("./back.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Barra de navegación */}
        <Navbar />
        
        {/* Widgets */}
        <div className="widgets">
          <Widget type="users" />
          <Widget type="product" />
          <Widget type="order" />
        </div>
        
        {/* Gráficos */}
        <div className="charts">
          <Featured />
          <Chart 
            title="Toallas más vendidas" 
            aspect={2 / 1} 
            style={{ textAlign: "center", color: "#770737" }}
          />
        </div>
        
        {/* Tabla de últimos pedidos */}
        <div className="listContainer">
          <div className="listTitle">Últimos pedidos</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

// Exporta el componente Home
export default Home;
