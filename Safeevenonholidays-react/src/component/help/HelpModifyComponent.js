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
      SetQuestion(data);
    });
  }, [id])

  const handleChangeHelp = (e) => {
    const { name, value } = e.target;
    SetQuestion(prevQuestion => ({
      ...prevQuestion,
      [name]: value,
    }));
  }

  const handleClickModify = () => {
    // 제목과 내용 유효성 검사
    if (!question.subject.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!question.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    putOne(question).then(data => {
      console.log("질문 수정 결과 : ", data);
      alert("수정 되었습니다.");
      detail(id);
    }).catch(e => {
      console.error("수정 중 오류:", e);
      alert("수정 중 오류가 발생했습니다.");
    });
  }

  const handleClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteOne(id).then(() => {
        setResult('Deleted');
        alert("삭제 되었습니다.");
        list();
      }).catch(e => {
        console.error("삭제 실패:", e);
        alert("삭제 중 오류가 발생했습니다.");
      });
    }
  }

  return (
    <>
      <Container className='p-3'>
        <p className="title fw-bold">질문글 수정</p>
        <Form.Group className='mb-3' controlId='titleForm'>
          <Form.Label className="d-none">subject</Form.Label>
          <Form.Control
            type='text'
            name='subject'
            value={question.subject}
            placeholder='제목을 입력하세요.'
            onChange={handleChangeHelp}
            style={{
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label className="d-none">Content</Form.Label>
          <Form.Control
            as='textarea'
            name='content'
            value={question.content}
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
            onClick={handleClickModify}
            className='add-button'
          >
            수정
          </Button>
          <Button
            variant='danger'
            type='button'
            onClick={handleClickDelete}
            className='add-button ms-3'
          >
            삭제
          </Button>
        </div>
      </Container>
    </>
  );
}

export default HelpModifyComponent;
