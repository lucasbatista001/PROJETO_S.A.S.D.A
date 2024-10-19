import React from 'react';
import logo from '../img/WhatsApp Image 2024-08-28 at 14.50.24.jpeg'; 

const Header = () => {
  return (
    <header style={styles.header}>
      <a href="/" style={{ ...styles.link, ...styles.logo }}>
        <img src={logo} alt="S.A.S.D.A Logo" style={styles.logoImage} />
        S.A.S.D.A
      </a>
      <div style={styles.headerRight}>
        <a style={styles.link} href="/Dashboard">Dashboard</a>
        <a style={styles.link} href="/result">Resultados</a>
        <a style={styles.link} href="/sobre">Sobre</a>
      </div>
    </header>
  );
}

const styles = {
  header: {
    overflow: 'hidden',
    background: '#fff', 
    padding: '20px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#37BF11',
    textAlign: 'center',
    padding: '12px',
    textDecoration: 'none',
    fontSize: '18px',
    lineHeight: '25px',
    borderRadius: '4px',
    marginLeft: '20px',
  },
  logo: {
    fontSize: '25px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '50px', 
    height: 'auto',
    marginRight: '10px', 
  },
  headerRight: {
    display: 'flex',
  },
};

export default Header;
