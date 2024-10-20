import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      
      <div className="homeContainer">
        <video autoPlay loop muted className="background-video">
          <source src={require("./back.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="product" />
          <Widget type="order" />
        </div>
        <div className="charts">
          <Featured />
          <Chart 
            title="Toallas más vendidas" 
            aspect={2 / 1} 
            style={{ textAlign: "center", color: "#770737" }}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Últimos pedidos</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;