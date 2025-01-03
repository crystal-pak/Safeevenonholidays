import axios from 'axios'

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/favorite`

//특정번호 조회
export const getOne = async(authorId) => {
    const res = await axios.get(`${prefix}/member/${authorId}`)
    return res.data
}

//즐겨찾기 등록
export const postAdd = async(favoriteobj) => {
    const res = await axios.post(`${prefix}/`, favoriteobj)
    return res.data
}

//즐겨찾기 삭제
export const deleteOne = async(favorite) => {
    const res = await axios.delete(`${prefix}/${favorite}`)
    return res.data
}