import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Spinner } from "react-bootstrap";
import "../../styles/common.css";
import { deleteOne, getOne } from "../../api/reviewApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHospitalDetails, fetchPharmacyDetails } from "../../api/publicApi";
import ResponsivePagination from "react-responsive-pagination";

const MyReviewsComponent = () => {
  const [userReviews, setUserReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const loginState = useSelector((state) => state.loginSlice)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수
  const paginationRange = 10; // 한 번에 표시할 페이지 번호 범위

  const fetchReviews = async () => {
    if (!loginState || !loginState.id) return;
    
    setIsLoading(true)
    try {
      const reviews = await getOne(loginState.id);
  
      // 병원 및 약국 상세 정보를 캐싱할 객체 생성
      const hospitalDetailsCache = {};
      const pharmacyDetailsCache = {};
  
      // 병원 및 약국 상세 정보 추가
      const updatedReviews = await Promise.all(
        reviews.map(async (review) => {
          // 병원 정보 처리
          if (review.hospitalId) {
            // 병원 ID가 객체인지 확인하고, 객체라면 ID 추출
            const hospitalId =
              typeof review.hospitalId === "object"
                ? review.hospitalId.hospitalId
                : review.hospitalId;
  
            // 캐시에 병원 정보가 없으면 API 호출
            if (!hospitalDetailsCache[hospitalId]) {
              const hospitalDetails = await fetchHospitalDetails(hospitalId);
              hospitalDetailsCache[hospitalId] = hospitalDetails;
            }
  
            // 캐싱된 병원 정보를 모든 리뷰에 적용
            return {
              ...review,
              hospitalDetails: hospitalDetailsCache[hospitalId],
              displayName:
                hospitalDetailsCache[hospitalId]?.dutyName ||
                (typeof review.hospitalId === "object" && review.hospitalId.hospitalName) ||
                "기관 이름 없음",
              hospitalId: { // 항상 객체 형태로 유지
                hospitalId,
                hospitalName:
                  hospitalDetailsCache[hospitalId]?.dutyName ||
                  (typeof review.hospitalId === "object" && review.hospitalId.hospitalName) ||
                  "기관 이름 없음",
              },
            };
          }
  
          // 약국 정보 처리
          if (review.pharmacyId) {
            // 약국 ID가 객체인지 확인하고, 객체라면 ID 추출
            const pharmacyId =
              typeof review.pharmacyId === "object"
                ? review.pharmacyId.pharmacyId
                : review.pharmacyId;
  
            // 캐시에 약국 정보가 없으면 API 호출
            if (!pharmacyDetailsCache[pharmacyId]) {
              const pharmacyDetails = await fetchPharmacyDetails(pharmacyId);
              pharmacyDetailsCache[pharmacyId] = pharmacyDetails;
            }
  
            // 캐싱된 약국 정보를 모든 리뷰에 적용
            return {
              ...review,
              pharmacyDetails: pharmacyDetailsCache[pharmacyId],
              displayName:
                pharmacyDetailsCache[pharmacyId]?.dutyName ||
                (typeof review.pharmacyId === "object" && review.pharmacyId.pharmacyName) ||
                "기관 이름 없음",
              pharmacyId: { // 항상 객체 형태로 유지
                pharmacyId,
                pharmacyName:
                  pharmacyDetailsCache[pharmacyId]?.dutyName ||
                  (typeof review.pharmacyId === "object" && review.pharmacyId.pharmacyName) ||
                  "기관 이름 없음",
              },
            };
          }
  
          // 병원/약국 ID가 없는 경우 기본값 설정
          return { ...review, displayName: "기관 이름 없음" };
        })
      );
  
      setUserReviews(updatedReviews);
      console.log("Updated Reviews 데이터 확인:", updatedReviews);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false)
    }
  };  
  
  useEffect(() => {
    fetchReviews();
  }, [loginState]);

  //// 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userReviews.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(userReviews.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  // 상세 페이지 이동 핸들러
  const handleClickDetail = (review) => {
    if (review.hospitalDetails) {
      navigate(`/hospital/detail/${review.hospitalId.hospitalId}`, { state: { item: review.hospitalDetails } });
    } else if (review.pharmacyDetails) {
      navigate(`/pharmacy/detail/${review.pharmacyId.pharmacyId}`, { state: { item: review.pharmacyDetails } });
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5">
      <p className="title text-center fw-bold">작성 리뷰 목록</p>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : userReviews.length === 0 ? (
          <p className="text-center">작성한 리뷰가 없습니다.</p>
        ) : (
          <>
            <Row className="d-flex justify-content-center mt-5">
              {currentItems.map((item) => (
                <Card className="text-center myrev-card">
                  <Card.Body className="d-flex justify-content-between">
                    <div className="me-5" style={{ width: "100%" }}>
                      <div className="d-md-flex align-items-center">
                        <Card.Title
                          role="button"
                          onClick={() => handleClickDetail(item)}
                          className="myrev-card-title me-2"
                        >
                          <span style={{ color: "#0052CC" }}>
                            {item.hospitalDetails?.dutyName || item.pharmacyDetails?.dutyName || "기관 이름 없음"}
                          </span>
                          에 남긴 후기
                        </Card.Title>
                        <Card.Text className="myrev-card-date">{item.createDate}</Card.Text>
                      </div>
                      <Card.Text className="myrev-card-content">{item.content}</Card.Text>
                    </div>

                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <Card.Text className="fw-bold">{item.rating}.0점</Card.Text>
                      <Button variant="danger" onClick={() => handleClickDelete(item.id)} className="text-nowrap">
                        삭제
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Row>

        {/* 페이지네이션 */}
        <div className='mt-3'>
          <ResponsivePagination
            current={currentPage} // 현재 페이지 번호
            total={totalPages} // 전체 페이지 수
            onPageChange={handlePageChange} // 페이지 변경 핸들러
          />
        </div>
        </>
      )}
      </Container>
    </>
  );
};

export default MyReviewsComponent;
