import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container } from 'react-bootstrap'
import useCustomMove from './../../hooks/useCustomMove';
import { getOne, getAnswerOne } from './../../api/helpApi';

const initState = {
  id: 0,
  subject: "",
  content: "",
  createDate: null,
  modifyDate: null,
  author: ""
}

const HelpDetailComponent = ({ id }) => {
  const [info, setInfo] = useState(initState);
  // const [answer, setAnswer] = useState(null); 

  const { list, modify } = useCustomMove()
  const loginState = useSelector(state => state.loginSlice);

  useEffect(() => {
    getOne(id).then(data => {
      setInfo(data);
      console.log("게시글 정보 : ", data)
    });
  }, [id])




  // 로그인한 계정 이메일과 글 작성자 이메일 비교 (일치하면 수정 버튼)
  const canEdit = loginState.email === info.author.email;

  return (
    <>
      <Container className='p-5'>
        <h2 className='fw-bold'>{info.subject}</h2>
        <div className='d-flex'>
          <p style={{ color: 'grey' }}>{info.createDate}</p>
          <p className='ms-3'>{info.author.name}</p>
        </div>
        <div className='border rounded' style={{ height: 500 }}>
          <p className='p-3'>{info.content}</p>
        </div>
        <div className='text-end my-3'>
          {canEdit ? (
            <Button variant='primary' className='me-3' onClick={() => modify(id)}>수정</Button>
          ) : null}
          <Button variant='secondary' onClick={() => list()}>목록보기</Button>
        </div>
      </Container>
    </>
  )
}

export default HelpDetailComponent