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
      <div className="container mypage-box mt-5 mb-5">
        <Row>
          <Col md={6} className="mb-3">
            <div className="card mypage-card-left">
              <h5 className="mypage-card-title p-4">내 프로필</h5>
              <div className="mypage-card-body">
                <div>
                  <img src="/images/user.png" alt="userprofile" className="user-profile" />
                </div>
                <h3 className="mypage-card-name fw-bold mt-2 mt-md-4 my-2">{loginState.name}</h3>
                <h5 className="mypage-card-email">{loginState.email}</h5>
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
          <Col md={6} className="d-flex flex-column mb-3">
            <div role="button" onClick={handleClickFav} className="card mb-2 p-3 h-100">
              <div className="mypage-card-body2">
                <h5 className="mypage-card-title">MY 즐겨찾기</h5>
                <p className="mypage-card-text">내가 즐겨찾기한 병원 목록을 확인해보세요.</p>
                <img src='/images/heart-mypage.png' className='card-img-bottom3' />
              </div>
            </div>

            <div role="button" onClick={handleClickReview} className="card p-3 h-100">
            <div className="mypage-card-body2">
                <h5 className="mypage-card-title">MY 리뷰 관리</h5>
                <p className="mypage-card-text">내가 남긴 리뷰 목록을 확인해보세요.</p>
                <img src='/images/like.png' className='card-img-bottom3' />
              </div>
            </div>

            {loginState.roleNames.length > 1 ? (
              <div role="button" onClick={handleClickMemberList} className="card mt-2 p-3 h-100">
              <div className="mypage-card-body2">
                  <h5 className="mypage-card-title">회원 목록</h5>
                  <p className="mypage-card-text">관리자 전용 회원 관리 페이지</p>
                  <img src='/images/user.png' className='card-img-bottom3' />
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
