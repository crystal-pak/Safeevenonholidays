import React from 'react'
import { Form, Button } from 'react-bootstrap'

const FindIdComponent = () => {

  const handleChange = () => {

  }
  return (
    <>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name='name' onChange={handleChange} placeholder="이름을 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="text" name='email' onChange={handleChange} placeholder="이메일을 입력하세요" />
        </Form.Group>
        
        <Button variant="primary" type="button" className='w-100'>
                아이디 찾기
        </Button>
    </>
  )
}

export default FindIdComponent