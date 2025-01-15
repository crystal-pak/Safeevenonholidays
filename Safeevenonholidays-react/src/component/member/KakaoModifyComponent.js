import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'
import { logout } from '../../slice/loginSlice'

const initState = {
    email: '',
    password: '',
    nickName : '',
    name : '',
    socialId : ''
  }

const KakaoModifyComponent = () => {
  const [member, setMember] = useState(initState)
  const loginInfo = useSelector(state => state.loginSlice)

  const {moveToPath, moveToLogin} = useCustomLogin()
  const [result, setResult] = useState()
  
  useEffect(() => {
    setMember({...loginInfo, pw: '1234'})
  }, [loginInfo])

  const handleChange = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleClickModify = () => {
    modifyMember(member).then(result => {
      setResult("Modified")
      alert("회원가입이 완료되었습니다. 다시 로그인 해주세요.")
      logout()
      moveToLogin('/')
    })
  }

  return (
    <>
        <div className='d-flex justify-content-center my-5'>
            <div className='card-login p-5 mt-5'>
            <h2 className='text-center mb-4'>카카오 회원가입</h2>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" name='name' value={member.name} onChange={handleChange} className='mb-0' />
                    <Form.Text className="text-muted">
                      이름을 입력해주세요.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name='email' value={member.email} readOnly className='mb-0' />
                    <Form.Text className="text-muted">
                      이메일은 수정할 수 없습니다.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='pw' value={member.pw} onChange={handleChange}className='mb-0' />
                    <Form.Text className="text-muted">
                      기본설정은 1234 입니다.
                    </Form.Text>
                </Form.Group>
                
                <div className='text-end'>
                    <Button variant="primary" type="button" onClick={handleClickModify}>
                        가입
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default KakaoModifyComponent