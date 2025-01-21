import axios from 'axios'
import {API_SERVER_HOST} from './infoApi'

//REST 키 값
const rest_api_key = `edbe314597786c5795e7516f6aa2b7d2`

//REDIRECT URI
const redirect_uri = `https://safeevenonholidays.shop/member/kakao`

//인가 코드 받기
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

//토큰 받기
const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    return kakaoURL
}

//authCode는 인가코드, 인가코드로 AccessToken 받기
export const getAccessToken = async (authCode) => {
    //header 지정
    const header = {
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
        }
    }

    //전달해야 하는 값이 많아서 객체로 만듦
    const params = {
        grant_type : "authorization_code",
        client_id : rest_api_key,
        redirect_uri : redirect_uri,
        code : authCode
    }

    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token
    return accessToken
}

//SocialController.java => /api/member/kakao
export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)
    return res.data
}