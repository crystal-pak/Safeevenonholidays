import React from 'react'
import { Button } from 'react-bootstrap'
import { getKakaoLoginLink } from '../../api/kakaoApi'

const KakaoLoginComponent = () => {
  const goKakao = () => {
    window.location.href = getKakaoLoginLink()
  }
  return (
    <>
    <p className='mt-4'>로그인시에 자동 가입처리 됩니다.</p>
    <Button variant='warning' onClick={goKakao}>카카오톡으로 로그인하기</Button>
    </>
  )
}

export default KakaoLoginComponent