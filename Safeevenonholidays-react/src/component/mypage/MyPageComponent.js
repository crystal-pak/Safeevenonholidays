import React from "react";
import "../../styles/common.css";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyPageComponent = () => {
  const loginState = useSelector((state) => state.loginSlice)
  const navigate = useNavigate()

  const handleClickModify = () => {
    navigate(`/mypage/modify/${loginState.id}`)
  }

  const handleClickFav = () => {
    navigate(`/mypage/myfavorites/${loginState.id}`)
  }

  const handleClickReview = () => {
    navigate(`/mypage/myreviews/${loginState.id}`)
  }

  const handleClickMemberList = () => {
    navigate(`/mypage/member/list`)
  }

  return (
    <>
      <div className="container mt-4 mb-4">
        <Row>
          <Col md={6}>
            <div className="card section1-card-left mb-md-0 mb-3">
              <h5 className="mypage-card-title p-4">내 프로필</h5>
              <div className="card-body mypage-card-body">
                <div>
                  <img src="/images/user.png" alt="userprofile" className="img-fluid" />
                </div>
                <h5 className="mypage-card-title">{loginState.name}</h5>
                <p className="mypage-card-text">{loginState.email}</p>
                <Button
                  variant="primary"
                  className="position-absolute bottom-0 end-0 mb-3 me-3 w-25"
                  onClick={handleClickModify}
                >
                  수정
                </Button>
              </div>
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column">
            <div role="button" onClick={handleClickFav} className="card mb-2 section1-card-right h-100">
              <div className="card-body">
                <h5 className="mypage-card-title">MY 즐겨찾기</h5>
                <p className="mypage-card-text">내가 즐겨찾기한 병원 목록을 확인해보세요.</p>
              </div>
            </div>

            <div role="button" onClick={handleClickReview} className="card section1-card-right h-100">
              <div className="card-body">
                <h5 className="mypage-card-title">MY 리뷰 관리</h5>
                <p className="mypage-card-text">내가 남긴 리뷰 목록을 확인해보세요.</p>
              </div>
            </div>

            {loginState.roleNames.length > 1 ? (
              <div role="button" onClick={handleClickMemberList} className="card mt-2 section1-card-right h-100">
                <div className="card-body">
                  <h5 className="mypage-card-title">회원 목록</h5>
                  <p className="mypage-card-text">관리자 전용 회원 관리 페이지</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MyPageComponent;
