import React from 'react'
import { useParams } from 'react-router-dom'
import HelpDetailComponent from '../component/help/HelpDetailComponent';

const HelpDetail = () => {
  const {id} = useParams()

  return (
    <>
    <HelpDetailComponent id={id} />
    </>
  )
}

export default HelpDetail