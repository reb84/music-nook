import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © 2025 |{" "}
          <a
            href="https://github.com/reb84/music-nook"
            target="_blank"
            rel="noopener noreferrer"
            title="source code on GitHub"
          >
            reb84
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
