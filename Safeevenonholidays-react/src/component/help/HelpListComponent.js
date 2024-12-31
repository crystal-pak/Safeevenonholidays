import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HelpList = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  // 데이터 가져오기
  useEffect(() => {
    fetch(`/api/question/list?page=${page}&size=10`)
      .then((response) => response.json())
      .then((data) => setQuestions(data.dtoList))
      .catch((error) => console.error("Error fetching data:", error));
  }, [page]);

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='bg-primary bg-opacity-10'>번호</th>
            <th className='bg-primary bg-opacity-10 w-75'>제목</th>
            <th className='bg-primary bg-opacity-10'>작성자</th>
            <th className='bg-primary bg-opacity-10'>작성일</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
              <td>{question.subject}</td>
              <td>{question.author?.name || "익명"}</td>
              <td>{question.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(10)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HelpList;
