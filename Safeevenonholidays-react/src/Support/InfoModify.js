import React from 'react'
import InfoModifyComponent from '../component/info/InfoModifyComponent'
import { useParams } from 'react-router-dom'

const InfoModify = () => {
  const {id} = useParams()

  return (
    <>
      <h2>자료실 수정</h2>
      <InfoModifyComponent id={id} />
    </>
  )
}

export default InfoModify