import axios from 'axios';
import { API_SERVER_HOST } from './infoApi';

const API_KEY = 'Xcr9KCUMHCL1McVUfmx1J3+bvAyCQaKXKyzIz6/4ZJce9pDbPGXrq+sLzeEmPooR44q8iedR/yOO9ToRc18Rpw=='

const BASE_URL = 'https://apis.data.go.kr/B552657/HsptlAsembySearchService'

const host = `${API_SERVER_HOST}/api/hospital`

// 전체 DB 조회
export const dbResponse = async() => {
  const res = await axios.get(`${host}/`)
  return res.data
} 

//전체 list 조회
export const getList = async(pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${host}/list`, {params : {page : page, size : size}})
    return res.data
}