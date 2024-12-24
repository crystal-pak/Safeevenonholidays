import jwtAxios from '../util/jwtUtil'

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/info`

//특정번호 조회
export const getOne = async(id) => {
    const res = await jwtAxios.get(`${prefix}/${id}`)
    return res.data
}

//전체 list 조회
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, {params : {page : page, size : size}})
    return res.data
}

//데이터 추가
export const postAdd = async(infoobj) => {
    const res = await jwtAxios.post(`${prefix}/`, infoobj)
    return res.data
}

//수정
export const putOne = async(info) => {
    const res = await jwtAxios.put(`${prefix}/${info.id}`, info)
    return res.data
}

//삭제
export const deleteOne = async(info) => {
    const res = await jwtAxios.delete(`${prefix}/${info}`)
    return res.data
}