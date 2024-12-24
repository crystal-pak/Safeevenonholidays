import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/layout.css";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";

const Navbars = () => {
  const loginState = useSelector(state => state.loginSlice)
  const {doLogout, moveToPath} = useCustomLogin()

  const handleClickLogout = () => {
    doLogout()
    alert("로그아웃 되었습니다")
    moveToPath('/')
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-white navbar">
        <Container className="border-border border-2">
          <img src="/images/logo.png" alt="logo" className="logo" />
          <Navbar.Brand href="/" className="ms-3">
            휴일도안심
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              {loginState.email ? 
            <>
              <Nav.Link className="current-location">
                <i className="bi bi-geo-alt-fill icon"></i>
                성남동
              </Nav.Link>
              <Nav.Link onClick={handleClickLogout}>
                로그아웃
              </Nav.Link>
              <Nav.Link href="/mypage">
                마이페이지
              </Nav.Link>
              <Nav.Link href="/info/list">
                고객센터
              </Nav.Link>
            </>
            :
            <>
              <Nav.Link className="current-location">
                <i className="bi bi-geo-alt-fill icon"></i>
                성남동
              </Nav.Link>
              <Nav.Link href="/login">
                로그인
              </Nav.Link>
              <Nav.Link href="/signup">
                회원가입
              </Nav.Link>
              <Nav.Link href="/info/list">
                고객센터
              </Nav.Link>
            </>
            }
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;

