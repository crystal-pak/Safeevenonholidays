import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Rating from "@mui/material/Rating";

const HospitalDetailComponent = () => {
  return (
    <>
      <Container className="border border-secodary p-3 overflow-hidden">
        <div className="d-flex">
          <p className="detail-title">성남 소아과</p>
          <p className="detail-subtitle">소아청소년과</p>
        </div>
        <Row className="mb-5">
          <Col>
            <div>
              <img src="/images/map.png" alt="mapImgae" className="fuild" />
            </div>
          </Col>
          <Col>
            <div>
              <p className="mb-0">주소</p>
              <p>경기도 성남시 수정구 산성대로 123-4</p>
            </div>
            <div>
              <p className="mb-0">전화번호</p>
              <p>010-1234-5678</p>
            </div>
            <div>
              <p className="mb-0">진료시간</p>
              <p className="mb-0">월요일 : 09: 00분 ~ 18:00분</p>
              <p className="mb-0">화요일 : 09: 00분 ~ 18:00분</p>
              <p className="mb-0">수요일 : 09: 00분 ~ 18:00분</p>
              <p className="mb-0">목요일 : 09: 00분 ~ 18:00분</p>
              <p className="mb-0">금요일 : 09: 00분 ~ 18:00분</p>
              <p className="mb-0">토요일, 일요일 휴진</p>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={6} className="detail-rev-left">
            <p className="detail-title">후기</p>
          </Col>
          <Col md={6} className="detail-rev-right">
            <p className="mb-0">4.5(3)</p>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center p-4">
          <Card className="text-center myrev-detail-card">
            <Card.Body>
              <div className="myfav-detail-card-header">
                <Card.Title className="myrev-detail-card-title">이기자님의 후기</Card.Title>
              </div>
              <Card.Text className="myrev-detail-card-date">2024.12.31</Card.Text>
              <Card.Text className="myrev-detail-card-content">친절합니다</Card.Text>
              <div className="d-flex justify-content-end">
                <Button className="w-20 myrev-button">수정</Button>
                <Button variant="danger" className="w-20 myrev-button">
                  삭제
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Row>
        <div className="p-3 border">
          <p>후기 남기기</p>
          <Form.Group className="mb-3" controlId="contentForm">
            <Form.Label className="d-none">Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              placeholder="욕설, 비방 글은 예고없이 삭제될 수 있습니다."
              style={{ height: "60vh" }}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary">등록</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HospitalDetailComponent;
