import React, { useEffect, useState } from 'react'
import { deleteOnAnswer, getListAnswers, postAddAnswer, putOne, putOneAnswer } from '../../api/helpApi'
import { Form, Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initState = {
    content: ""
  }

const HelpAnwserComponent = ({id, question}) => {
  const [answers, setAnswers] = useState([])
  const [answer, setAnswer] = useState(initState)
  const [result, setResult] = useState(null)
  const loginState = useSelector(state => state.loginSlice)
  const navigate = useNavigate()
  const [editAnswer, setEditAnswer] = useState(null)
  
  useEffect(() => {
    getListAnswers(id).then(data => {
        console.log("API 응답 데이터 확인: ", data)
        setAnswers(data)
    })
  }, [id]);

  const handleChangeAnswer = (e) => {
    const { name, value } = e.target
    setAnswer((prevAnswer) => ({
        ...prevAnswer,
        [name]: value,
    }))
    }

  const handleClickAdd = () => {
    postAddAnswer(id, answer).then(result => {
        setResult(null);
        alert('답변이 정상적으로 등록되었습니다.');

        // 답변이 추가된 후에 다시 전체 답변 목록을 가져오기
        getListAnswers(id).then(data => {
            console.log("새로고침된 API 응답 데이터:", data)
            setAnswers(data)
            setAnswer(initState) // 입력 초기화
        }).catch(e => {
            console.error('답변 목록을 다시 가져오는 중 에러:', e)
        })
    }).catch(e => {
        console.error(e)
    });
  }

  const handleClickDelete = (answerId) => {
    deleteOnAnswer(answerId).then(() => {
      // 삭제된 후 최신 답변 목록을 가져오기
      getListAnswers(id).then(data => {
        console.log("새로고침된 API 응답 데이터:", data)
        setAnswers(data); // 새로 받은 데이터를 setAnswers로 갱신
      }).catch(e => {
        console.error('답변 목록을 다시 가져오는 중 에러:', e)
      });
  
      alert("삭제 되었습니다.")
    }).catch(e => {
      console.error(e);
      alert("삭제 중 에러가 발생했습니다.")
    })
  }

  // 리뷰 수정
  const handleEditModify = async () => {
    try {
      await putOneAnswer(editAnswer); // 리뷰 수정 API 호출
      setEditAnswer(null);
      window.location.reload(); // 새로고침으로 업데이트
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생:", error);
    }
  }
  
  return (
    <>
    <div>
        <h2 className='fw-bold'>답변 ({answers.length})</h2>
        {answers.map((answer) => (
        <div key={answer.id} className="border rounded mb-3 p-3">
          <p>{answer.content}</p>
          <div className='d-flex justify-content-between'>
            <div>
              <small className="text-muted">작성자: {answer.author?.name}</small>
              <br />
              <small className="text-muted">작성일: {answer.createDate[0]}년 {answer.createDate[1]}월 {answer.createDate[2]}일</small>
            </div>
            {loginState?.email === answer.author?.email || loginState.roleNames.length > 1 ?
              <div>
              <Button variant='primary' className='me-2' onClick={() => setEditAnswer(answer)}>수정</Button>
              <Button variant='danger' onClick={() => handleClickDelete(answer.id)}>삭제</Button>
              </div>
            :
              <></>
            }
          </div>
        </div>
        ))}
    </div>

      
    {loginState.roleNames.length > 0 ? 
      <div>
      <h2 className='fw-bold'>답변 등록</h2>
      <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label className="d-none">Content</Form.Label>
        <Form.Control as='textarea' value={answer.content}  name='content' placeholder='욕설이나 비방은 예고없이 삭제될 수 있습니다.' onChange={handleChangeAnswer} style={{ height: "20vh" }} />
      </Form.Group>
      <div className='text-end'>
        <Button variant='primary' type='button' onClick={handleClickAdd} className='add-button'>등록</Button>
      </div>
    </div>  
    :
    <div>
      <h2 className='fw-bold'>답변 등록</h2>
      <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label className="d-none">Content</Form.Label>
        <Form.Control as='textarea' value={answer.content}  name='content' placeholder='로그인 후에 이용 가능합니다.' style={{ height: "20vh" }} readOnly />
      </Form.Group>
    </div>
    }

    {/* 리뷰 수정 모달 */}
    {editAnswer && (
        <Modal show={true} onHide={() => setEditAnswer(null)}>
          <Modal.Header closeButton>
            <Modal.Title>리뷰 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              className="form-control my-3"
              rows={3}
              value={editAnswer.content}
              onChange={(e) =>
                setEditAnswer({ ...editAnswer, content: e.target.value })
              }
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditAnswer(null)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleEditModify}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
        )}
    </>
  )
}

export default HelpAnwserComponent