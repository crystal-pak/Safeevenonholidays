import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/layout.css";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";

const Navbars = () => {
  const loginState = useSelector(state => state.loginSlice)
  const {doLogout, moveToPath} = useCustomLogin()
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [dong, setDong] = useState("")

  const handleClickLogout = () => {
    doLogout()
    alert("로그아웃 되었습니다")
    moveToPath('/')
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchDongName(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
          setDong("위치 권한이 필요합니다."); // 기본값 설정
        }
      );
    } else {
      setDong("Geolocation을 지원하지 않는 브라우저입니다."); // 기본값 설정
    }
  }, []);

  const fetchDongName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK edbe314597786c5795e7516f6aa2b7d2`,
          },
        }
      );
      console.log(response.status, response.statusText);
      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const dongName = data.documents[0].region_3depth_name; // 올바른 경로로 수정
        setDong(dongName || "동 정보를 찾을 수 없습니다.");
      } else {
        setDong("주소 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("동 정보를 가져오는 중 오류 발생:", error);
      setDong("정보를 가져오는 중 오류 발생");
    }
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
                {dong}
              </Nav.Link>
              <Nav.Link onClick={handleClickLogout}>
                로그아웃
              </Nav.Link>
              <Nav.Link href="/mypage">
                마이페이지
              </Nav.Link>
           <NavDropdown title="고객센터" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/help/list">Q&A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/info/list">자료실</NavDropdown.Item>
            </NavDropdown>
            </>
            :
            <>
              <Nav.Link className="current-location">
                <i className="bi bi-geo-alt-fill icon"></i>
                {dong}
              </Nav.Link>
              <Nav.Link href="/member/login">
                로그인
              </Nav.Link>
              <Nav.Link href="/member/signup">
                회원가입
              </Nav.Link>
              <NavDropdown title="고객센터" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/help/list">Q&A</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/info/list">자료실</NavDropdown.Item>
            </NavDropdown>
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

