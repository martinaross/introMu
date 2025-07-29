import logoo from '../assets/logoo.png';
import '../index.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar-left">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logoo} alt="imagen de logo" className="logo" />
          </a>

          <div className="socials-container">
            <a href="https://www.facebook.com/muhouse99b" className="social" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/muhouse99b/" className="social" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@muhouse99b?is_from_webapp=1&sender_device=pc" className="social" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://discord.com/invite/9WsBsfC3Rj" className="social" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://chat.whatsapp.com/GDq5YeuSKKY6t6mZ4pYVUY" className="social" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
