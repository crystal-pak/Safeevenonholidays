import React, { useState } from 'react'
import { postAdd } from '../../api/memberApi'
import { Form, Button } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'
import KakaoSignupComponent from './KakaoSignupComponent'

const initState = {
  name: "",
  nickName: "",
  email: "",
  password: "",
  social: false,
  roleNames: []
}

const SignupComponent = () => {
  const [member, setMember] = useState(initState)
  const [result, setResult] = useState(null)
  const [isAgreed, setIsAgreed] = useState(false)
  const { moveToLogin, moveToPath } = useCustomLogin()

  const handleChangeMember = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }

  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked) 
  }

  const handleClickAdd = () => {
    if (!member.name || !member.email || !member.password) {
      alert("빈 칸이 없는지 확인하세요.");
      return;
    }
    
    if (!isAgreed) { 
      alert("개인정보 수집 동의를 해주세요.");
      return;
    }

    console.log("전송 데이터:", member);
    postAdd(member).then(result => {
        alert("회원가입을 축하드립니다.");
        setResult(result.id)
        setMember({ ...initState })
        setResult(null)
        moveToLogin('/')
    }).catch(e => {
        alert("회원가입에 문제가 발생했습니다.");
        console.error(e)
    })
  }

  const handleClickHome = () => {
    moveToPath('/')
  }

  return (
    <div className="signup-container d-flex justify-content-center my-5">
      <div className='card-login'>
        <h2 className='text-center bold-text mt-4'>회원가입</h2>

        <Form.Group className='mb-3' controlId='titleForm'>
          <Form.Label>이름</Form.Label>
          <Form.Control type={'text'} name='name' placeholder='이름을 입력하세요.' onChange={handleChangeMember} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label>Email</Form.Label>
          <Form.Control type={'text'} name='email' placeholder='이메일을 입력하세요.' onChange={handleChangeMember} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='contentForm'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type={'password'} name='password' placeholder='비밀번호를 입력하세요.' onChange={handleChangeMember} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="개인정보 수집 동의" onChange={handleAgreeChange} />
        </Form.Group>

        <div className='d-flex'>
          <Button variant='secondary' type='button' onClick={handleClickHome} className='w-100 me-2'>취소</Button>
          <Button variant='primary' type='button' onClick={handleClickAdd} className='w-100'>회원가입</Button>        
        </div>
        {/* <KakaoSignupComponent /> */}
      </div>
    </div>
  )
}

export default SignupComponent