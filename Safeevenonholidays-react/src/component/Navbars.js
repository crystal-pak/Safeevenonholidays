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
          if (error.code === error.PERMISSION_DENIED) {
            alert("위치 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.");
            // 사용자가 위치 권한을 허용하도록 유도하는 메시지를 제공
          } else {
            console.error("위치 정보를 가져올 수 없습니다:", error);
            setDong("위치 권한이 필요합니다.");
          }
        }
      );
    } else {
      setDong("Geolocation을 지원하지 않는 브라우저입니다.");
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
        <div className="d-flex align-items-center w-100">
          {/* 로고와 브랜드 */}
          <div className="d-flex align-items-center">
            <img src="/images/logo.png" alt="logo" className="logo" />
            <Navbar.Brand href="/" className="ms-3 fw-bold">
              휴일도안심
            </Navbar.Brand>

            {/* 현재 동 정보 (md 이하에서 로고 바로 오른쪽에 표시) */}
            <div className="d-md-flex d-lg-none" style={{fontSize : "1rem"}}>
              <Nav.Link className="current-location d-flex align-items-center">
                <i className="bi bi-geo-alt-fill icon me-1"></i>
                {dong}
              </Nav.Link>
            </div>
          </div>

          {/* 현재 동 정보 (lg 이상에서 오른쪽 끝에 표시) */}
          <div className="d-none d-lg-block ms-auto me-2">
            <Nav.Link className="current-location d-flex align-items-center">
              <i className="bi bi-geo-alt-fill icon me-1"></i>
              {dong}
            </Nav.Link>
          </div>

          {/* Navbar Toggle (모바일용) */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='ms-auto' />
        </div>

        {/* Navbar Collapse */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className='text-nowrap'>
            {loginState.email ? (
              <>
                {/* 현재 동 정보 (모바일용) */}
                <Nav.Link className="current-location d-flex align-items-center d-none">
                  <i className="bi bi-geo-alt-fill icon me-1"></i>
                  {dong}
                </Nav.Link>
                <Nav.Link onClick={handleClickLogout}>로그아웃</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <NavDropdown title="고객센터" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/help/list">
                    Q&A
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/info/list">
                    자료실
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                {/* 현재 동 정보 (모바일용) */}
                <Nav.Link className="current-location d-flex align-items-center d-none">
                  <i className="bi bi-geo-alt-fill icon me-1"></i>
                  {dong}
                </Nav.Link>
                <Nav.Link href="/member/login">로그인</Nav.Link>
                <Nav.Link href="/member/signup">회원가입</Nav.Link>
                <NavDropdown title="고객센터" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/help/list">
                    Q&A
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/info/list">
                    자료실
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Navbars;

