import React, { useState } from 'react'
import { Container, Dropdown, DropdownButton, Form, Row, Col, Button, Pagination, Card } from 'react-bootstrap';

const PharmacySearch = () => {
  const search = [
    { hospital_id: "N004001", name: "성남약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "120m", rating: 4 },
    { hospital_id: "N000087", name: "모란약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "150m", rating: 4.5 },
    { hospital_id: "N000064", name: "성남약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "90m", rating: 2 },
    { hospital_id: "N000025", name: "성남동약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "580m", rating: 5 },
    { hospital_id: "N000085", name: "모란동약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "956m", rating: 4.8 },
    { hospital_id: "N000046", name: "이젠약국", category: "약국", addr: "경기도 성남시 중원구", distanc: "1km", rating: 2.5 },
    { hospital_id: "N000052", name: "아카데미약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "450m", rating: 4.6 },
    { hospital_id: "N000012", name: "리액트약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "460m", rating: 3 },
    { hospital_id: "N000005", name: "성탄절약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "585m", rating: 3.6 },
    { hospital_id: "N000002", name: "한약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "15m", rating: 4.2 }
  ];

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지, 변경 페이지
  const itemsPerPage = 9; // 한 페이지에 표시할 항목 수 9 개

  const indexOfLastItem = currentPage * itemsPerPage; // 인덱스 끝
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 인덱스 시작
  const currentItems = search.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(search.length / itemsPerPage); // 총 페이지 수 계산
  // 한 페이지에 표시할 항목 수를 itemPerPage로 나눈 후 Math.ceil로 올림

  const handlePageChange = (pageNumber) => { // 페이지 번호가 변경될 때 호출
    setCurrentPage(pageNumber); // 새로운 페이지 번호 설정
  };

  return (
    <Container className="mt-4 mb-4 p-5" style={{ maxWidth: '700px' }}>
      <Row className="mb-5">
        <Col className="col-md-9">
          <Form method="POST" action="#">
            <Form.Group>
              <Form.Control
                className="search-input-1 w-100"
                type="text"
                placeholder="지역명, 약국명을 입력하세요."
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <DropdownButton id="dropdown-1" title="시/도" variant="outline-secondary">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</ Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-2" title="시/군/구" variant="outline-secondary">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-3" title="진료과" variant="outline-secondary">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-4" title="운영여부" variant="outline-secondary">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col>
          <Button className='search-button'>검색</Button>
        </Col>
      </Row>
      <Row>
        {currentItems.map((item) => (
          <Card className="text-center search-card">
            <Card.Body>
              <div className="search-card-header">
                <Card.Title className="search-card-title">
                  {item.name}
                </Card.Title>
                <Card.Text className="search-card-distanc">
                  ⭐
                </Card.Text>
                <Card.Text className="search-card-rating">
                  {item.rating}
                </Card.Text>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Card.Text className="search-card-distanc">
                  {item.distanc}
                </Card.Text>
                <Card.Text className="search-card-content">
                  {item.addr}
                </Card.Text>
                <Card.Text className="search-card-content">
                  {item.category}
                </Card.Text>
              </div>

              <Card.Img className="search-card-img" src="/images/heart-love.png" />
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-5">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default PharmacySearch