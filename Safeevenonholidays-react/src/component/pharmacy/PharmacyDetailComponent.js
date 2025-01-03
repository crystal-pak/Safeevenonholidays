import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import FavoriteComponent from "../common/FavoriteComponent"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import ReviewComponent from "../common/ReviewComponent";

const PharmacyDetailComponent = ({id, item}) => {
  const position = [
    parseFloat(item.wgs84Lat) || 37.5665, // 위도를 숫자로 변환하고 기본값 설정
    parseFloat(item.wgs84Lon) || 126.978, // 경도를 숫자로 변환하고 기본값 설정
  ];
  
  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41], // 아이콘 크기
    iconAnchor: [12, 41], // 아이콘 기준점
    popupAnchor: [0, -41], // 팝업 위치
  });

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
              <MapContainer
                center={position}
                zoom={15}
                style={{ width: "100%", height: "350px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    {item.dutyName}
                  </Popup>
                </Marker>
              </MapContainer>
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
              <p className="mb-0">월요일 : {item.dutyTime1s} ~ {item.dutyTime1c}</p>
              <p className="mb-0">화요일 : {item.dutyTime2s} ~ {item.dutyTime2c}</p>
              <p className="mb-0">수요일 : {item.dutyTime3s} ~ {item.dutyTime3c}</p>
              <p className="mb-0">목요일 : {item.dutyTime4s} ~ {item.dutyTime4c}</p>
              <p className="mb-0">금요일 : {item.dutyTime5s} ~ {item.dutyTime5c}</p>
              <p className="mb-0">토요일 : {item.dutyTime6s} ~ {item.dutyTime6c}</p>
              <p className="mb-0">일요일 : {item.dutyTime7s} ~ {item.dutyTime7c}</p>
              <p className="mb-0">공휴일 : {item.dutyTime8s} ~ {item.dutyTime8c}</p>
            </div>
          </Col>
        </Row>
  
        <ReviewComponent pharmacyId={id} />
      </Container>
    </>
  )
}

export default PharmacyDetailComponent