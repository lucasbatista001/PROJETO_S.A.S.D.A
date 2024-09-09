// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 S.A.S.D.A | Todos os direitos reservados.</p>
      <div style={styles.socialLinks}>
        <a href="https://facebook.com" style={styles.link}>Facebook</a>
        <a href="https://instagram.com" style={styles.link}>Instagram</a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#37BF11',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '40px',
  },
  socialLinks: {
    marginTop: '10px',
  },
  link: {
    margin: '0 10px',
    color: '#37BF11',
    textDecoration: 'none',
  }
};

export default Footer;
