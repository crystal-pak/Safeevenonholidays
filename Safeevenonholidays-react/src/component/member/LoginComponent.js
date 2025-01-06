import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'
import KakaoLoginComponent from './KakaoLoginComponent'

const initState = {
  email: "",
  password: ""
}

const LoginComponent = () => {
  const { doLogin, moveToPath } = useCustomLogin()
  const [loginParam, setLoginParam] = useState({ ...initState })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setLoginParam({
      ...loginParam,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin(loginParam).then(data => {
      if (data.error) {
        if (data.error === "invalid_email") {
          setErrorMessage("이메일이 틀렸습니다.")
        } else if (data.error === "invalid_password") {
          setErrorMessage("비밀번호가 틀렸습니다.")
        } else {
          setErrorMessage("로그인에 실패했습니다.")
        }
      } else {
        alert("로그인 성공")
        moveToPath('/')
      }
    }).catch((e) => {
      setErrorMessage("로그인 오류가 발생했습니다.")
      console.error(e)
    })
  }

  const handleClickSignUp = () => {
    moveToPath('/member/signup')
  }

  const handleClickFind = () => {
    moveToPath("/member/findid")
  }

  return (
    <>
      <div className='d-flex justify-content-center my-5'>
        <div className='card-login'>
          <h2 className='text-center bold-text mt-4'>로그인</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="text" 
                name='email' 
                onChange={handleChange} 
                placeholder="이메일을 입력하세요" 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name='password' 
                onChange={handleChange} 
                placeholder="비밀번호를 입력하세요" 
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
            >
              로그인
            </Button>
          </Form>

          {errorMessage && (
            <div className="mt-3 text-danger">
              {errorMessage}
            </div>
          )}

          <Row className='mt-3'>
            <Col>
              <Button 
                variant='secondary' 
                onClick={handleClickFind}
              >
                ID / 비밀번호 찾기
              </Button>
            </Col>
            <Col>
              <Button 
                variant='secondary' 
                onClick={handleClickSignUp}
              >
                회원가입
              </Button>
            </Col>
          </Row>

          <KakaoLoginComponent />
        </div>
      </div>
    </>
  )
}

export default LoginComponent
