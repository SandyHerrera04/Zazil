/*Functionality: This file is in charge of giving the charts in the admin webpage
of the top (5) more purschased pads in all the orders*/
import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; 

const COLORS = ["#f38181", "#800080", "#DA70D6", "#574b90", "#D8BFD8"];

const Chart = ({ aspect, title }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const productCount = {};

        // Count occurrences of each product in the orders
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          const product = order.product;

          if (product) {
            if (productCount[product]) {
              productCount[product] += 1; 
            } else {
              productCount[product] = 1; 
            }
          }
        });


        let formattedData = Object.keys(productCount).map((product) => ({
          name: product,
          value: productCount[product],
        }));


        formattedData = formattedData.sort((a, b) => b.value - a.value).slice(0, 5);

        setProductData(formattedData);
      } catch (error) {
        console.error("Error fetching product data from Firestore:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <PieChart>
          <Pie
            data={productData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label
          >
            {productData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
