import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Modal from "../components/modal"; 
import logo from "../img/WhatsApp Image 2024-08-28 at 14.50.24.jpeg"

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <Header />
      <main style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Decisões Agrícolas Eficientes</h1>
          <p style={styles.subtitle}>Seja bem-vindo!</p>
          <div>
            <button style={styles.button} onClick={openModal}>VER MAIS</button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Informações Adicionais</h2>
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <img src={logo} alt="SASDA Logo" style={styles.cardLogo} />
            <p style={styles.cardText}>
              Análise da Qualidade do Solo
              Nosso sistema foi desenvolvido para avaliar a qualidade do solo com base em parâmetros fundamentais, como nitrogênio, fósforo e potássio. Esses nutrientes são essenciais para determinar se o solo está em condições adequadas para o plantio. A partir dos dados coletados, nosso software realiza uma análise detalhada para garantir que o solo atenda às condições necessárias para o cultivo sustentável.
            </p>
          </div>
          <div style={styles.card}>
            <img src={logo} alt="SASDA Logo" style={styles.cardLogo} />
            <p style={styles.cardText}>
              Sugestões de Cultivo Personalizadas
              Após a análise do solo, nosso software sugere as culturas mais adequadas para o tipo de solo avaliado. Além disso, oferecemos dicas práticas sobre como ajustar os níveis de nutrientes, permitindo que o solo atinja as condições ideais para o plantio. Isso ajuda a garantir que os agricultores possam otimizar sua produção de maneira eficaz e sustentável.
            </p>
          </div>
          <div style={styles.card}>
          <img src={logo} alt="SASDA Logo" style={styles.cardLogo} />
            <p style={styles.cardText}>
              Ferramenta Educativa para Agricultores
              Nosso sistema também serve como uma ferramenta educativa, ajudando agricultores a entenderem melhor os fatores que influenciam a qualidade do solo. Aprenda como diferentes nutrientes impactam o crescimento das plantas e receba orientações sobre como melhorar a qualidade do solo para alcançar resultados excelentes em suas colheitas.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    backgroundImage: 'url(https://cdn.vysokeskoly.cz/czech-universities/uploads/2020/02/290.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    backgroundAttachment: 'fixed',
  },
  header: {
    flex: '1 1 40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '', // Semi-transparent background for better readability
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#fff',
    marginTop: '10px',
  },
  button: {
    padding: '20px 30px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    border: "2px solid white",
    color: 'white',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '30%',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  cardLogo: {
    width: '100px',
    height: 'auto',
  },
  cardText: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default Home;
