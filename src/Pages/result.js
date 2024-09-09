import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import RealTimeChart from "./RealTimeChart";
import { crops } from "../cropsData";
import "./MqttClient.css";
import Header from "../components/header";
import image from "../img/icons8-temperatura-cinética-média-90.png";

const MqttClient = () => {
  const [lastMessage, setLastMessage] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });
  const [suggestedCrop, setSuggestedCrop] = useState("");
  const [currentValue, setCurrentValue] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });
  const brokerUrl = "ws://broker.hivemq.com:8000/mqtt";
  const topic = "testtopic/13";

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Conectado ao broker MQTT!");
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Falha ao se inscrever no tópico:", err);
        } else {
          console.log(`Inscrito no tópico: ${topic}`);
        }
      });
    });

    client.on("message", (topic, message) => {
      const msg = message.toString();
      console.log(`Mensagem recebida no tópico ${topic}: ${msg}`);

      const [nitrogen, phosphorus, potassium] = msg.split(",").map(Number);

      if (
        nitrogen >= 1 &&
        nitrogen <= 1999 &&
        phosphorus >= 1 &&
        phosphorus <= 1999 &&
        potassium >= 1 &&
        potassium <= 1999
      ) {
        const parsedMessage = { nitrogen, phosphorus, potassium };

        setLastMessage(parsedMessage);
        setCurrentValue(parsedMessage);

        let bestCrop = "";
        let smallestDifference = Infinity;

        crops.forEach((crop) => {
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
            const nitrogenDiff = calculateDifference(
              nitrogen,
              crop.NitrogenioRange
            );
            const phosphorusDiff = calculateDifference(
              phosphorus,
              crop.FosforoRange
            );
            const potassiumDiff = calculateDifference(
              potassium,
              crop.PotassioRange
            );

            const totalDifference =
              nitrogenDiff + phosphorusDiff + potassiumDiff;

            console.log(`Analisando ${crop.Planta}:`);
            console.log(
              `Intervalo Nitrogênio: ${crop.NitrogenioRange[0]} - ${crop.NitrogenioRange[1]}`
            );
            console.log(
              `Intervalo Fósforo: ${crop.FosforoRange[0]} - ${crop.FosforoRange[1]}`
            );
            console.log(
              `Intervalo Potássio: ${crop.PotassioRange[0]} - ${crop.PotassioRange[1]}`
            );
            console.log(
              `Diferença total para ${crop.Planta}: ${totalDifference}`
            );

            if (totalDifference < smallestDifference) {
              smallestDifference = totalDifference;
              bestCrop = crop.Planta;
            }
          } else {
            console.error(
              `Intervalos não definidos corretamente para a planta: ${crop.Planta}`
            );
          }
        });

        setSuggestedCrop(bestCrop);
        console.log(`Melhor cultura sugerida: ${bestCrop}`);
      } else {
        console.warn(
          "Valores fora do intervalo permitido (1-1999 mg/kg). Ignorando..."
        );
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="container">
        <h2>Análise</h2>
        <div className="cards-container">
          <div className="card3">
            <h3>Sugestão de Plantio:</h3>
            <p>
              {suggestedCrop
                ? `A melhor cultura para plantar é: ${suggestedCrop}`
                : "Aguardando dados..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MqttClient;

function calculateDifference(value, range) {
  if (value < range[0]) {
    return range[0] - value;
  } else if (value > range[1]) {
    return value - range[1];
  }
  return 0; // Dentro do intervalo ideal
}
