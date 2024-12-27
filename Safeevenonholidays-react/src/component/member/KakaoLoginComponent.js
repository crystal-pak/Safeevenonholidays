import React from 'react'
import { Button } from 'react-bootstrap'
import { getKakaoLoginLink } from '../../api/kakaoApi'

const KakaoLoginComponent = () => {
  const goKakao = () => {
    window.location.href = getKakaoLoginLink()
  }
  return (
    <>
    <Button variant='warning' onClick={goKakao} className='my-3'>카카오로 시작하기</Button>
    </>
  )
}

export default KakaoLoginComponent