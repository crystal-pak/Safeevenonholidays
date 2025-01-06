import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container } from 'react-bootstrap'
import useCustomMove from './../../hooks/useCustomMove';
import { getOne } from './../../api/helpApi';
import HelpAnwserComponent from './HelpAnwserComponent';

const initState = {
  id: 0,
  subject: "",
  content: "",
  createDate: null,
  modifyDate: null,
  author: ""
}

const HelpDetailComponent = ({ id }) => {
  const [question, setQuestion] = useState(initState)
  const { list, modify } = useCustomMove()
  const loginState = useSelector(state => state.loginSlice)

  useEffect(() => {
    getOne(id).then(data => {
      setQuestion(data)
      console.log("게시글 정보 : ", data)
    });
  }, [id])

  // 로그인한 계정 이메일과 글 작성자 이메일 비교 (일치하면 수정 버튼)
  const canEdit = loginState.email === question.author.email;

  return (
    <>
      <Container className="mt-5 mb-5">
        <h2 className='fw-bold'>{question.subject}</h2>
        <div className='d-flex'>
          <p style={{ color: 'grey' }}>{question.createDate}</p>
          <p className='ms-3'>{question.author.name}</p>
        </div>
        <div className='border rounded' style={{ height: 500 }}>
          <p className='p-3'>{question.content}</p>
        </div>
        <div className='text-end my-3'>
          {canEdit || loginState.roleNames.length > 1 ? (
            <Button variant='primary' className='me-3' onClick={() => modify(id)}>수정 / 삭제</Button>
          ) : null}
          <Button variant='secondary' onClick={() => list()}>목록보기</Button>
        </div>

        <div>
          <HelpAnwserComponent id={id} question={question} />
        </div>
      </Container>
    </>
  )
}

export default HelpDetailComponent