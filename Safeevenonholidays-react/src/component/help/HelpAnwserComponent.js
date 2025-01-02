import React, { useEffect, useState } from 'react'
import { getListAnswers, getOneAnswer, postAddAnswer } from '../../api/helpApi'
import { Form, Button } from 'react-bootstrap'

const initState = {
    content: ""
  }

const HelpAnwserComponent = ({id}) => {
  const [answers, setAnswers] = useState([])
  const [answer, setAnswer] = useState(initState)
  const [result, setResult] = useState(null)
  
  useEffect(() => {
    getListAnswers(id).then(data => {
        console.log("API 응답 데이터 확인: ", data);
  
      if (Array.isArray(data)) {
        setAnswers(data);  // 배열이면 그대로 사용
      } else if (data && data.answers) {
        setAnswers(data.answers);  // 객체의 answers 배열을 처리
      } else if (data && typeof data === 'object') {
        // 객체일 경우 값을 배열로 변환
        setAnswers(Object.values(data));
      } else {
        console.error("잘못된 데이터 형식");
      }
    }).catch(e => {
      console.error("답변 리스트 조회 에러", e);
    })
  }, [id]);

  const handleChangeAnswer = (e) => {
    answer[e.target.name] = e.target.value
    setAnswer({ ...answer })
    }

  const handleClickAdd = () => {
      postAddAnswer(id, answer).then(result => {
        setResult(result.id)
        setAnswers([...answers, result])
        setAnswer(initState)
        setResult(null)
        alert('답변이 정상적으로 등록되었습니다.')
      }).catch(e => {
        console.error(e)
      })
    }

  return (
    <>
    <div>
        <h2 className='fw-bold'>답변 ({answers.length})</h2>
        {answers.map((answer, index) => {
          <div key={index} className='border rounded' style={{ height: 500 }}>
            <p className='p-3'>{answer.content}</p>
          </div>
        })}
    </div>

    <div>
        <h2 className='fw-bold'>답변 등록</h2>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control as='textarea' name='content' placeholder='욕설이나 비방은 예고없이 삭제될 수 있습니다.' onChange={handleChangeAnswer} style={{ height: "20vh" }} />
        </Form.Group>
        <div className='text-end'>
          <Button variant='primary' type='button' onClick={handleClickAdd} className='add-button'>등록</Button>
        </div>
    </div>  
    </>
  )
}

export default HelpAnwserComponent