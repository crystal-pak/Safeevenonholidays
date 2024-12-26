import React from 'react'
import MyPageModifyComponent from '../component/mypage/MyPageModifyComponent'
import { useParams } from 'react-router-dom'

const Modify = () => {
  const {id} = useParams()

  return (
    <>
    <h3>회원 정보 수정</h3>
    <MyPageModifyComponent id={id} />
    </>
  )
}

export default Modify