import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap'

const FindPwComponent = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post('http://localhost:8080/api/member/findpassword', null, {
        params: { email }
      })

      // 성공 메시지 설정
      setMessage(response.data)
      setError(false)
    } catch (err) {
      // 에러 메시지 설정
      setMessage(err.response?.data || 'An error occurred. Please try again.')
      setError(true)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          임시 비밀번호 요청
        </Button>
      </Form>

      {/* 결과 메시지 표시 */}
      {message && (
        <Alert variant={error ? 'danger' : 'success'} className="mt-3">
          {message}
        </Alert>
      )}
    </>
  )
}

export default FindPwComponent