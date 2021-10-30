import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';

const locales = {
  copyright:
    '© Copyright National Aeronautics and Space Administration. All rights reserved.',
};

const PublicFooter = () => {
  return (
    <div className="public-footer">
      <Col lg={3} className="footer-col links"></Col>
      <Col lg={6} className="footer-col">
        <span className="legal-text">{locales.copyright}</span>
      </Col>
      <Col lg={3} className="footer-col">
        <Row className="footer-icons-row">
          <div className="footer-icon-container">
            <Link
              to={{
                pathname: 'https://www.facebook.com/NASA/',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="footer-icon" />
            </Link>
          </div>
          <div className="footer-icon-container">
            <Link
              to={{
                pathname: 'http://instagram.com/nasa',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="footer-icon" />
            </Link>
          </div>
          <div className="footer-icon-container">
            <Link
              to={{
                pathname: 'http://twitter.com/nasa',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="footer-icon" />
            </Link>
          </div>
          <div className="footer-icon-container">
            <Link
              to={{
                pathname: 'https://www.youtube.com/NASA',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="footer-icon" />
            </Link>
          </div>
          <div className="footer-icon-container">
            <Link
              to={{
                pathname: 'https://www.linkedin.com/company/nasa/',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="footer-icon" />
            </Link>
          </div>
        </Row>
      </Col>
    </div>
  );
};

export default PublicFooter;
