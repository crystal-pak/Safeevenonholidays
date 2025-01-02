import React from 'react'
import AnswerModifyComponent from '../component/help/AnswerModifyComponent'
import { useParams } from 'react-router-dom'

const AnswerModify = () => {
  const {id} = useParams()
  return (
    <>
    <AnswerModifyComponent id={id} />
    </>
  )
}

export default AnswerModify