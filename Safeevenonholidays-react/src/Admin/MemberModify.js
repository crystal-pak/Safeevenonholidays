import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import "../styles/common.css";
import { useParams } from 'react-router-dom';
import { deleteOneByAdmin, getOne, putOne } from '../api/memberApi';
import useCustomLogin from '../hooks/useCustomLogin';

const initState = {
  name: "",
  nickName : "",
  email : "",
  password: "",
  social : false,
  roleNames : []
}

const MemberModify = () => {
  const { id } = useParams()
  const [member, setMember] = useState({...initState})
  const [result, setResult] = useState(null)
  const {moveToPath} = useCustomLogin()

  useEffect(() => {
    getOne(id).then(data => {
      setMember({...data, password : '1234'})
      console.log("member", member)
    }).catch(error => {
      console.error('회원 정보를 가져오는 데 실패했습니다.', error);
    })
  }, [id])

  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value
    setMember({...member})
  }

  const handleClickModify = () => {
    putOne(member)
    .then(() => {
      setResult("Modified")
      alert("회원 정보 수정이 완료되었습니다.")
      moveToPath('/mypage/member/list')
    })
    .catch((error) => {
      console.error("회원 정보 수정 실패:", error)
      alert("회원 정보 수정에 실패했습니다.")
    })
  }

  const handleClickBack = () => {
      moveToPath('/mypage/member/list')
  }

  const handleClickDelete = () => {
    deleteOneByAdmin(id).then(result => {
      alert(`${id}번 회원을 삭제 하였습니다.`)
      setResult("Deleted")
      moveToPath('/mypage/member/list')
    })
}

  return (
    <Container fluid className='d-flex align-items-center justify-content-center'>
      <div className='mt-5 p-5'>
        <p className='title text-center mt-5 mb-5'>회원정보수정</p>

        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>이름</Form.Label>
          <Form.Control type="text" name='name' value={member.name}  readOnly className='w-75 border-0' />
        </Form.Group>

        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>아이디</Form.Label>
          <Form.Control type="text" name='email' value={member.email}  readOnly className='w-75 border-0' />
        </Form.Group>

        <Form.Group className="mb-5 d-flex align-items-center">
          <Form.Label className='fw-bold w-25'>비밀번호</Form.Label>
          <Form.Control type="password" name='password' value={member.password} onChange={handleChangeMember} className='w-75 pw-input' />
        </Form.Group>

        <div className='text-center d-flex justify-content-between'>
          <Button variant='primary' type='button' className='modi-button' onClick={handleClickModify}>수정</Button>
          <Button variant='secondary' type='button' className='modi-button' onClick={handleClickBack}>취소</Button>
        </div>

        <div className='text-center'>
          <Button variant='danger' type='button' className='w-100 delete-button' onClick={handleClickDelete}>회원삭제</Button>
        </div>

      </div>
    </Container>)
}

export default MemberModify