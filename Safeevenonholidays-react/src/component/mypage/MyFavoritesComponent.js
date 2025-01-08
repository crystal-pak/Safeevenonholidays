import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Spinner } from "react-bootstrap";
import "../../styles/common.css";
import { useSelector } from "react-redux";
import { getOne } from "../../api/favoriteApi";
import FavoriteComponent from "../common/FavoriteComponent";
import { useNavigate } from "react-router-dom";
import { fetchHospitalDetails, fetchPharmacyDetails } from "../../api/publicApi";
import ResponsivePagination from "react-responsive-pagination";

const MyFavoritesComponent = () => {
  const [userFavorites, setUserFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const loginState = useSelector((state) => state.loginSlice)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const itemsPerPage = 8; // 한 페이지에 표시할 항목 수
  
  // 서버에서 즐겨찾기 데이터 가져오기
  const fetchFavorites = async () => {
    if (!loginState || !loginState.id) return;

    setIsLoading(true)
    try {
      const favorites = await getOne(loginState.id); // 사용자 ID로 즐겨찾기 데이터 가져오기

      // 병원 및 약국 상세 정보 추가
      const updatedFavorites = await Promise.all(
        favorites.map(async (favorite) => {
          if (favorite.hospitalId) {
            const hospitalDetails = await fetchHospitalDetails(favorite.hospitalId.hospitalId);
            return { ...favorite, hospitalDetails };
          } else if (favorite.pharmacyId) {
            const pharmacyDetails = await fetchPharmacyDetails(favorite.pharmacyId.pharmacyId);
            return { ...favorite, pharmacyDetails };
          }
          return favorite;
        })
      );

      setUserFavorites(updatedFavorites);
      console.log("Updated Favorites 데이터 확인:", updatedFavorites);
    } catch (error) {
      console.error("즐겨찾기 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [loginState]);

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userFavorites.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(userFavorites.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 상세 페이지 이동 핸들러
  const handleClickDetail = (favorite) => {
    if (favorite.hospitalDetails) {
      navigate(`/hospital/detail/${favorite.hospitalId.hospitalId}`, { state: { item: favorite.hospitalDetails } });
    } else if (favorite.pharmacyDetails) {
      navigate(`/pharmacy/detail/${favorite.pharmacyId.pharmacyId}`, { state: { item: favorite.pharmacyDetails } });
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <p className="title text-center fw-bold">즐겨찾기 목록</p>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) :
        userFavorites.length === 0 ? (
        <p className="text-center mt-4">즐겨찾기 목록이 없습니다.</p>
      ) : (
        <>
        <Row>
        {currentItems.map((favorite) => {
          // 병원 또는 약국 이름 확인
          const hospitalName = favorite.hospitalId?.hospitalName;
          const pharmacyName = favorite.pharmacyId?.pharmacyName;

          // 병원과 약국 이름이 모두 없는 경우 렌더링하지 않음
          if (!hospitalName && !pharmacyName) return null;

          return (
            <Col key={favorite.id} xs={12} sm={6} md={3}>
              <Card className="text-center myfav-card">
                <Card.Body>
                    <div className="d-flex">
                      <Card.Title role='button' onClick={() => handleClickDetail(favorite)} className="myfav-card-title me-2">{hospitalName || pharmacyName}</Card.Title>
                      <FavoriteComponent
                        hospitalId={favorite.hospitalId?.hospitalId}
                        pharmacyId={favorite.pharmacyId?.pharmacyId}
                      />
                    </div>

                    <Card.Text className='myfav-card-content'>{favorite.hospitalDetails?.dutyAddr || favorite.pharmacyDetails?.dutyAddr}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
          })}
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

export default MyFavoritesComponent;
