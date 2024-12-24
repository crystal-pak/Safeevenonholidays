import React, { useState } from 'react'
import { Card, Container, Pagination, Row } from 'react-bootstrap'

const MyReviews = () => {
    const reivews = [
        { id: 1, username: "김기자", date: "2024-12-09", content: "일찍 문을 닫아서 아쉬워요." },
        { id: 2, username: "김기자", date: "2024-12-08", content: "불친절합니다.." },
        { id: 3, username: "김기자", date: "2024-12-05", content: "가격이 너무 비싸요" },
        { id: 4, username: "김기자", date: "2024-12-01", content: "대기가 없어서 좋아요." },
    ];

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지, 변경 페이지
    const itemsPerPage = 3; // 한 페이지에 표시할 항목 수 3개

    const indexOfLastItem = currentPage * itemsPerPage; // 인덱스 끝
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 인덱스 시작
    const currentItems = reivews.slice(indexOfFirstItem, indexOfLastItem); // Slice를 이 후에 해야 함

    const totalPages = Math.ceil(reivews.length / itemsPerPage); // 총 페이지 수 계산

    const handlePageChange = (pageNumber) => { // 페이지 번호가 변경될 때 호출
        setCurrentPage(pageNumber); // 새로운 페이지 번호 설정
    };

    return (
        <>
            <Container className='mt-4 mb-4'>
                <p className='mypage-title'>마이 페이지</p>
                <Row>
                    {currentItems.map((item) => (
                        <Card className="text-center myfav-card">
                            <Card.Body>
                                <div className="myfav-card-header">
                                    <Card.Title className="myrev-card-title">{item.username}님의 후기</Card.Title>
                                </div>
                                <Card.Text className="myrev-card-content">{item.date}</Card.Text>
                                <Card.Text className="myrev-card-content">{item.content}</Card.Text>
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
        </>
    );
};

export default MyReviews;
