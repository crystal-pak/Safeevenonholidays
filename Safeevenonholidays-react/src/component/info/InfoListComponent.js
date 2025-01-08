import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/infoApi";
import PageComponent from "../common/PageComponent";
import { useSelector } from "react-redux";

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

const InfoListComponent = () => {
  const { page, size, list, refresh, detail, add } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const loginState = useSelector((state) => state.loginSlice);
  // 제목 텍스트 자르기
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data);
      setSubject(data.dtoList);
    });
  }, [page, size, refresh]);

  // 제목 텍스트 자르기
  useEffect(() => {
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const updateDisplayData = () => {
      if (subject.length > 0) {
        const updatedSubjects = subject.map((item) => ({
          ...item,
          subject: windowWidth <= 768 ? truncateText(item.subject, 15) : item.subject,
        })); // 최대한 작은 화면에 맞추기 위해 15로 수정함
        setSubject(updatedSubjects);
      }
    };

    updateDisplayData();
  }, [windowWidth]); // windowWidth와 subject에 의존

  // 화면 크기 변경 감지
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
        <p className="title fw-bold">자료실 페이지</p>
        <Table className="text-start mt-5">
          {windowWidth > 650 && (
            <thead className="text-center">
              <tr>
                <th>글번호</th>
                <th className="w-50">제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </thead>
          )}
          <tbody>
            {subject.map((item, index) => (
              <tr key={index}>
                {windowWidth > 650 && (
                  <td className="text-center">
                    {serverData.totalCount - ((page - 1) * size + index)}
                  </td>
                )}
                <td
                  onClick={() => detail(item.id)}
                  style={{ cursor: "pointer" }}
                  className="table-subject"
                >
                  <div className="subject-title">{item.subject}</div>
                  {windowWidth <= 650 && <div className="subject-date">{item.createDate}</div>}
                </td>
                {windowWidth > 650 && <td className="text-center">{item.author.name}</td>}
                {windowWidth > 650 && <td className="text-center">{item.createDate}</td>}
                {windowWidth <= 650 && (
                  <td className="arrow-cell" onClick={() => detail(item.id)}>
                    <span role="button" className="arrow-icon">
                      &gt;
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end">
          {loginState.roleNames.length > 1 ? <Button onClick={add}>글작성</Button> : null}
        </div>
        <PageComponent serverData={serverData} list={list} />
      </Container>
    </>
  );
};

export default InfoListComponent;

