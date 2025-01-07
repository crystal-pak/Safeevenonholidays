import React, { useEffect, useState } from 'react';
import { deleteOnAnswer, getListAnswers, postAddAnswer, putOneAnswer } from '../../api/helpApi';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const initState = {
  content: ""
};

const HelpAnswerComponent = ({ id, question }) => {
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState(initState);
  const loginState = useSelector(state => state.loginSlice);
  const [editAnswer, setEditAnswer] = useState(null);
  console.log("question", question)
  useEffect(() => {
    getListAnswers(id).then(data => {
      console.log("API 응답 데이터 확인: ", data);
      setAnswers(data);
    });
  }, [id]);

  const handleChangeAnswer = (e) => {
    const { name, value } = e.target;
    console.log("입력된 값:", value);  // 입력 값 로그
    setAnswer(prevAnswer => ({
      ...prevAnswer,
      [name]: value,
    }));
  };

  const handleClickAdd = () => {
    console.log("등록 버튼 클릭됨. 입력된 내용:", answer.content);
    if (!answer.content.trim()) {
      alert("내용을 입력해주세요.");  // 공백 입력 시 경고 메시지
      return;
    }

    postAddAnswer(id, answer).then(() => {
      setAnswer(initState); // 입력 초기화
      alert('답변이 정상적으로 등록되었습니다.');

      // 답변 등록 후 목록 새로고침
      getListAnswers(id).then(data => {
        setAnswers(data);
      }).catch(e => console.error('답변 목록 가져오기 실패:', e));
    }).catch(e => {
      console.error('답변 등록 실패:', e);
      alert("답변 등록 중 오류가 발생했습니다.");
    });
  };

  const handleClickDelete = (answerId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteOnAnswer(answerId).then(() => {
        alert("삭제되었습니다.");
        getListAnswers(id).then(data => setAnswers(data));
      }).catch(e => {
        console.error('삭제 실패:', e);
        alert("삭제 중 오류가 발생했습니다.");
      });
    }
  };

  const handleEditModify = async () => {
    console.log("수정 버튼 클릭됨. 수정된 내용:", editAnswer?.content);
    if (!editAnswer.content.trim()) {
      alert("수정할 내용을 입력해주세요.");  // 공백 입력 시 경고 메시지
      return;
    }

    try {
      await putOneAnswer(editAnswer);
      alert("수정이 완료되었습니다.");
      setEditAnswer(null);
      getListAnswers(id).then(data => setAnswers(data));
    } catch (error) {
      console.error("수정 실패:", error);
      alert("답변 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div>
        <h2 className='fw-bold'>답변 ({answers.length})</h2>
        {answers.map(answer => (
          <div key={answer.id} className="border rounded mb-3 p-3">
            <p>{answer.content || "내용 없음"}</p>
            <div className='d-flex justify-content-between'>
              <div>
                <small className="text-mute d-flex align-items-center">작성자:{answer.author?.name || "익명"} {answer.author.email == question ?  <span class="badge rounded-pill text-bg-primary ms-1">작성자</span> : <></>}</small>
                <small className="text-muted">
                  작성일: {answer.createDate ? `${answer.createDate[0]}년 ${answer.createDate[1]}월 ${answer.createDate[2]}일` : "알 수 없음"}
                </small>
              </div>
              {loginState?.email === answer.author?.email || loginState.roleNames.length > 1 ?
                <div>
                  <Button variant='primary' className='me-2' onClick={() => setEditAnswer(answer)}>수정</Button>
                  <Button variant='danger' onClick={() => handleClickDelete(answer.id)}>삭제</Button>
                </div>
                : null
              }
            </div>
          </div>
        ))}
      </div>

      {loginState.roleNames.length > 0 ?
        <div className="mt-5">
          <h2 className='fw-bold'>답변 등록</h2>
          <Form.Group className='mb-3 mt-3' controlId='contentForm'>
            <Form.Label className="d-none">Content</Form.Label>
            <Form.Control
              as='textarea'
              value={answer.content}
              name='content'
              placeholder='욕설이나 비방은 예고 없이 삭제될 수 있습니다.'
              onChange={handleChangeAnswer}
              style={{
                height: "20vh"
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
          </div>
        </div>
        :
        <div>
          <h2 className='fw-bold'>답변 등록</h2>
          <Form.Group className='mb-3' controlId='contentForm'>
            <Form.Label className="d-none">Content</Form.Label>
            <Form.Control
              as='textarea'
              value={answer.content}
              name='content'
              placeholder='로그인 후에 이용 가능합니다.'
              style={{ height: "20vh" }}
              readOnly
            />
          </Form.Group>
        </div>
      }

      {editAnswer && (
        <Modal show={true} onHide={() => setEditAnswer(null)}>
          <Modal.Header closeButton>
            <Modal.Title>답변 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              className="form-control my-3"
              rows={3}
              value={editAnswer.content}
              onChange={(e) => setEditAnswer({ ...editAnswer, content: e.target.value })}
              style={{
                borderColor: !editAnswer.content.trim() ? 'red' : '#ced4da',  // 공백 시 빨간 테두리
              }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditAnswer(null)}>취소</Button>
            <Button variant="primary" onClick={handleEditModify}>저장</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default HelpAnswerComponent;
