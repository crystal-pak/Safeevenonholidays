import React from "react";
import HospitalDetailComponent from "../component/hospital/HospitalDetailComponent";
import { useLocation, useParams } from "react-router-dom";

const HospitalDetail = () => {
  const {id} = useParams()
  const location = useLocation()
  const { item } = location.state || {}

  return (
    <>
      <div className="p-3">
        <HospitalDetailComponent id={id} item={item} />
      </div>
    </>
  );
};

export default HospitalDetail;
