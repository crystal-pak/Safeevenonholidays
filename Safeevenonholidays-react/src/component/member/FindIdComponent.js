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
      const data = await findEmailByName(name)
      setResult(data)
    } catch (error) {
        console.error("Error fetching data:", error)
        setResult(["An error occurred"])
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name='name' onChange={handleChange} placeholder="이름을 입력하세요" />
        </Form.Group>
        
        <div className='d-flex'>
          <Button variant="primary" type="button" className='w-100 me-2' onClick={handleSearch}>
                  아이디 찾기
          </Button>
          <Button type="button" className='w-100' onClick={handleClickFindPassword}>비밀번호 찾기</Button>
        </div>
        

        {result.length > 0 && (
        <div className="mt-3">
          <strong>검색 결과:</strong>
          <ul>
            {result.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default FindIdComponent