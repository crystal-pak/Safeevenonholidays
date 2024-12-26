import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'

const initState = {
    name: "",
    nickName : "",
    email : "",
    password: "",
    social : false,
    roleNames : []
  }

const MyPageModifyComponent = () => {
  const [member, setMember] = useState({...initState})
  const loginState = useSelector(state => state.loginSlice)

  const {moveToPath} = useCustomLogin()
  const [result, setResult] = useState()

  useEffect(() => {
    setMember({...loginState, password: '1234'})
    }, [loginState])
  
  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleClickModify = () => {
     modifyMember(member).then(result => {
          setResult("Modified")
          moveToPath('/mypage')
        })
  }

  return (
    <>
        <Form.Group className='mb-3' controlId='titleForm'>
        <Form.Label>이름</Form.Label>
        <Form.Control type={'text'} name='name' value={member.name} disabled />
        <Form.Text className='text-muted'>
            이름은 수정할 수 없습니다.
        </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label>Email</Form.Label>
        <Form.Control type={'text'} name='email' value={member.email} disabled />
        <Form.Text className='text-muted'>
            이메일은 수정할 수 없습니다.
        </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type={'password'} name='password' value={member.password} onChange={handleChangeMember} />
        <Form.Text className='text-muted'>
            기본설정은 1234 입니다.
        </Form.Text>
        </Form.Group>


        <Button variant='primary' type='button' onClick={handleClickModify}>수정</Button>
    </>
  )
}

export default MyPageModifyComponent