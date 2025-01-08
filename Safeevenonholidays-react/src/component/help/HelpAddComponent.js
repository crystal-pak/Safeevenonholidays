import React, { useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove';
import { Form, Button, Container } from 'react-bootstrap'
import { postAdd } from './../../api/helpApi';
import { useSelector } from 'react-redux';

const initState = {
  subject: "",
  content: ""
}

const HelpAddComponent = () => {
  const [help, setHelp] = useState(initState)
  const { list } = useCustomMove()
  const loginState = useSelector(state => state.loginSlice)

  const handleChangeHelp = (e) => {
    help[e.target.name] = e.target.value
    setHelp({ ...help })
  }

  const handleClickAdd = () => {
    // 제목과 내용의 유효성 검사
    if (!help.subject.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!help.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log("전송 데이터:", help);
    postAdd(help).then(result => {
      setHelp({ ...initState }) // 입력 초기화
      list() // 목록으로 이동
    }).catch(e => {
      console.error("질문 등록 중 오류:", e);
    })
  }

  return (
    <>
      <Container>
        <p className="title fw-bold">질문 등록</p>
        <Form.Group className='mb-3' controlId='titleForm'>
          <Form.Label className="d-none">subject</Form.Label>
          <Form.Control
            type='text'
            name='subject'
            placeholder='제목을 입력하세요.'
            onChange={handleChangeHelp}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control
            as='textarea'
            name='content'
            placeholder='내용을 입력하세요.'
            onChange={handleChangeHelp}
            style={{
              height: "60vh",
            }}
          />
        </Form.Group>
        <div className='text-end'>
          <Button
            variant='primary'
            type='button'
            onClick={handleClickAdd}
            className='add-button'

          >
            등록
          </Button>
          <Button variant='secondary' type='button' onClick={() => list()} className='add-button ms-3'>취소</Button>
        </div>
      </Container>
    </>
  )
}

export default HelpAddComponent
