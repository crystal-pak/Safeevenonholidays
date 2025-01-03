import React, { useState, useEffect } from "react";
import { deleteOne, postAdd, getOne } from "../../api/favoriteApi"; // 즐겨찾기 API 추가
import { useSelector } from "react-redux";

const FavoriteComponent = ({ hospitalId, pharmacyId }) => {
  const [isFavorite, setIsFavorite] = useState(false) // 즐겨찾기 상태
  const [favoriteId, setFavoriteId] = useState(null) // 즐겨찾기의 고유 ID
  const [userFavorites, setUserFavorites] = useState([])
  const loginState = useSelector((state) => state.loginSlice)

  // 서버에서 즐겨찾기 데이터 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!loginState || !loginState.id) return;

      try {
        const favorites = await getOne(loginState.id) // 사용자 ID로 즐겨찾기 데이터 가져오기
        setUserFavorites(favorites)
        console.log("Favorites 데이터 확인:", favorites)

        // 현재 병원 또는 약국이 즐겨찾기에 있는지 확인
        const existingFavorite = favorites.find((fav) => {
            // 병원 ID 또는 약국 ID가 일치하는지 확인
            if (hospitalId && fav.hospitalId?.hospitalId === hospitalId) {
              return true;
            }
            if (pharmacyId && fav.pharmacyId?.pharmacyId === pharmacyId) {
              return true;
            }
            return false;
          });

        if (existingFavorite) {
          setIsFavorite(true);
          setFavoriteId(existingFavorite.id); // 즐겨찾기의 고유 ID 설정
        }
      } catch (error) {
        console.error("즐겨찾기 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchFavorites();
  }, [hospitalId, pharmacyId, loginState]);

  useEffect(() => {
    // 병원 ID나 약국 ID가 변경될 때 상태 초기화
    setIsFavorite(false);
    setFavoriteId(null);
  }, [hospitalId, pharmacyId]);

  const handleFavoriteClick = async () => {
    // 로그인 상태 확인
    if (!loginState || !loginState.id) {
        alert("로그인이 필요한 서비스입니다.");
        return <div>로그인이 필요합니다.</div>;
    }

    try {
      if (isFavorite) {
        // 즐겨찾기가 이미 되어 있다면 삭제 요청
        if (!favoriteId) {
          alert("삭제할 즐겨찾기 ID가 필요합니다.");
          return;
        }
        const response = await deleteOne(favoriteId); // favorite의 id를 사용해 삭제 요청
        console.log("삭제 응답:", response);
        setIsFavorite(false); // 즐겨찾기 상태 해제
        setFavoriteId(null); // favoriteId 초기화
        alert("즐겨찾기에서 삭제되었습니다!");
      } else {
        // 즐겨찾기가 안 되어 있다면 추가 요청
        const favoriteData = {
          author: { id: loginState.id }, // 사용자 ID
          hospitalId: hospitalId ? { hospitalId: hospitalId } : null, // 병원 ID (존재하면 포함)
          pharmacyId: pharmacyId ? { pharmacyId: pharmacyId } : null, // 약국 ID (존재하면 포함)
          favorite: true, // 즐겨찾기 상태
        };

        const response = await postAdd(favoriteData)
        console.log("추가 응답:", response)

        if (response.id) {
          setIsFavorite(true); // 즐겨찾기 상태 업데이트
          setFavoriteId(response.id); // 새로 생성된 favorite의 ID 설정
          alert("즐겨찾기에 추가되었습니다!");
        } else {
          alert("즐겨찾기 추가 실패: 서버에서 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      console.error("즐겨찾기 처리 중 오류:", error);
      alert("즐겨찾기 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div role='button' onClick={handleFavoriteClick} style={{ background: "none", border: "none", padding: 0 }}>
      <img
        src={isFavorite ? "/images/heart.png" : "/images/heart-outline.png"}
        alt={isFavorite ? "즐겨찾기 완료" : "즐겨찾기"}
        style={{ width: "24px", height: "24px" }}
      />
    </div>
  );
};

export default FavoriteComponent;
