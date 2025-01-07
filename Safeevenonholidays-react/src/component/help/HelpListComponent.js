import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { getList } from "./../../api/helpApi";
import useCustomMove from "./../../hooks/useCustomMove";
import PageComponent from "./../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const HelpListComponent = () => {
  const { page, size, list, refresh, detail, add } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const loginState = useSelector((state) => state.loginSlice);
  // 제목 텍스트 자르기
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  // 제목 텍스트 자르기
  useEffect(() => {
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const updateDisplayData = () => {
      if (serverData.dtoList.length > 0) {
        const truncatedSubjects = serverData.dtoList.map((question) => ({
          ...question,
          subject: windowWidth <= 768 ? truncateText(question.subject, 20) : question.subject,
        }));
        setSubject(truncatedSubjects);
      }
    };

    updateDisplayData();
  }, [serverData, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Container className="mt-4 mb-4">
        <p className="title fw-bold">QnA 페이지</p>
        <Table className="text-start mt-5 table-list">
          {windowWidth > 650 && (
            <thead className="text-center">
              <tr>
                <th className="table-head">글번호</th>
                <th className="table-head">제목</th>
                <th className="table-head">작성자</th>
                <th className="table-head">날짜</th>
              </tr>
            </thead>
          )}
          <tbody>
            {subject.map((question, index) => (
              <tr key={index}>
                {windowWidth > 650 && (
                  <td className="text-center table-title-number">
                    {serverData.totalCount - ((page - 1) * size + index)}
                  </td>
                )}
                <td
                  onClick={() => detail(question.id)}
                  style={{ cursor: "pointer" }}
                  className="table-subject"
                >
                  <div className="subject-title">{question.subject}</div>
                  {windowWidth <= 650 && <div className="subject-date">{question.createDate}</div>}
                </td>
                {windowWidth > 650 && (
                  <td className="text-center table-title-author">{question.author.name}</td>
                )}
                {windowWidth > 650 && (
                  <td className="text-center table-title-date">{question.createDate}</td>
                )}

                {windowWidth <= 650 && (
                  <td className="arrow-cell" onClick={() => detail(question.id)}>
                    <span className="arrow-icon">&gt;</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end">
          {loginState.roleNames.length > 0 ? <Button onClick={add}>글작성</Button> : null}
        </div>
        <PageComponent serverData={serverData} list={list} />
      </Container>
    </>
  );
};

export default HelpListComponent;
