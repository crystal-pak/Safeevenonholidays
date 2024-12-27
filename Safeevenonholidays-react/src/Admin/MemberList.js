import React, { useState } from 'react'; 
import { Button, Container, Pagination, Table } from 'react-bootstrap';

const MemberList = () => {
  const members = [
    { id: 1, name: "김기자", login_id: "test@test.com" },
    { id: 2, name: "김기자", login_id: "test@test.com" },
    { id: 3, name: "김기자", login_id: "test@test.com" },
    { id: 4, name: "김기자", login_id: "test@test.com" },
    { id: 5, name: "김기자", login_id: "test@test.com" },
    { id: 6, name: "김기자", login_id: "test@test.com" },
    { id: 7, name: "김기자", login_id: "test@test.com" },
    { id: 8, name: "김기자", login_id: "test@test.com" },
    { id: 9, name: "김기자", login_id: "test@test.com" },
    { id: 10, name: "김기자", login_id: "test@test.com" },
    { id: 11, name: "김기자", login_id: "test@test.com" },
    { id: 12, name: "김기자", login_id: "test@test.com" },
  ];

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지, 변경 페이지
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  const indexOfLastItem = currentPage * itemsPerPage; // 인덱스 끝
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 인덱스 시작
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지의 항목들

  const totalPages = Math.ceil(members.length / itemsPerPage); // 총 페이지 수 계산

  const handlePageChange = (pageNumber) => { // 페이지 번호가 변경될 때 호출
    setCurrentPage(pageNumber); // 새로운 페이지 번호 설정
  };

  return (
    <>
      <Container className="mt-4 mb-4">
        <p className="mypage-title">회원 목록 페이지</p>
        <Table className="text-center mt-5">
          <thead>
            <tr>
              <th>회원번호</th>
              <th>이름</th>
              <th>아이디</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((member) => (
              <tr key={member.id} className="align-middle">
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.login_id}</td>
                <td>
                  <Button className="list-button">수정</Button>
                </td>
                <td className="align-middle">
                  <Button variant="danger" className="list-button">삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <Pagination className="justify-content-center mt-5">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
    </>
  );
};

export default MemberList;
