import React from "react";
import "../src/styles/main.css";

const Main = () => {
  return (
    <>
      <div className="full-page">
        <section className="section">
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card section1-card-left">
            <div className="card-body">
              <h5 className="card-title">휴일도 안심</h5>
              <p className="card-text">내 위치에서 가까운</p>
              <p className="card-text">의료시설을 찾아드립니다.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column">
          <div className="card mb-2 section1-card-right">
            <div className="card-body">
              <h5 className="card-title">병원 찾기</h5>
              <p className="card-text">가까운 병원을 찾아보세요.</p>
            </div>
          </div>
          <div className="card section1-card-right">
            <div className="card-body">
              <h5 className="card-title">약국 찾기</h5>
              <p className="card-text">가까운 약국을 찾아보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </section>
        <section className="section">섹션2</section>
        <section className="section">섹션3</section>
      </div>
    </>
  );
};

export default Main;
