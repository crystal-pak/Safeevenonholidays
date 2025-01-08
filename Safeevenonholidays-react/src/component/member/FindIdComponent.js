import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { findEmailByName } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'

const FindIdComponent = () => {
  const [name, setName] = useState('')
  const [result, setResult] = useState('')
  const {moveToPath} = useCustomLogin()

  const handleSearch = async () => {
    try {
      if (!name.trim()) {
      alert('이름을 입력해주세요.')
      return
    }
      const data = await findEmailByName(name)
      setResult(data)
    } catch (error) {
        console.error("Error fetching data:", error)
        setResult(["해당 이름으로는 가입된 아이디가 없습니다."])
    }
  }
  

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClickFindPassword = () => {
    moveToPath('/member/findpassword')
  }

  return (
    <>
    <div className="signup-container d-flex justify-content-center my-5">
      <div className="card-login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={handleChange} placeholder="이름을 입력하세요" />
        </Form.Group>

        <div className="d-flex">
          <Button variant="primary" type="button" className="w-100 me-2" onClick={handleSearch}>
            아이디 찾기
          </Button>
          <Button type="button" className="w-100" onClick={handleClickFindPassword}>
            비밀번호 찾기
          </Button>
        </div>

        {result.length > 0 && (
          <div className="mt-3">
            <strong>검색 결과:</strong>
            <ul>
              {result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default FindIdComponent