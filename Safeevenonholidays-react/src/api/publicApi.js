import axios from "axios";

const API_KEY = "Xcr9KCUMHCL1McVUfmx1J3+bvAyCQaKXKyzIz6/4ZJce9pDbPGXrq+sLzeEmPooR44q8iedR/yOO9ToRc18Rpw=="; // 공공데이터포털에서 발급받은 API 키

// 병원 정보 가져오기
export const fetchHospitalDetails = async (hospitalId) => {
  const url = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
  const params = {
    serviceKey: API_KEY,
    HPID: hospitalId,
    _type: "json",
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.response.body.items.item) {
      return response.data.response.body.items.item; // 병원 상세 정보 반환
    }
    return null;
  } catch (error) {
    console.error("병원 정보를 가져오는 중 오류 발생:", error);
    return null;
  }
};

// 약국 정보 가져오기
export const fetchPharmacyDetails = async (pharmacyId) => {
  const url = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire";
  const params = {
    serviceKey: API_KEY,
    HPID: pharmacyId,
    _type: "json",
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.response.body.items.item) {
      return response.data.response.body.items.item; // 약국 상세 정보 반환
    }
    return null;
  } catch (error) {
    console.error("약국 정보를 가져오는 중 오류 발생:", error);
    return null;
  }
};
