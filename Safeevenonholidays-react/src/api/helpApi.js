import jwtAxios from '../util/jwtUtil'
import { API_SERVER_HOST } from './infoApi'

/* Answer */
//Question Controll
const prefix = `${API_SERVER_HOST}/api/question`

//질문 조회
export const getOne = async(id) => {
    const res = await jwtAxios.get(`${prefix}/${id}`)
    return res.data
}

//질문 목록 조회
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });
    console.log(res.data); 
    return res.data
}

//질문 추가
export const postAdd = async(question) => {
    const res = await jwtAxios.post(`${prefix}/`, question)
    return res.data
}

//질문 수정
export const putOne = async(question) => {
    const res = await jwtAxios.put(`${prefix}/${question.id}`, question)
    return res.data
}

//질문 삭제
export const deleteOne = async(id) => {
    const res = await jwtAxios.delete(`${prefix}/${id}`)
    return res.data
}

/* Answer */
//Answer Controll
const host = `${API_SERVER_HOST}/api/answer`

//답변 조회
export const getAnswerOne = async(id) => {
    const res = await jwtAxios.get(`${host}/${id}`)
    return res.data
}