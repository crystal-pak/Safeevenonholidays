import React from 'react'
import { useParams } from 'react-router-dom'
import InfoDetailComponent from '../component/info/InfoDetailComponent'

const InfoDetail = () => {
  const {id} = useParams()

  return (
    <>
      <h2>자료실 상세</h2>
      <InfoDetailComponent id={id} />
    </>
  )
}

export default InfoDetail