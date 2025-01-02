import React from 'react'
import { useParams } from 'react-router-dom'
import InfoDetailComponent from '../component/info/InfoDetailComponent'

const InfoDetail = () => {
  const {id} = useParams()

  return (
    <>
      <InfoDetailComponent id={id} />
    </>
  )
}

export default InfoDetail