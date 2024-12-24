import React, { useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { postAdd } from '../../api/infoApi'
import { Form, Button } from 'react-bootstrap'

const initState = {
    subject: "",
    content: ""
  }

const InfoAddComponent = () => {
  const [info, setInfo] = useState(initState)
  const [result, setResult] = useState(null)
  const {list} = useCustomMove()

  const handleChangeInfo = (e) => {
    info[e.target.name] = e.target.value
    setInfo({...info})
  }

  const handleClickAdd = () => {
    console.log("전송 데이터:", info);
    postAdd(info).then(result => {
        setResult(result.id)
        setInfo({...initState})
        setResult(null)
        list()
    }).catch(e => {
        console.error(e)
    })
  }
  
  return (
    <>
        <Form.Group className='mb-3' controlId='titleForm'>
        <Form.Label>제목</Form.Label>
        <Form.Control type={'text'} name='subject' placeholder='제목을 입력하세요.' onChange={handleChangeInfo} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label>Content</Form.Label>
        <Form.Control type={'text'} name='content' placeholder='내용을 입력하세요.' onChange={handleChangeInfo} />
        </Form.Group>
        <Button variant='primary' type='button' onClick={handleClickAdd}>등록</Button>
    </>
  )
}

export default InfoAddComponent