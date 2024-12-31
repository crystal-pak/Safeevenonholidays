import React from 'react'
import InfoModifyComponent from '../component/info/InfoModifyComponent'
import { useParams } from 'react-router-dom'

const InfoModify = () => {
  const {id} = useParams()

  return (
    <>
      <InfoModifyComponent id={id} />
    </>
  )
}

export default InfoModify