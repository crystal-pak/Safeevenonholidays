import React, { useEffect, useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { getOneAnswer, putOneAnswer } from '../../api/helpApi'
import { useLocation, useNavigate } from 'react-router-dom'

const AnswerModifyComponent = ({id}) => {
  const [answer, setAnswer] = useState({ content: "" })
  const navigate = useNavigate()
  const location = useLocation()
  const question = location.state?.question
  
  useEffect(() => {
    getOneAnswer(id).then(data => {
        setAnswer(data)
    })
  }, [id])

  const handleChangeAnswer = (e) => {
    answer[e.target.name] = e.target.value
    setAnswer({ ...answer })
  }

  const handleClickModify = () => {
    const updatedAnswer = {
      id: answer.id,
      content: answer.content, // 필요한 필드만 포함
      questionId : answer.questionId
    }
  
    putOneAnswer(updatedAnswer).then(() => {
      console.log(updatedAnswer)
      alert('답변이 수정되었습니다.')
      navigate(`/help/detail/${question.id}`)
    }).catch((error) => {
      console.error("수정 중 에러 발생:", error)
      alert("수정 중 문제가 발생했습니다.")
    })
  }

  return (
    <>
      <Container className='p-3'>
        <p className="title fw-bold">답변 수정</p>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control as='textarea' type={'text'} name='content' value={answer.content} onChange={handleChangeAnswer} style={{ height: "60vh" }} />
        </Form.Group>
        <div className='text-end'>
          <Button variant='primary' type='button' onClick={()=>handleClickModify(id)} className='add-button'>수정</Button>
        </div>
      </Container>
    </>
  )
}

export default AnswerModifyComponent