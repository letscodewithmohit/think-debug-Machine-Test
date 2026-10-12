import logo from "../../Image/logo.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={logo} alt="E-Commerce" />
        <p>
          Little things. Lovely finds.
          <br />
          A brighter kind of everyday.
        </p>
      </div>

      <div className="footer-column">
        <h3>Help Center</h3>
        <a href="#products">FAQs</a>
        <a href="#products">Contact us</a>
        <a href="#products">Shipping & returns</a>
      </div>

      <div className="footer-column">
        <h3>Explore</h3>
        <a href="#products">Shop all</a>
        <a href="#products">Our story</a>
        <a href="#products">Good things, often</a>
      </div>

      <div className="footer-note">
        <p>
          Made for the moments
          <br />
          that make your day.
        </p>
        <span>© 2026 E-Commerce. Made with care.</span>
      </div>
    </footer>
  );
}

export default Footer;
