import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col } from "react-bootstrap"
import Rating from "@mui/material/Rating"
import LinearProgress from "@mui/material/LinearProgress"
import { postAdd, putOne, deleteOne, getReviewsByHospital, getReviewsByPharmacy } from '../../api/reviewApi';
import { useSelector } from 'react-redux';

const ReviewComponent = ({ hospitalId, pharmacyId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 1, content: "" });
  const [editReview, setEditReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const loginState = useSelector((state) => state.loginSlice)

  // 병원 또는 약국 ID에 따라 리뷰 조회
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (hospitalId) {
          // 병원 ID로 리뷰 조회
          const response = await getReviewsByHospital(hospitalId);
          setReviews(response || []);
        } else if (pharmacyId) {
          // 약국 ID로 리뷰 조회
          const response = await getReviewsByPharmacy(pharmacyId);
          setReviews(response || []);
        }
      } catch (error) {
        console.error("리뷰를 가져오는 중 오류 발생:", error);
      }
    }
    console.log("review", reviews)
    fetchReviews();
  }, [hospitalId, pharmacyId])

// 평균 평점 계산
const averageRating =
reviews.length > 0
  ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  : 0;

// 평점 분포 계산
const ratingCounts = [5, 4, 3, 2, 1].map(
(rating) => reviews.filter((review) => review.rating === rating).length
);

  // 리뷰 추가
  const handleAddReview = async () => {
    // 로그인 상태 확인
    if (!loginState || !loginState.id) {
      alert("로그인이 필요한 서비스입니다.");
      return <div>로그인이 필요합니다.</div>;
    }
     // 리뷰 내용 유효성 검사
    if (!newReview.content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    try {
      const reviewObj = {
        ...newReview,
        hospitalId: hospitalId ? { hospitalId: hospitalId } : null,
        pharmacyId: pharmacyId ? { pharmacyId: pharmacyId } : null,
      };
      await postAdd(reviewObj); // 리뷰 추가 API 호출
      setNewReview({ rating: 1, content: "" });
      setShowModal(false);
      window.location.reload(); // 새로고침으로 업데이트
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error);
    }
  }

  // 리뷰 수정
  const handleEditReview = async () => {
    try {
      await putOne(editReview); // 리뷰 수정 API 호출
      setEditReview(null);
      window.location.reload(); // 새로고침으로 업데이트
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생:", error);
    }
  }

  // 리뷰 삭제
  const handleDeleteReview = async (id) => {
    try {
      await deleteOne(id); // 리뷰 삭제 API 호출
      window.location.reload(); // 새로고침으로 업데이트
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div>
      {/* 평점 요약 섹션 */}
      <Row className='mb-5'>
        <h4 className="fw-bold">후기</h4>
        <Col lg={9} md={8} sm={7} className='d-none d-sm-block'>
          {ratingCounts.map((count, index) => (
            <div key={index} className="d-flex align-items-center mt-2">
              <span>{5 - index}점</span>
              <LinearProgress
                variant="determinate"
                value={(count / reviews.length) * 100}
                className="mx-2 flex-grow-1"
                style={{ height: "8px", borderRadius: "4px" }}
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FFD700", // 진행 바 색상
                  },
                  backgroundColor: "#E0E0E0", // 전체 배경 색상
                }}
              />
              <span>{count}</span>
            </div>
          ))}
        </Col>
        { isMobile ? (
          <Col className=''>
          <div className='mx-auto d-flex justify-content-center align-items-center'>
            <div className="d-flex align-items-center">
              <Rating value={averageRating} readOnly precision={0.1} sx={{
                  fontSize: {
                    xs: '60px' // 작은 화면 (mobile)
                  },
                }} /> 
            </div>
            <h1 className="ms-3 fw-bold text-center mb-0" style={{fontSize : "40px"}}>{averageRating.toFixed(1)} ({reviews.length})</h1>
            
          </div>
          </Col>
        )
        :
        (
          <Col className='d-flex flex-column justify-content-center'>
          <div className='mx-auto'>
            <h1 className="ms-2 fw-bold text-center">{averageRating.toFixed(1)} ({reviews.length})</h1>
            <div className="d-flex align-items-center">
              <Rating value={averageRating} readOnly precision={0.1} sx={{
                  fontSize: {
                    xs: '30px', // 작은 화면 (mobile)
                    sm: '30px', // 중간 화면 (tablet)
                    md: '40px', // 큰 화면 (desktop)
                  },
                }} /> 
            </div>
          </div>
          </Col>
        )}
      </Row>

      {/* 리뷰 리스트 */}
      {reviews.map((review) => (
        <div key={review.id} className="border p-3 mb-3 rounded">
            <div className='d-flex justify-content-between'>
              <div>
                <span className='fw-bold' style={{color: "#0052CC"}}>{review.author.name}</span>
                <span className='fw-bold'>님의 후기</span>
                <span className='text-muted ms-2' style={{fontSize: 14}}>{review.createDate}</span>
              </div>
              <Rating value={review.rating} readOnly size="small" />
            </div>

            <div className='mt-3'>
              <p>{review.content}</p>
              {loginState.email == review.author.email ? 
                  <div className='text-end'>
                  <Button variant="primary" className="me-2" onClick={() => setEditReview(review)}>
                    수정
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                    삭제
                  </Button>
                </div>
              :
                <></>
              }            
            </div>
        </div>
      ))}

      {/* 리뷰 작성 섹션 */}
      <div className="border p-3 rounded mt-4">
        <div className='d-flex mb-2'>
          <h5 className='fw-bold me-2'>후기 남기기</h5>
          <Rating
            value={newReview.rating}
            onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
          />
        </div>
        
        <textarea
          className="form-control mb-3"
          rows={5}
          placeholder="욕설, 비방 글은 예고 없이 삭제될 수 있습니다."
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
        ></textarea>
        <div className='text-end'>
          <Button className="mt-3" onClick={handleAddReview}>
            등록
          </Button>
        </div>    
      </div>

      {/* 리뷰 수정 모달 */}
      {editReview && (
        <Modal show={true} onHide={() => setEditReview(null)}>
          <Modal.Header closeButton>
            <Modal.Title>리뷰 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Rating
              value={editReview.rating}
              onChange={(e, newValue) =>
                setEditReview({ ...editReview, rating: newValue })
              }
            />
            <textarea
              className="form-control my-3"
              rows={3}
              value={editReview.content}
              onChange={(e) =>
                setEditReview({ ...editReview, content: e.target.value })
              }
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditReview(null)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleEditReview}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </>
  )
}

export default ReviewComponent