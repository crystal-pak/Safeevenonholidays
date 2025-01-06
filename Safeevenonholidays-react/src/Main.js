import React, { useEffect, useState } from "react";
import "../src/styles/main.css";
import { Col, Row } from "react-bootstrap";
import ItemsCarousel from "react-items-carousel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(4);
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [hospitals, setHospitals] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateCardCount = () => {
    if (window.innerWidth <= 470) {
      setNumberOfCards(1);
    } else if (window.innerWidth <= 769) {
      setNumberOfCards(2);
    } else if (window.innerWidth <= 1200) {
      setNumberOfCards(3);
    } else {
      setNumberOfCards(4);
    }
  };

  useEffect(() => {
    updateCardCount();

    const handleResize = () => {
      updateCardCount();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickHosSearch = () => {
    navigate("/hospital/list");
  };

  const handleClickPharmSearch = () => {
    navigate("/pharmacy/list");
  };

  const handleClickInfo = () => {
    navigate("/info/list");
  };

  const handleClickHelp = () => {
    navigate("/help/list");
  };

  const API_KEY =
    "Xcr9KCUMHCL1McVUfmx1J3+bvAyCQaKXKyzIz6/4ZJce9pDbPGXrq+sLzeEmPooR44q8iedR/yOO9ToRc18Rpw==";

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // 병원 정보 가져오기
  useEffect(() => {
    setLoading(true);
    if (location.latitude && location.longitude) {
      const fetchHospitals = async () => {
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire`,
            {
              params: {
                WGS84_LON: location.longitude,
                WGS84_LAT: location.latitude,
                pageNo: 1,
                numOfRows: 4,
                ServiceKey: API_KEY,
              },
            },
          );
          // 응답 데이터 확인 및 상태 업데이트
          const items = response.data.response.body.items.item || [];
          console.log("Fetched Hospitals:", items);
          setHospitals(items);
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHospitals();
    }
  }, [location]);

  // 약국 정보 가져오기
  useEffect(() => {
    setLoading(true);
    if (location.latitude && location.longitude) {
      const fetchPharmacies = async () => {
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire`,
            {
              params: {
                WGS84_LON: location.longitude,
                WGS84_LAT: location.latitude,
                pageNo: 1,
                numOfRows: 4,
                ServiceKey: API_KEY,
              },
            },
          );
          setPharmacies(response.data.response.body.items.item || []);
        } catch (error) {
          console.error("Error fetching pharmacies:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPharmacies();
    }
  }, [location]);

  // 텍스트 자르기
  useEffect(() => {
    function truncateText(selector, maxLength) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        // 원본 텍스트를 저장하고, 이미 저장된 데이터가 있을 경우 그것을 사용
        const originalText = element.getAttribute("data-original-text") || element.textContent;

        // 텍스트를 잘랐을 때, 잘린 텍스트는 data-original-text에 저장
        if (!element.getAttribute("data-original-text")) {
          element.setAttribute("data-original-text", originalText);
        }

        if (windowWidth <= 950) {
          // windowWidth가 950 이하일 때만 텍스트 자르기
          if (originalText.length > maxLength) {
            element.textContent = originalText.slice(0, maxLength) + "...";
          }
        } else {
          element.textContent = originalText; // windowWidth가 950 이상일 때 원본 텍스트로 복원
        }
      });
    }

    truncateText(".section2-card h5", 30);
    truncateText(".section2-card p", 35);
  }, [windowWidth, hospitals, pharmacies]);

  return (
    <>
      <div className="">
        <section className="section">
          <div className="container mt-5">
            <Row>
              <div className="col-md-6">
                <div className="card section1-card-left">
                  <div className="card-body">
                    <h5 className="card-title-left">휴일도 안심</h5>
                    <p className="card-text-left">
                      내 위치에서 가까운
                      <br />
                      의료시설을 찾아드립니다.
                    </p>
                  </div>
                  <img src="/images/main.png" className="card-img-bottom" />
                </div>
              </div>
              <div className="col-md-6 d-flex flex-column">
                <div className="card mb-2 section1-card-right">
                  <div role="button" onClick={handleClickHosSearch} className="card-body">
                    <h5 className="card-title">병원 찾기</h5>
                    <p className="card-text">가까운 병원을 찾아보세요.</p>
                    <img src="/images/checkup.png" className="card-img-bottom2" />
                  </div>
                </div>
                <div className="card section1-card-right">
                  <div role="button" onClick={handleClickPharmSearch} className="card-body">
                    <h5 className="card-title">약국 찾기</h5>
                    <p className="card-text">가까운 약국을 찾아보세요.</p>
                    <img src="/images/tablet.png" className="card-img-bottom2" />
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </section>
        <section className="section mt-5" style={{ backgroundColor: "#F9FAFB" }}>
          <div className="container section2-container">
            <h4 className="fw-bold">지금 걸어갈 수 있는 병원</h4>
            <Row>
              <Col>
                {loading ? (
                  <p>로딩 중...</p>
                ) : (
                  <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={numberOfCards}
                    gutter={20}
                  >
                    {hospitals.map((hospital, index) => (
                      <div key={index} className="section2-card">
                        <h5 className="fw-bold">{hospital.dutyName}</h5>
                        <p className="text-muted">{hospital.dutyAddr}</p>
                        <p className="distance">{hospital.distance} km</p>
                      </div>
                    ))}
                  </ItemsCarousel>
                )}
              </Col>
            </Row>
            <h4 className="fw-bold mt-5">지금 걸어갈 수 있는 약국</h4>
            <Row>
              <Col>
                {loading ? (
                  <p>로딩 중...</p>
                ) : (
                  <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={numberOfCards}
                    gutter={20}
                  >
                    {pharmacies.map((pharmacy, index) => (
                      <div key={index} className="section2-card">
                        <h5 className="fw-bold">{pharmacy.dutyName}</h5>
                        <p className="text-muted">{pharmacy.dutyAddr}</p>
                        <p className="distance">{pharmacy.distance} km</p>
                      </div>
                    ))}
                  </ItemsCarousel>
                )}
              </Col>
            </Row>
          </div>
        </section>
        <section className="section">
          <div className="container mt-5 mb-5">
            <Row>
              <Col>
                <div role="button" onClick={handleClickInfo} className="card">
                  <div className="section3-card">
                    <h5 className="section3-card-title">자료실</h5>
                    <p className="section3-card-text">
                      응급 처치 요령
                      <br />
                      감염병 예방
                    </p>
                    <img src="/images/medical.png" className="card-img-bottom2" />
                  </div>
                </div>
              </Col>
              <Col>
                <div role="button" onClick={handleClickHelp} className="card">
                  <div className="section3-card">
                    <h5 className="section3-card-title">고객지원</h5>
                    <p className="section3-card-text">Q&A</p>
                    <img src="/images/health.png" className="card-img-bottom2" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;

