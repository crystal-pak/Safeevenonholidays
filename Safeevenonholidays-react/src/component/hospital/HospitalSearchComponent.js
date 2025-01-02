import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const HospitalSearchComponent = () => {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [sortedHospitals, setSortedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const { page, size, list, refresh, detail } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  // 시도 데이터
  const cities = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  // 시군구 데이터
  const districts = {
    서울특별시: [
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ],
    부산광역시: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],
    대구광역시: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
    인천광역시: [
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
      "강화군",
      "옹진군",
    ],
    광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
    대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
    울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
    세종특별자치시: ["세종특별자치시"],
    경기도: [
      "수원시",
      "고양시",
      "용인시",
      "성남시",
      "부천시",
      "안산시",
      "남양주시",
      "안양시",
      "화성시",
      "평택시",
      "시흥시",
      "파주시",
      "김포시",
      "광명시",
      "군포시",
      "광주시",
      "이천시",
      "양주시",
      "오산시",
      "구리시",
      "안성시",
      "포천시",
      "여주시",
      "동두천시",
      "과천시",
      "가평군",
      "양평군",
      "연천군",
    ],
    강원도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청북도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "증평군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
    ],
    충청남도: [
      "천안시",
      "공주시",
      "보령시",
      "아산시",
      "서산시",
      "논산시",
      "계룡시",
      "당진시",
      "금산군",
      "부여군",
      "서천군",
      "청양군",
      "홍성군",
      "예산군",
      "태안군",
    ],
    전라북도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
      "신안군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "김천시",
      "안동시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "군위군",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "통영시",
      "사천시",
      "김해시",
      "밀양시",
      "거제시",
      "양산시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군",
    ],
    제주특별자치도: ["제주시", "서귀포시"],
  };

  // 진료과목 데이터
  const departments = [
    { code: "D001", name: "내과" },
    { code: "D002", name: "소아청소년과" },
    { code: "D003", name: "신경과" },
    { code: "D004", name: "정신건강의학과" },
    { code: "D005", name: "피부과" },
    { code: "D006", name: "외과" },
    { code: "D007", name: "흉부외과" },
    { code: "D008", name: "정형외과" },
    { code: "D009", name: "신경외과" },
    { code: "D010", name: "성형외과" },
    { code: "D011", name: "산부인과" },
    { code: "D012", name: "안과" },
    { code: "D013", name: "이비인후과" },
    { code: "D014", name: "비뇨기과" },
    { code: "D016", name: "재활의학과" },
    { code: "D017", name: "마취통증의학과" },
    { code: "D018", name: "영상의학과" },
    { code: "D019", name: "치료방사선과" },
    { code: "D020", name: "임상병리과" },
    { code: "D021", name: "해부병리과" },
    { code: "D022", name: "가정의학과" },
    { code: "D023", name: "핵의학과" },
    { code: "D024", name: "응급의학과" },
    { code: "D026", name: "치과" },
    { code: "D034", name: "구강악안면외과" },
  ];

  // 위치 정보 가져오기
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
        },
        () => {
          alert("위치 정보를 가져올 수 없습니다.");
        },
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // 시도가 변경될 때마다 구 선택 초기화
  useEffect(() => {
    setDistrict("");
  }, [city]);

  // 시군구가 변경될 때마다 진료과목 선택 초기화
  useEffect(() => {
    setDepartmentSearch("");
  }, [district]);

  useEffect(() => {
    if (loading) {
      setHospitals([]); // 로딩 중일 때 병원 목록 초기화
    }
  }, [loading]);

  // 지역별 병원 검색
  const handleSearch = async () => {
    if (!city || !district || !departmentSearch) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }

    setLoading(true);

    setSelectedDepartment(departments.find((dept) => dept.code === departmentSearch)?.name);

    const API_KEY =
      "Xcr9KCUMHCL1McVUfmx1J3+bvAyCQaKXKyzIz6/4ZJce9pDbPGXrq+sLzeEmPooR44q8iedR/yOO9ToRc18Rpw==";
    const url =
      "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire";
    const params = {
      serviceKey: API_KEY,
      Q0: city,
      Q1: district,
      QD: departmentSearch,
      numOfRows: size,
      pageNo: page,
      _type: "json",
    };

    try {
      const response = await axios.get(url, { params });
      if (response.data && response.data.response && response.data.response.body) {
        const apiHospitals = response.data.response.body.items?.item || [];

        // 백엔드에서 반환된 병원 데이터
        const dbResponse = await axios.get("http://localhost:8080/api/hospital/");
        const dbHospitals = dbResponse.data;
        console.log("반환된 정보?", dbHospitals);

        // API 데이터와 DB 데이터 매칭
        const matchedHospitals = apiHospitals.filter((apiHospital) =>
          dbHospitals.some((dbHospital) => dbHospital.hospitalId === apiHospital.hpid),
        );

        setHospitals(matchedHospitals);
        console.log("검색된 병원 정보", matchedHospitals);
      } else {
        alert("병원 정보를 찾을 수 없습니다.");
        setHospitals([]); // 검색 결과가 없으면 목록 초기화
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      alert("병원 정보를 가져오는 데 오류가 발생했습니다.");
      setHospitals([]); // 검색 결과가 없으면 목록 초기화
    } finally {
      setLoading(false);
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // 시간을 "HH:MM" 형식에서 분 단위로 변환하는 함수
  function parseTime(time) {
    if (typeof time !== "string" || time.length !== 4) {
      console.warn("Invalid time format:", time);
      return null;
    }
    const hours = parseInt(time.substring(0, 2), 10); // 시간 부분 (HH)
    const minutes = parseInt(time.substring(2, 4), 10); // 분 부분 (MM)
    return hours * 60 + minutes; // 시간을 분 단위로 변환하여 반환
  }

  useEffect(() => {
    if (hospitals.length > 0 && userLocation) {
      // 병원 목록을 가져온 후 거리 계산 및 정렬
      const hospitalsWithDistance = hospitals.map((item) => {
        const hospitalLat = parseFloat(item.wgs84Lat); // 병원의 위도
        const hospitalLon = parseFloat(item.wgs84Lon); // 병원의 경도

        const distance = haversineDistance(
          userLocation.lat,
          userLocation.lon,
          hospitalLat,
          hospitalLon,
        );

        // startTime과 endTime을 문자열로 변환 후 처리
        const startTime = item.dutyTime1s ? item.dutyTime1s.toString() : null;
        const endTime = item.dutyTime1c ? item.dutyTime1c.toString() : null;

        const start = startTime ? parseTime(startTime) : null;
        const end = endTime ? parseTime(endTime) : null;

        let status = "정보 없음";
        if (start !== null && end !== null) {
          const now = new Date();
          const currentTime = now.getHours() * 60 + now.getMinutes();

          if (currentTime >= start && currentTime < end) {
            status = "진료 중";
          } else {
            status = "진료 마감";
          }
        }

        return { ...item, distance, status }; // 병원 정보에 거리 추가
      });

      // 거리순으로 정렬
      hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

      setSortedHospitals(hospitalsWithDistance); // 정렬된 병원 목록을 별도의 상태로 저장
    } else {
      setSortedHospitals(hospitals); // 사용자의 위치가 없을 경우 기본 목록 유지
    }
  }, [hospitals, userLocation]);

  return (
    <Container className="mt-4 mb-4 p-5" style={{ maxWidth: "700px" }}>
      <Row className="mb-5">
        <h1 className="header">병원 검색</h1>
        <Col>
          <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">시도 선택</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!city}
          >
            <option value="">시군구 선택</option>
            {(districts[city] || []).map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={departmentSearch}
            onChange={(e) => setDepartmentSearch(e.target.value)}
          >
            <option value="">진료과목 선택</option>
            {departments.map((dept) => (
              <option key={dept.code} value={dept.code}>
                {dept.name}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <Button className="search-button" onClick={handleSearch}>
            검색
          </Button>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <p>로딩 중...</p>
        ) : sortedHospitals.length > 0 ? (
          <>
            {sortedHospitals.map((item) => (
              <Card className="text-center search-card">
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div className="search-card-header">
                        <Card.Title className="search-card-title">{item.dutyName}</Card.Title>
                        <Card.Text className="search-card-distanc">⭐</Card.Text>
                        <Card.Text className="search-card-rating">{item.rating}</Card.Text>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Card.Text className="search-card-distanc">
                          {item.distance
                            ? `${item.distance.toFixed(2)} km`
                            : "위치를 찾을 수 없습니다."}
                        </Card.Text>
                        <Card.Text className="search-card-content">
                          {item.dutyAddr.split(" ").slice(0, 2).join(" ")}
                        </Card.Text>
                        <Card.Text className="search-card-content">
                          · {selectedDepartment}
                        </Card.Text>
                      </div>
                    </Col>
                    <Col>
                      <Card.Text className="search-card-status">{item.status}</Card.Text>
                      <Card.Img className="search-card-img" src="/images/heart-love.png" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <p>결과가 없습니다.</p>
        )}
      </Row>
      <PageComponent serverData={serverData} list={list} />
    </Container>
  );
};

export default HospitalSearchComponent;
