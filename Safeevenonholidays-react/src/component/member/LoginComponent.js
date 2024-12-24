import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'
const initState = {
  email : "",
  password : ""
}
const LoginComponent = () => {
  const {doLogin, moveToPath} = useCustomLogin()
  const [loginParam, setLoginParam] = useState({...initState})

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value
    setLoginParam({...loginParam})
  }

  const handleClickLogin = (e) => {
    doLogin(loginParam).then(data => {
      if(data.error) {
        alert("이메일과 패스워드를 확인하세요")
      } else {
        alert("로그인 성공")
        moveToPath('/')
      }
    })
  }

  return (
    <>
        <div className='d-flex justify-content-center my-5'>
            <Card className='w-50 p-5 mt-5'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name='email' onChange={handleChange} placeholder="이메일을 입력하세요" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' onChange={handleChange} placeholder="비밀번호를 입력하세요" />
                </Form.Group>
                
                <div className='text-end'>
                    <Button variant="info" type="button"
                     onClick={handleClickLogin}>
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    </>
  )
}

export default LoginComponent