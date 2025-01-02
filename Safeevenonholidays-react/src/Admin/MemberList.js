import React, { useEffect, useState } from 'react'; 
import { Button, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useCustomMove from '../hooks/useCustomMove';
import { getList, deleteOneByAdmin } from '../api/memberApi';
import PageComponent from '../component/common/PageComponent';
import { useNavigate } from 'react-router-dom';

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
  current: 0
}

const MemberList = () => {
  const {page, size, list, refresh} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const loginState = useSelector(state => state.loginSlice)
  
  const navigate = useNavigate()
  const [result, setResult] = useState()

  useEffect(() => {
      getList({page, size}).then(data => {
        console.log(data)
        setServerData(data)
      })
    }, [page, size, refresh])

  const handleClickModify = (id) => {
    console.log(`수정 버튼 클릭: 회원 번호 ${id}`);
    navigate(`/mypage/member/modify/${id}`)
  }

  const handleClickDelete = (id) => {
    deleteOneByAdmin(id).then(result => {
      alert(`${id}번 회원을 삭제 하였습니다.`)
      setResult("Deleted")
    })
  }

  return (
    <>
      <Container className="mt-4 mb-4">
        <p className="title">회원 목록 페이지</p>
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
            {serverData.dtoList.map((member) => (
              <tr key={member.id} className="align-middle">
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <Button className="list-button" type='button' onClick={() => handleClickModify(member.id)}>수정</Button>
                </td>
                <td className="align-middle">
                  <Button variant="danger" className="list-button" type='button' onClick={() => handleClickDelete(member.id)}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <PageComponent serverData={serverData} list={list} />
      </Container>
    </>
  );
};

export default MemberList;
