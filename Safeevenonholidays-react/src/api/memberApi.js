import axios from "axios"
import { API_SERVER_HOST } from './infoApi'
import jwtAxios from "../util/jwtUtil"

const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam) => {
    
    const header = { Headers : {"Content-Type" : "x-www-form-urlencoded"} }

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const response = await axios.post(`${host}/login`, form, header)

    return response.data
}

export const modifyMember = async (member) => {
    const res = await jwtAxios.put(`${host}/modify`, member)
    return res.data
}

//특정번호 조회
export const getOne = async(id) => {
    const res = await jwtAxios.get(`${host}/${id}`)
    return res.data
}

//전체 list 조회
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${host}/list`, {params : {page : page, size : size}})
    return res.data
}

//회원가입
export const postAdd = async (memberobj) => {
    try {
      const res = await axios.post(`${host}/`, memberobj, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw error;
    }
  };

//수정
export const putOne = async(member) => {
    const res = await jwtAxios.put(`${host}/${member.id}`, member)
    return res.data
}

//삭제
export const deleteOne = async(member) => {
    const res = await jwtAxios.delete(`${host}/${member}`)
    return res.data
}

//아이디 찾기
export const findEmailByName = async(name) => {
  try {
    const res = await axios.get(`${host}/findid`, { params: { name } });
    return res.data;
  } catch (error) {
    console.error("Error fetching member by name:", error.response?.data || error.message);
    throw error;
  }
}