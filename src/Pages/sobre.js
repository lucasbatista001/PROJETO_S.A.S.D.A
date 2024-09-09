import React from "react";
import "./Sobre.css";
import logo from "../img/WhatsApp Image 2024-08-28 at 14.50.24.jpeg";
import Header from "../components/header";
import Footer from "../components/footer";

const Sobre = () => {
  return (
    <>
      <Header></Header>
      <div className="sobre-container">
        <div className="card card1">
          <p>
            Nosso sistema foi desenvolvido para avaliar a qualidade do solo com
            base em parâmetros fundamentais, como nitrogênio, fósforo e
            potássio. Esses nutrientes são essenciais para determinar se o solo
            está em condições adequadas para o plantio.
          </p>
          <img src={logo} alt="SASDA Logo" className="card-image2" />
        </div>
        <div className="card card2">
          <p>
            Após a análise do solo, nosso software sugere as culturas mais
            adequadas para o tipo de solo avaliado. Além disso, oferecemos dicas
            práticas sobre como ajustar os níveis de nutrientes, permitindo que
            o solo atinja as condições ideais para o plantio.
          </p>
          <img src={logo} alt="SASDA Logo" className="card-image2" />
        </div>
        <div className="card card3">
          <p>
            Nosso sistema também serve como uma ferramenta educativa, ajudando
            agricultores a entenderem melhor os fatores que influenciam a
            qualidade do solo. Aprenda como diferentes nutrientes impactam o
            crescimento das plantas e receba orientações sobre como melhorar a
            qualidade do solo para alcançar resultados excelentes em suas
            colheitas.
          </p>
          <img src={logo} alt="SASDA Logo" className="card-image2" />
        </div>
        <footer className="sobre-footer">
          <p>
            Projeto feito para a disciplina extensionista da instituição Centro
            Universitário UniFavip - Wyden.
          </p>
        </footer>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer></Footer>
    </>
  );
};

export default Sobre;
