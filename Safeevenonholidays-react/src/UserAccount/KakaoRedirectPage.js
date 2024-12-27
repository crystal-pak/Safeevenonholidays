import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../api/kakaoApi'
import { useDispatch } from 'react-redux'
import { login } from '../slice/loginSlice'
import useCustomLogin from '..//hooks/useCustomLogin'

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get("code")
  const dispatch = useDispatch()
  const {moveToPath} = useCustomLogin()

  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
        //data는 뷰단에 보여지는 인가코드가 아닌 토큰 값임
        console.log(accessToken)

        //카카오에서 받은 회원 정보
        getMemberWithAccessToken(accessToken).then(memberInfo => {
            console.log("memberInfo {}", memberInfo)
            dispatch(login(memberInfo))
            
          //소셜 회원이 아니라면
          if(memberInfo && !memberInfo.social){
            moveToPath('/')
          } else {
            moveToPath('/member/modify')
          }
        })
    })
  }, [authCode])

  return (
    <>
    <div className='my-5'>로그인 중...</div>
    <div>{authCode}</div>
    </>
  )
}

export default KakaoRedirectPage