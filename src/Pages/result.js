import React, { useEffect, useState } from "react"; // Import React and hooks
import mqtt from "mqtt"; // Import MQTT library for real-time messaging
import RealTimeChart from "./RealTimeChart"; // Component for displaying real-time data (not used in the current code)
import { crops } from "../cropsData"; // Import crop data with nutrient ranges
import "./MqttClient.css"; // CSS file for styling
import Header from "../components/header"; // Header component
import image from "../img/icons8-temperatura-cinética-média-90.png"; // Unused image import

// Main MqttClient functional component
const MqttClient = () => {
  // State to hold the last received message with nutrient values
  const [lastMessage, setLastMessage] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });
  
  // State to hold the top crops based on nutrient values
  const [topCrops, setTopCrops] = useState([]); 
  
  // State to hold the current nutrient values
  const [currentValue, setCurrentValue] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });

  // MQTT broker URL and topic to subscribe to
  const brokerUrl = "ws://broker.hivemq.com:8000/mqtt";
  const topic = "testtopic/13";

  // Effect for connecting to the MQTT broker and subscribing to the topic
  useEffect(() => {
    const client = mqtt.connect(brokerUrl); // Connect to the MQTT broker

    // When connected, subscribe to the specified topic
    client.on("connect", () => {
      console.log("Conectado ao broker MQTT!"); // Log connection success
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Falha ao se inscrever no tópico:", err); // Log error if subscription fails
        } else {
          console.log(`Inscrito no tópico: ${topic}`); // Log successful subscription
        }
      });
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      const msg = message.toString(); // Convert message to string
      console.log(`Mensagem recebida no tópico ${topic}: ${msg}`); // Log received message

      // Parse nutrient values from the message
      const [nitrogen, phosphorus, potassium] = msg.split(",").map(Number);

      // Validate the nutrient values are within the acceptable range
      if (
        nitrogen >= 1 && nitrogen <= 1999 &&
        phosphorus >= 1 && phosphorus <= 1999 &&
        potassium >= 1 && potassium <= 1999
      ) {
        const parsedMessage = { nitrogen, phosphorus, potassium }; // Create object for parsed values

        // Update state with the last received and current nutrient values
        setLastMessage(parsedMessage);
        setCurrentValue(parsedMessage);

        let cropsWithDifference = []; // Array to hold crops and their nutrient differences

        // Iterate through crops to calculate nutrient differences
        crops.forEach((crop) => {
          // Validate crop ranges and ensure they are correctly defined
          if (
            crop.NitrogenioRange &&
            crop.FosforoRange &&
            crop.PotassioRange &&
            Array.isArray(crop.NitrogenioRange) &&
            Array.isArray(crop.FosforoRange) &&
            Array.isArray(crop.PotassioRange) &&
            crop.NitrogenioRange.length === 2 &&
            crop.FosforoRange.length === 2 &&
            crop.PotassioRange.length === 2
          ) {
            // Calculate differences for each nutrient
            const nitrogenDiff = calculateDifference(nitrogen, crop.NitrogenioRange);
            const phosphorusDiff = calculateDifference(phosphorus, crop.FosforoRange);
            const potassiumDiff = calculateDifference(potassium, crop.PotassioRange);

            // Calculate total difference for the crop
            const totalDifference = nitrogenDiff + phosphorusDiff + potassiumDiff;

            // Add crop and its total difference to the array
            cropsWithDifference.push({
              planta: crop.Planta,
              totalDifference,
            });
          } else {
            console.error(`Intervalos não definidos corretamente para a planta: ${crop.Planta}`); // Log error for incorrectly defined ranges
          }
        });

        // Sort crops by their total nutrient difference (ascending order)
        cropsWithDifference.sort((a, b) => a.totalDifference - b.totalDifference);

        // Set the top 5 crops based on the smallest nutrient differences
        setTopCrops(cropsWithDifference.slice(0, 5));
        console.log("Top 5 culturas sugeridas:", cropsWithDifference.slice(0, 5)); // Log top crops
      } else {
        console.warn("Valores fora do intervalo permitido (1-1999 mg/kg). Ignorando..."); // Log warning for out-of-range values
      }
    });

    // Cleanup function to disconnect from the broker when the component unmounts
    return () => {
      client.end();
    };
  }, []); // Empty dependency array to run effect only once

  // Render the component
  return (
    <div>
      <Header /> {/* Render header */}
      <div className="container">
        <h2>Análise</h2> {/* Title */}
        <div className="cards-containerR"> {/* Container for cards */}
          {topCrops.length > 0 // Check if there are top crops to display
            ? topCrops.map((crop, index) => ( // Map over top crops
                <div className="card3" key={index}> {/* Card for each crop */}
                  <h3>{index + 1}. {crop.planta}</h3> {/* Crop name */}
                  <p>Diferença total: {crop.totalDifference}</p> {/* Display total difference */}
                </div>
              ))
            : "Aguardando dados..."} {/* Message when waiting for data */}
        </div>
      </div>
    </div>
  );
};

export default MqttClient; // Export the component

// Function to calculate the difference between a value and a range
function calculateDifference(value, range) {
  if (value < range[0]) {
    return range[0] - value; // Return difference if value is below range
  } else if (value > range[1]) {
    return value - range[1]; // Return difference if value is above range
  }
  return 0; // Return 0 if within range
}
