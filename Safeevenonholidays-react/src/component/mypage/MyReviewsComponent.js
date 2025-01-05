import React, { useEffect, useState } from "react";
import { Button, Card, Container, Pagination, Row } from "react-bootstrap";
import "../../styles/common.css";
import { deleteOne, getOne } from "../../api/reviewApi";
import { useSelector } from "react-redux";

const MyReviewsComponent = () => {
  const [userReviews, setUserReviews] = useState([])
  const loginState = useSelector((state) => state.loginSlice)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수
  const paginationRange = 10; // 한 번에 표시할 페이지 번호 범위

  // 서버에서 리뷰 데이터 가져오기
  const fetchReviews = async () => {
    if (!loginState || !loginState.id) return;

    try {
      const reviews = await getOne(loginState.id);

      // 리뷰 데이터와 병원/약국 데이터를 매핑하여 이름 추가
      const updatedReviews = reviews.map((review) => {
        const hospitalName = review.hospitalId?.hospitalName || null;
        const pharmacyName = review.pharmacyId?.pharmacyName || null;

        return {
          ...review,
          displayName: hospitalName || pharmacyName || "기관 이름 없음",
        };
      });

      setUserReviews(updatedReviews);
      console.log("Updated Reviews:", updatedReviews);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [loginState]);

  /// 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userReviews.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(userReviews.length / itemsPerPage);

  // 페이지네이션 범위 계산
  const startPage = Math.floor((currentPage - 1) / paginationRange) * paginationRange + 1;
  const endPage = Math.min(startPage + paginationRange - 1, totalPages);

  // 이전 및 다음 버튼 활성화 여부
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // 리뷰 삭제 핸들러
  const handleClickDelete = async (id) => {
    try {
      await deleteOne(id);
      alert("삭제가 완료되었습니다.");
      fetchReviews(); // 리뷰 목록 갱신
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Container className="mt-4 mb-4">
        <p className="title">작성 리뷰 목록</p>
        {userReviews.length === 0 ? (
            <p className="text-center">작성한 리뷰가 없습니다.</p>
          ) : (
            <>
        <Row className="d-flex justify-content-center mt-5">
          {currentItems.map((item) => (
            <Card className="text-center myrev-card">
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className="d-flex align-items-center">
                    <Card.Title className="myrev-card-title me-2"><span style={{color: "#0052CC"}}>{item.displayName}</span>에 남긴 후기</Card.Title>
                    <Card.Text className="myrev-card-date">{item.createDate}</Card.Text>
                  </div>
                  
                <Card.Text className='fw-bold'>{item.rating}.0점</Card.Text>
                </div>
                
                
                <div className="d-flex justify-content-between mt-3">
                  <Card.Text className="myrev-card-content">{item.content}</Card.Text>
                  <Button variant="danger" onClick={() => handleClickDelete(item.id)}>
                    삭제
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Row>

        {/* 페이지네이션 */}
        <Pagination className="justify-content-center mt-4">
          {/* 이전 버튼 */}
          <Pagination.Prev disabled={isPrevDisabled} onClick={() => handlePageChange(currentPage - 1)} />

          {/* 현재 범위의 페이지 번호 */}
          {[...Array(endPage - startPage + 1).keys()].map((page) => (
            <Pagination.Item
              key={startPage + page}
              active={startPage + page === currentPage}
              onClick={() => handlePageChange(startPage + page)}
            >
              {startPage + page}
            </Pagination.Item>
          ))}

          {/* 다음 버튼 */}
          <Pagination.Next disabled={isNextDisabled} onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
        </>
          )}
      </Container>
    </>
  );
};

export default MyReviewsComponent;
