import jwtAxios from '../util/jwtUtil'
import { API_SERVER_HOST } from './infoApi'
import axios from 'axios'

//Question Control
const prefix = `${API_SERVER_HOST}/api/question`

//질문 조회
export const getOne = async(id) => {
    const res = await axios.get(`${prefix}/${id}`)
    return res.data
}

//질문 목록 조회
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`, { params: { page, size } });
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


//Answer Control
const host = `${API_SERVER_HOST}/api/answer`

//답변 한개 조회
export const getOneAnswer = async (id) => {
    const res = await axios.get(`${host}/${id}`)
    return res.data
}

// 여러 답변 조회
export const getListAnswers = async (questionId) => {
    const res = await axios.get(`${host}/list/${questionId}`)
    return res.data
}

//답변 등록
export const postAddAnswer = async (questionId, answer) => {
    const res = await jwtAxios.post(`${host}/${questionId}`, answer)
    return res.data
}

//답변 수정
export const putOneAnswer = async(answer) => {
    const res = await jwtAxios.put(`${host}/${answer.id}`, answer)
    return res.data
}

//답변 삭제
export const deleteOnAnswer = async(id) => {
    const res = await jwtAxios.delete(`${host}/${id}`)
    return res.data
}