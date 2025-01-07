import React from "react";
import { Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/layout.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Row>
          <Col>
            <p>서비스이용약관</p>
            <p>|</p>
            <p>개인정보처리방침</p>
            <p>|</p>
            <p>위치기반서비스이용약관</p>
            <p>|</p>
            <p className="footer-company">(주)휴일도안심</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Footer;