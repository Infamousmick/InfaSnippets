import { Container, Row, Col } from "react-bootstrap";
import { Code2, Heart } from "lucide-react";
import { FaTelegram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MyFooter.css";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-wrapper py-4 mt-5">
      <Container>
        <Row className="align-items-center justify-content-between gy-4">
          <Col xs={12} md={4} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <Code2 size={24} className="footer-brand-icon" />
              <span className="footer-brand-text">
                Snippet<span className="vault">Vault</span>
              </span>
            </div>
            <p className="footer-description m-0">
              Share, explore, and fork code snippets with developers worldwide.
            </p>
          </Col>

          <Col xs={12} md={4} className="text-center">
            <div className="footer-links d-flex justify-content-center gap-4">
              <Link to="/">Home</Link>
              <Link to="/explore">Explore</Link>
              <a
                href="https://github.com/Infamousmick/SnippetVault"
                target="_blank"
                rel="noreferrer"
              >
                Open Source
              </a>
            </div>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <a
                href="https://github.com/Infamousmick"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://t.me/Infamick"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <FaTelegram size={20} />
              </a>
            </div>

            <p className="footer-copyright m-0">
              Made with
              <Heart
                size={14}
                stroke="#ea3c3f"
                className="heart-icon mx-1"
              />
              by Infamick © {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
