/* global kakao */
import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FavoriteComponent from "../common/FavoriteComponent"
import ReviewComponent from "../common/ReviewComponent";

const PharmacyDetailComponent = ({id, item}) => {
  const mapRef = useRef(null);

  // 위도와 경도를 숫자로 변환하고 기본값 설정
  const position = [
    parseFloat(item.wgs84Lat) || 37.5665, // 서울의 기본 위도
    parseFloat(item.wgs84Lon) || 126.978, // 서울의 기본 경도
  ];

  // 카카오 지도 SDK를 동적으로 로드하는 함수
  const loadKakaoMap = () => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve(window.kakao.maps); // 이미 로드된 경우 바로 반환
      } else {
        const script = document.createElement("script");
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=f7ad62ab6fae8e97fa02ac3ae1f34e40&libraries=services&autoload=false";
        script.async = true;
        script.onload = () => kakao.maps.load(() => resolve(kakao.maps));
        script.onerror = () => reject(new Error("카카오 지도 API 로드 실패"));
        document.head.appendChild(script);
      }
    });
  };

  // 지도 초기화
  useEffect(() => {
    loadKakaoMap().then((kakaoMaps) => {
      if (mapRef.current) {
        const mapContainer = mapRef.current; // 지도 표시할 div
        const mapOptions = {
          center: new kakaoMaps.LatLng(position[0], position[1]), // 중심 좌표
          level: 3, // 확대 레벨
        };

        // 지도 생성
        const map = new kakaoMaps.Map(mapContainer, mapOptions);

        // 마커 생성
        const marker = new kakaoMaps.Marker({
          position: new kakaoMaps.LatLng(position[0], position[1]),
        });
        marker.setMap(map);

        // 정보창 생성 및 표시
        const infowindow = new kakaoMaps.InfoWindow({
          content: `<div style="padding:5px;">${item.dutyName}</div>`,
        });
        infowindow.open(map, marker);
      }
    });
  }, [position, item.dutyName]); // 의존성 배열에 위치와 약국 이름 추가

  useEffect(() => {
    // 상세 페이지에 진입할 때 스크롤 초기화
    window.scrollTo(0, 0);
  }, []);

  // 시간을 숫자로 변환하는 함수
const convertToNumber = (time) => {
  if (!time || isNaN(time)) return null; // 유효하지 않은 데이터 처리
  return parseInt(time, 10); // 문자열을 정수로 변환
};

// 시간을 "HH:MM" 형식으로 변환하는 함수
const formatTime = (time) => {
  const numericTime = convertToNumber(time); // 숫자로 변환
  if (!numericTime) return "정보 없음"; // 변환 실패 시 처리
  const hours = String(Math.floor(numericTime / 100)).padStart(2, "0"); // 시 계산
  const minutes = String(numericTime % 100).padStart(2, "0"); // 분 계산
  return `${hours}:${minutes}`;
};

  return (
    <>
      <Container className="border border-secodary p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0">{item.dutyName}</h4>
          <div className="d-flex">
            <p className="me-2">즐겨찾기</p>
            <FavoriteComponent pharmacyId={id} />
          </div>
        </div>
        <Row className="my-3 border-bottom">
          <Col lg={6} className='mb-3'>
            <div
              ref={mapRef}
              style={{ width: "100%", height: "350px", borderRadius: "8px" }}
            ></div>
          </Col>
          <Col lg={6}>
            <div>
              <p className="mb-0 fw-bold">주소</p>
              <p>{item.dutyAddr}</p>
            </div>
            <div>
              <p className="mb-0 fw-bold">전화번호</p>
              <p>{item.dutyTel1}</p>
            </div>
            <div className='mb-4'>
              <p className="mb-0 fw-bold">진료시간</p>
              <p className="mb-0">월요일 : {formatTime(item.dutyTime1s)} ~ {formatTime(item.dutyTime1c)}</p>
              <p className="mb-0">화요일 : {formatTime(item.dutyTime2s)} ~ {formatTime(item.dutyTime2c)}</p>
              <p className="mb-0">수요일 : {formatTime(item.dutyTime3s)} ~ {formatTime(item.dutyTime3c)}</p>
              <p className="mb-0">목요일 : {formatTime(item.dutyTime4s)} ~ {formatTime(item.dutyTime4c)}</p>
              <p className="mb-0">금요일 : {formatTime(item.dutyTime5s)} ~ {formatTime(item.dutyTime5c)}</p>
              <p className="mb-0">토요일 : {formatTime(item.dutyTime6s)} ~ {formatTime(item.dutyTime6c)}</p>
              <p className="mb-0">일요일 : {formatTime(item.dutyTime7s)} ~ {formatTime(item.dutyTime7c)}</p>
              <p className="mb-0">공휴일 : {formatTime(item.dutyTime8s)} ~ {formatTime(item.dutyTime8c)}</p>
            </div>
          </Col>
        </Row>
  
        <ReviewComponent pharmacyId={id} />
      </Container>
    </>
  )
}

export default PharmacyDetailComponent