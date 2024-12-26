import React, { useState } from 'react'
import { postAdd } from '../../api/memberApi'
import { Form, Button } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'

const initState = {
    name: "",
    nickName : "",
    email : "",
    password: "",
    social : false,
    roleNames : []
  }

const SignupComponent = () => {
  const [member, setMember] = useState(initState)
  const [result, setResult] = useState(null)
  const {moveToLogin} = useCustomLogin()

  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleClickAdd = () => {
    console.log("전송 데이터:", member);
    postAdd(member).then(result => {
        setResult(result.id)
        setMember({...initState})
        setResult(null)
        moveToLogin('/')
    }).catch(e => {
        console.error(e)
    })
  }

  return (
    <>
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
        <Form.Control type={'text'} name='password' placeholder='비밀번호를 입력하세요.' onChange={handleChangeMember} />
        </Form.Group>


        <Button variant='primary' type='button' onClick={handleClickAdd}>등록</Button>
    </>
  )
}

export default SignupComponent