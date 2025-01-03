import jwtAxios from '../util/jwtUtil'
import axios from 'axios'

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/review`

//특정번호 조회
export const getOne = async(id) => {
    const res = await axios.get(`${prefix}/${id}`)
    return res.data
}

// 병원 ID로 리뷰 조회
export const getReviewsByHospital = async (hospitalId) => {
    const res = await axios.get(`${prefix}/hospital/${hospitalId}`)
    return res.data;
}

// 약국 ID로 리뷰 조회
export const getReviewsByPharmacy = async (pharmacyId) => {
    const res = await axios.get(`${prefix}/pharmacy/${pharmacyId}`)
    return res.data;
}

//데이터 추가
export const postAdd = async(reviewobj) => {
    const res = await jwtAxios.post(`${prefix}/`, reviewobj)
    return res.data
}

//수정
export const putOne = async(review) => {
    const res = await jwtAxios.put(`${prefix}/${review.id}`, review)
    return res.data
}

//삭제
export const deleteOne = async(review) => {
    const res = await jwtAxios.delete(`${prefix}/${review}`)
    return res.data
}