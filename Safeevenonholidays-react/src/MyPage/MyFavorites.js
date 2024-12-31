import React, { useState } from 'react';
import { Card, Row, Col, Pagination, Container } from 'react-bootstrap';
import "../styles/common.css";

const MyFavorites = () => {
    const favorite = [
        { id: 1, name: "성남약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "120m" },
        { id: 2, name: "모란약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "150m" },
        { id: 3, name: "성남한의원", category: "한의원", addr: "경기도 성남시 수정구", distanc: "90m" },
        { id: 4, name: "성남동피부과", category: "피부과", addr: "경기도 성남시 수정구", distanc: "580m" },
        { id: 5, name: "모란동약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "956m" },
        { id: 6, name: "이젠이비인후과", category: "이비인후과", addr: "경기도 성남시 중원구", distanc: "1km" },
        { id: 7, name: "아카데미병원", category: "상급병원", addr: "경기도 성남시 수정구", distanc: "450m" },
        { id: 8, name: "리액트약국", category: "약국", addr: "경기도 성남시 수정구", distanc: "460m" },
        { id: 9, name: "성탄절병원", category: "내과", addr: "경기도 성남시 수정구", distanc: "585m" },
        { id: 10, name: "한의원", category: "병원", addr: "경기도 성남시 수정구", distanc: "15m" },
        { id: 11, name: "서울약국", category: "약국", addr: "서울시 강남구", distanc: "5.8km" },
        { id: 12, name: "가락병원", category: "병원", addr: "서울시 송파구", distanc: "4.2km" },
        { id: 13, name: "청담한의원", category: "한의원", addr: "서울시 강남구", distanc: "5km" },
        { id: 14, name: "강남피부과", category: "피부과", addr: "서울시 강남구", distanc: "4.9km" },
    ];

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지, 변경 페이지
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수 8개

    const indexOfLastItem = currentPage * itemsPerPage; // 인덱스 끝
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 인덱스 시작
    const currentItems = favorite.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(favorite.length / itemsPerPage); // 총 페이지 수 계산
    // 한 페이지에 표시할 항목 수를 itemPerPage로 나눈 후 Math.ceil로 올림

    const handlePageChange = (pageNumber) => { // 페이지 번호가 변경될 때 호출
        setCurrentPage(pageNumber); // 새로운 페이지 번호 설정
    };

    return (
        <>
            <Container className='mt-4 mb-4'>
                <p className='mypage-title'>즐겨찾기 목록</p>
                <Row>
                    {currentItems.map((item) => (
                        <Col key={item.id} xs={12} sm={6} md={3}>
                            <Card className="text-center myfav-card">
                                <Card.Body>
                                    <div className="myfav-card-header">
                                        <Card.Title className="myfav-card-title">{item.name}</Card.Title>
                                        <Card.Img className="myfav-card-img" src="/images/heart-love.png" />
                                    </div>
                                    <Card.Text className="myfav-card-content">{item.addr}</Card.Text>
                                    <Card.Text className="myfav-card-content">{item.category}</Card.Text>
                                    <Card.Text className="myfav-card-distanc">{item.distanc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
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
        </>
    );
}

export default MyFavorites;
