import React, { useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { postAdd } from '../../api/infoApi'
import { Form, Button, Container } from 'react-bootstrap'

const initState = {
  subject: "",
  content: ""
}

const InfoAddComponent = () => {
  const [info, setInfo] = useState(initState)
  const { list } = useCustomMove()

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  const handleClickAdd = () => {
    // 제목과 내용 유효성 검사
    if (!info.subject.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!info.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log("전송 데이터:", info);
    postAdd(info).then(() => {
      alert("자료가 등록되었습니다!");
      setInfo({ ...initState }) // 입력 초기화
      list(); // 목록으로 이동
    }).catch(e => {
      console.error("자료 등록 중 오류:", e);
      alert("자료 등록 중 오류가 발생했습니다.");
    })
  }

  return (
    <Container>
      <p className="title fw-bold">자료실 등록</p>
      <Form.Group className='mb-3' controlId='titleForm'>
        <Form.Label className="d-none">subject</Form.Label>
        <Form.Control
          type='text'
          name='subject'
          value={info.subject}
          placeholder='제목을 입력하세요.'
          onChange={handleChangeInfo}
          style={{
          }}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label className="d-none">Content</Form.Label>
        <Form.Control
          as='textarea'
          name='content'
          value={info.content}
          placeholder='내용을 입력하세요.'
          onChange={handleChangeInfo}
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
        <Button
          variant='secondary'
          type='button'
          onClick={() => list()}
          className='add-button ms-3'
        >
          취소
        </Button>
      </div>
    </Container>
  )
}

export default InfoAddComponent
