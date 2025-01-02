import React, { useEffect, useState } from "react";
import "../src/styles/main.css";
import { Col, Container, Row } from "react-bootstrap";
import ItemsCarousel from 'react-items-carousel';
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [numberOfCards, setNumberOfCards] = useState(4);
    const navigate = useNavigate()

    const updateCardCount = () => {
        if (window.innerWidth <= 768) {
            setNumberOfCards(1); 
        } else if (window.innerWidth <= 1200) {
            setNumberOfCards(2); 
        } else {
            setNumberOfCards(4); 
        }
    };

    useEffect(() => {
        updateCardCount(); 

        const handleResize = () => {
            updateCardCount();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const handleClickHosSearch = () => {
        navigate("/hospital/list")
    }

    const handleClickPharmSearch = () => {
        navigate("/pharmacy/list")
    }

    const handleClickInfo = () => {
        navigate("/info/list")
    }

    const handleClickHelp = () => {
        navigate("/help/list")
    }

    return (
        <>
            <div className="full-page">
                <section className="section">
                    <div className="container mt-5">
                        <Row>
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
                                    <div role="button" onClick={handleClickHosSearch} className="card-body">
                                        <h5 className="card-title">병원 찾기</h5>
                                        <p className="card-text">가까운 병원을 찾아보세요.</p>
                                    </div>
                                </div>
                                <div className="card section1-card-right">
                                    <div role="button" onClick={handleClickPharmSearch} className="card-body">
                                        <h5 className="card-title">약국 찾기</h5>
                                        <p className="card-text">가까운 약국을 찾아보세요.</p>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </section>
                <section className="section">
                    <Container className="section2-container">
                        <p>지금 바로 갈 수 있는 병원👣</p>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ItemsCarousel
                                    requestToChangeActive={setActiveItemIndex}
                                    activeItemIndex={activeItemIndex}
                                    numberOfCards={numberOfCards}
                                    gutter={20}
                                >
                                    <div className="section2-card">First card</div>
                                    <div className="section2-card">Second card</div>
                                    <div className="section2-card">Third card</div>
                                    <div className="section2-card">Fourth card</div>
                                </ItemsCarousel>
                            </Col>
                        </Row>
                        <p>지금 바로 갈 수 있는 약국🏃</p>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ItemsCarousel
                                    requestToChangeActive={setActiveItemIndex}
                                    activeItemIndex={activeItemIndex}
                                    numberOfCards={numberOfCards}
                                    gutter={20}
                                >
                                    <div className="section2-card">First card</div>
                                    <div className="section2-card">Second card</div>
                                    <div className="section2-card">Third card</div>
                                    <div className="section2-card">Fourth card</div>
                                </ItemsCarousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="section">
                    <div className="container mt-5">
                        <Row>
                            <Col>
                                <div role="button" onClick={handleClickInfo} className="card section1-card-right">
                                    <div className="card-body">
                                        <h5 className="card-title">자료실</h5>
                                        <p className="card-text">응급 처치 요령</p>
                                        <p className="card-text">감염병 예방</p>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div role="button" onClick={handleClickHelp} className="card section1-card-right">
                                    <div className="card-body">
                                        <h5 className="card-title">고객지원</h5>
                                        <p className="card-text">Q&A</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Main;