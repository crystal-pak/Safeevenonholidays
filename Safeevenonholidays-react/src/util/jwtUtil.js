import axios from 'axios'
import { getCookie, setCookie } from './cookieUtil'
import { API_SERVER_HOST } from './../api/infoApi'

const jwtAxios = axios.create()

const refreshJWT = async(accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = { headers: { "Authorization" : `Bearer ${accessToken}` } }

    //refreshToken을 쿼리로 붙여서 보낸다.
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    return res.data
}

//요청 beforeReq(), requestFail() / 응답beforeRes(), responseFail()

//before request
const beforeReq = (config) => {
    console.log("before request.....")
    const memberInfo = getCookie("member")
    if(!memberInfo) {
        console.log("member not found")
        return Promise.reject({
            response : {
                data : {
                    error : "REQUIRE_LOGIN"
                }
            }
        })
    }
    const { accessToken } = memberInfo
    //Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

//fail request
const requestFail = (err) => {
    console.log("request error.....")
    return Promise.reject(err)
}

//before response
const beforeRes = async (res) => {
    console.log("before response.....")
    const data = res.data
    if(data && data.error === 'ERROR_ACCESS_TOKEN') {
        //AccessToken이 만료되었음을 의미
        //쿠키에서 사용자의 인증 정보를 가져온다
        //이 쿠키에는 이미 accessToken(만료된 토큰)과 refreshToken(토큰 갱신용)이 포함되어 있음

        const memberCookieValue = getCookie("member")
        //memberCookieValue안에 이미 accessToken과 refreshToken이 있다.
        //refreshJWT()를 호출하여 새로 발급된 accessToken과 refreshToken을 반환
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)

        //갱신된 토큰으로 쿠키업데이트
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        //갱신된 값을 브라우저에 저장, 1은 쿠키의 유효 기간으로 1일 후 만료됨
        setCookie("member", JSON.stringify(memberCookieValue), 1)

        //원래의 요청을 재전송, res.config는 원래 요청에 사용된 설정
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)
    }
    return res;
}

//fail response
const responseFail = (err) => {
    console.log("response error.....")
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)

jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios