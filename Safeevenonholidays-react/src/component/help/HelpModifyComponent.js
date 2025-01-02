import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { deleteOne, getOne, putOne } from '../../api/helpApi';
import { Form, Button, Container } from 'react-bootstrap'


const initState = {
  subject: "",
  content: ""
}

const HelpModifyComponent = ({ id }) => {
  const [question, SetQuestion] = useState({ ...initState });
  const { list, detail } = useCustomMove();
  const [result, setResult] = useState(null);

  useEffect(() => {
    getOne(id).then(data => {
      SetQuestion(data)
    });
  }, [id])

  const handleChangeHelp = (e) => {
    question[e.target.name] = e.target.value
    SetQuestion({ ...question })
  }

  const handleClickModify = () => {
    putOne(question).then(data => {
      console.log("질문 수정 결과 : ", data);
      SetQuestion('Modified')
      alert("수정 되었습니다.")
      detail(id)
    })
  }

  const handleClickDelete = () => {
    deleteOne(id).then(data => {
      setResult('Deleted')
      alert("삭제 되었습니다.")
      list();
    })
  }

  return (
    <>
      <Container className='p-3'>
        <p className="title fw-bold">질문글 수정</p>
        <Form.Group className='mb-3' controlId='titleForm'>
          <Form.Label className="d-none">subject</Form.Label>
          <Form.Control type={'text'} name='subject' value={question.subject} onChange={handleChangeHelp} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control as='textarea' type={'text'} name='content' value={question.content} onChange={handleChangeHelp} style={{ height: "60vh" }} />
        </Form.Group>
        <div className='text-end'>
          <Button variant='primary' type='button' onClick={handleClickModify} className='add-button'>수정</Button>
          <Button variant='danger' type='button' onClick={handleClickDelete} className='add-button ms-3'>삭제</Button>
        </div>
      </Container>
    </>
  );
}

export default HelpModifyComponent;