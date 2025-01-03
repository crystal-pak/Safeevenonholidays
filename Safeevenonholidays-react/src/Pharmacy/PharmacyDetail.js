import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PharmacyDetailComponent from '../component/pharmacy/PharmacyDetailComponent'

const PharmacyDetail = () => {
  const {id} = useParams()
  const location = useLocation()
  const { item } = location.state || {}
  
  return (
    <>
      <div className="p-3">
        <PharmacyDetailComponent id={id} item={item} />
      </div>
    </>
  )
}

export default PharmacyDetail