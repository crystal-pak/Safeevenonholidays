import React from 'react';
import "../styles/main.css";
import { Button, Row } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const loginState = useSelector(state => state.loginSlice)
  const navigate = useNavigate()

  const handleClickModify = () => {
    navigate(`/mypage/modify/${loginState.id}`)
  }

  return (
    <>
      <div className="container mt-4 mb-4">
        <p className='mypage-title'>마이 페이지</p>
        <Row>
          <div className="col-md-6">
            <div className="card section1-card-left">
              <h5 className="card-title p-4">내 프로필</h5>
              <div className="card-body mypage-card-body">
                <img
                  src='/images/user.png'
                  alt='userprofile'
                  className="mypage-card-img"
                />
                <h5 className="mypage-card-title">{loginState.name}</h5>
                <p className="mypage-card-text">{loginState.email}</p>
                <Button variant="primary" className="position-absolute bottom-0 end-0 mb-3 me-3 w-25" onClick={handleClickModify}>수정</Button>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="card mb-2 section1-card-right">
              <div className="card-body">
                <h5 className="card-title">MY 즐겨찾기</h5>
                <p className="card-text">내가 즐겨찾기한 병원 목록을 확인해보세요.</p>
              </div>
            </div>
            <div className="card section1-card-right">
              <div className="card-body">
                <h5 className="card-title">MY 리뷰 관리</h5>
                <p className="card-text">내가 남긴 리뷰 목록을 확인해보세요.</p>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </>
  )
}

export default MyPage;
