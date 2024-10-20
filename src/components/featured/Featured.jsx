/*Functionality: The funcitonality of this file is to display anotehr grpah of the top 5 locations of all 
the users, gives the 5 most repeated ones  */
import React, { useEffect, useState } from "react";
import "./featured.scss";
import { Bar } from "react-chartjs-2";
import { getDatabase, ref, onValue } from "firebase/database"; // Import Firebase Realtime Database functions
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Featured = () => {
  const [locationData, setLocationData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      const db = getDatabase(); 
      const usersRef = ref(db, "users"); 

      const locationCount = {};

      //db fetching
      onValue(usersRef, (snapshot) => {
        const users = snapshot.val();

        if (!users) {
          console.log("No users found in the database");
          return;
        }

        //counting ocurrences of locations
        Object.keys(users).forEach((userId) => {
          const user = users[userId];
          const location = user.location;

          if (location) {
            if (locationCount[location]) {
              locationCount[location] += 1; // Increment the count for the location
            } else {
              locationCount[location] = 1; // Initialize the count for a new location
            }
          }
        });

        //convierto location to an array
        let formattedData = Object.keys(locationCount).map((location) => ({
          name: location,
          value: locationCount[location],
        }));

        //Sort the top 5 locations
        formattedData = formattedData.sort((a, b) => b.value - a.value).slice(0, 5);


        const labels = formattedData.map(item => item.name);
        const dataValues = formattedData.map(item => item.value);


        setLocationData({
          labels,
          datasets: [
            {
              label: "Localidades",
              data: dataValues,
              backgroundColor: [
                "rgba(255, 127, 80, 0.6)",  
                "rgba(129, 19, 49, 0.6)", 
                "rgba(222, 49, 99, 0.6)",  
                "rgba(169, 92, 104, 0.6)",  
                "rgba(250, 128, 114, 0.6)", 
                "rgba(216, 191, 216, 0.6)",  
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
    };

    fetchLocationData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Localidades",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="featured">
      <div className="top">
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <Bar data={locationData} options={options} />
        </div>
        <div className="desc">
          Datos basados en las localidades de los usuarios.
        </div>
      </div>
    </div>
  );
};

export default Featured;
