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
  const [result, setResult] = useState(null)
  const { list } = useCustomMove()

  const handleChangeInfo = (e) => {
    info[e.target.name] = e.target.value
    setInfo({ ...info })
  }

  const handleClickAdd = () => {
    console.log("전송 데이터:", info);
    postAdd(info).then(result => {
      setResult(result.id)
      setInfo({ ...initState })
      setResult(null)
      list()
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <>
      <Container>
        <p className="title fw-bold">자료실 등록</p>
        <Form.Group className='mb-3' controlId='titleForm'>
          <Form.Label className="d-none">subject</Form.Label>
          <Form.Control type='text' name='subject' placeholder='제목을 입력하세요.' onChange={handleChangeInfo} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control as='textarea' name='content' placeholder='내용을 입력하세요.' onChange={handleChangeInfo} style={{ height: "60vh" }} />
        </Form.Group>
        <div className='text-end'>
          <Button variant='primary' type='button' onClick={handleClickAdd} className='add-button'>등록</Button>
          <Button variant='secondary' type='button' onClick={() => list()} className='add-button ms-3'>취소</Button>
        </div>
      </Container>

    </>
  )
}

export default InfoAddComponent