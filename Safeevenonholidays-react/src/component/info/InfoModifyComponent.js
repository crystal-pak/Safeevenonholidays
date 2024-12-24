import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { deleteOne, getOne, putOne } from '../../api/infoApi'
import { Form, Button } from 'react-bootstrap'

const initState = {
    subject : "",
    content : ""
}

const InfoModifyComponent = ({id}) => {
    const [info, setInfo] = useState({...initState})
    const {list, detail} = useCustomMove()

    const [result, setResult] = useState(null)

    useEffect(() => {
        getOne(id).then(data => {
            setInfo(data)
        })
    }, [id])

    const handleChangeInfo = (e) => {
        info[e.target.name] = e.target.value
        setInfo({...info})
    }

    const handleClickModify = () => {
        putOne(info).then(data => {
            console.log("수정 결과:", data);
            setResult('Modified')
            detail(id)
        })
    }

    const handleClickDelete = () => {
        deleteOne(id).then(data => {
            setResult('Deleted')
            list()
        })
    }

  return (
    <>
        <Form.Group className='mb-3' controlId='titleForm'>
        <Form.Label>제목</Form.Label>
        <Form.Control type={'text'} name='subject' value={info.subject} onChange={handleChangeInfo} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='contentForm'>
        <Form.Label>Content</Form.Label>
        <Form.Control type={'text'} name='content' value={info.content} onChange={handleChangeInfo} />
        </Form.Group>
        <Button variant='primary' type='button' onClick={handleClickModify}>수정</Button>
        <Button variant='danger' type='button' onClick={handleClickDelete}>삭제</Button>
    </>
  )
}

export default InfoModifyComponent