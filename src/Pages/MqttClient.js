import React, { useEffect, useState } from "react"; // Importa React e hooks para gerenciamento de efeitos colaterais e estado
import mqtt from "mqtt"; // Importa a biblioteca MQTT para conectar-se ao broker MQTT
import RealTimeChart from "./RealTimeChart"; // Importa o componente de gráfico em tempo real
import { crops } from "../cropsData"; // Importa os dados das culturas de um arquivo separado
import "./MqttClient.css"; // Importa o CSS específico para este componente
import Header from "../components/header"; // Importa o componente de cabeçalho
import Footer from "../components/footer"; // Importa o componente de rodapé
import image from "../img/icons8-temperatura-cinética-média-90.png"; // Importa uma imagem para os cards
import Modal from "react-modal"; // Importa o componente Modal para exibir informações

// Estilos para o modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal MqttClient
const MqttClient = () => {
  // Estado para armazenar a última mensagem recebida com os valores de NPK
  const [lastMessage, setLastMessage] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });

  // Estado para os valores atuais de NPK
  const [currentValue, setCurrentValue] = useState({
    nitrogen: null,
    phosphorus: null,
    potassium: null,
  });

  // Estado para controlar a visibilidade do modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Estado para armazenar o conteúdo do modal
  const [modalContent, setModalContent] = useState("");
  // Estado para armazenar a cultura selecionada
  const [selectedCrop, setSelectedCrop] = useState("");

  // URL do broker MQTT e tópico a ser assinado
  const brokerUrl = "ws://broker.hivemq.com:8000/mqtt";
  const topic = "testtopic/13";

  // Efeito colateral para conectar ao broker MQTT e assinar o tópico
  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    // Ao conectar, inscreve-se no tópico especificado
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

    // Ao receber uma mensagem, processa os dados
    client.on("message", (topic, message) => {
      const msg = message.toString(); // Converte a mensagem para string
      console.log(`Mensagem recebida no tópico ${topic}: ${msg}`);

      // Divide a mensagem em valores de nitrogênio, fósforo e potássio
      const [nitrogen, phosphorus, potassium] = msg.split(",").map(Number);

      // Verifica se os valores estão dentro do intervalo permitido
      if (
        nitrogen >= 1 &&
        nitrogen <= 1999 &&
        phosphorus >= 1 &&
        phosphorus <= 1999 &&
        potassium >= 1 &&
        potassium <= 1999
      ) {
        const parsedMessage = { nitrogen, phosphorus, potassium }; // Cria um objeto com os valores
        setLastMessage(parsedMessage); // Atualiza o estado com a última mensagem
        setCurrentValue(parsedMessage); // Atualiza os valores atuais
      } else {
        console.warn(
          "Valores fora do intervalo permitido (1-1999 mg/kg). Ignorando..."
        );
      }
    });

    // Função de limpeza para desconectar do broker ao desmontar o componente
    return () => {
      client.end();
    };
  }, []); // O efeito só é executado uma vez ao montar o componente

  // Função para mostrar as diferenças entre os valores atuais e os ideais para a cultura selecionada
  const showDifferences = () => {
    if (!selectedCrop) {
      alert("Selecione uma planta primeiro!"); // Alerta se nenhuma planta foi selecionada
      return;
    }

    const crop = crops.find((crop) => crop.Planta === selectedCrop); // Encontra a cultura selecionada
    if (crop) {
      // Calcula as diferenças para NPK
      const nitrogenDiff = calculateDifference(
        lastMessage.nitrogen,
        crop.NitrogenioRange
      );
      const phosphorusDiff = calculateDifference(
        lastMessage.phosphorus,
        crop.FosforoRange
      );
      const potassiumDiff = calculateDifference(
        lastMessage.potassium,
        crop.PotassioRange
      );

      // Cria uma string com os resultados das diferenças
      const resultString = `Diferença para ${crop.Planta}:\nNitrogênio (N): ${nitrogenDiff}\nFósforo (P): ${phosphorusDiff}\nPotássio (K): ${potassiumDiff}`;
      setModalContent(resultString); // Atualiza o conteúdo do modal
      setModalIsOpen(true); // Abre o modal
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Renderização do componente
  return (
    <div>
      <Header></Header> {/* Componente de cabeçalho */}
      <div className="container">
        <h2>Dashboard</h2> {/* Título do dashboard */}

        <div className="selection-and-difference">
          <div className="crop-selection">
            <label htmlFor="crop-select">Selecione a planta:</label>
            <select
              id="crop-select"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)} // Atualiza a cultura selecionada
            >
              <option value="">Selecione...</option>
              {crops.map((crop) => (
                <option key={crop.Planta} value={crop.Planta}>
                  {crop.Planta}
                </option>
              ))}
            </select>

            {/* Botão para mostrar as diferenças de NPK */}
            <button onClick={showDifferences}>Mostrar Diferenças de NPK</button>
          </div>
        </div>

        {/* Container para os cards de NPK */}
        <div className="cards-container">
          <div className="card">
            <img className="card-img" src={image} alt="Nitrogênio" />
            <h3>Nitrogênio</h3>
            <p>{lastMessage.nitrogen}</p> {/* Exibe o valor de nitrogênio */}
          </div>
          <div className="card">
            <img className="card-img" src={image} alt="Fósforo" />
            <h3>Fósforo</h3>
            <p>{lastMessage.phosphorus}</p> {/* Exibe o valor de fósforo */}
          </div>
          <div className="card">
            <img className="card-img" src={image} alt="Potássio" />
            <h3>Potássio</h3>
            <p>{lastMessage.potassium}</p> {/* Exibe o valor de potássio */}
          </div>
        </div>

        <br />
        <br />
        <RealTimeChart dataStream={currentValue} /> {/* Componente de gráfico em tempo real */}

        {/* Modal para exibir as diferenças de NPK */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h2>Diferença de NPK</h2>
          <pre>{modalContent}</pre> {/* Exibe o conteúdo das diferenças */}
          <button onClick={closeModal}>Fechar</button> {/* Botão para fechar o modal */}
        </Modal>
      </div>
    </div>
  );
};

export default MqttClient; // Exporta o componente MqttClient

// Função para calcular a diferença entre os valores de NPK atuais e o intervalo ideal da cultura
function calculateDifference(value, range) {
  if (value < range[0]) {
    return range[0] - value; // Retorna a diferença se o valor está abaixo do intervalo
  } else if (value > range[1]) {
    return value - range[1]; // Retorna a diferença se o valor está acima do intervalo
  }
  return 0; // Retorna 0 se o valor está dentro do intervalo ideal
}
