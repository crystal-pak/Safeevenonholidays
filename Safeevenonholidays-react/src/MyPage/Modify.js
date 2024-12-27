import { Button, Form, Container } from 'react-bootstrap';
import "../styles/mypage.css";

const initState = {
  login_id: '',
  name: '',
  password: ''
};

const Modify = () => {
  return (
    <Container fluid className='d-flex align-items-center justify-content-center'>
      <div className='mt-5 p-5'>
        <p className='mypage-title text-center mt-5 mb-5'>개인정보수정</p>
        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>이름</Form.Label>
          <Form.Control type="text" name='name' readOnly className='w-75 border-0' />
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>아이디</Form.Label>
          <Form.Control type="text" name='email' readOnly className='w-75 border-0' />
        </Form.Group>
        <Form.Group className="mb-5 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>비밀번호</Form.Label>
          <Form.Control type="password" name='pw' className='w-75 pw-input' />
        </Form.Group>
        <div className='text-center d-flex justify-content-between'>
          <Button variant='primary' type='button' className='modi-button'>수정</Button>
          <Button variant='secondary' type='button' className='modi-button'>취소</Button>
        </div>
        <div className='text-center'>
          <Button variant='danger' type='button' className='w-100 delete-button'>회원탈퇴</Button>
        </div>
      </div>
    </Container>
  );
}

export default Modify;
