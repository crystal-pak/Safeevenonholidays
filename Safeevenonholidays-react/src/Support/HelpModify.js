import React from 'react'
import HelpModifyComponent from '../component/help/HelpModifyComponent'

import { useParams } from 'react-router-dom'

const HelpModify = () => {
    const {id} = useParams()
  
  return (
    <>
    <HelpModifyComponent id={id}/>
    </>
  )
}

export default HelpModify