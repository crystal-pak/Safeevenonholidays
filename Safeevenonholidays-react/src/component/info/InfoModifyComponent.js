import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { deleteOne, getOne, putOne } from '../../api/infoApi'
import { Form, Button, Container } from 'react-bootstrap'

const initState = {
    subject: "",
    content: ""
}

const InfoModifyComponent = ({ id }) => {
    const [info, setInfo] = useState({ ...initState })
    const { list, detail } = useCustomMove()

    const [result, setResult] = useState(null)

    useEffect(() => {
        getOne(id).then(data => {
            setInfo(data)
        })
    }, [id])

    const handleChangeInfo = (e) => {
        info[e.target.name] = e.target.value
        setInfo({ ...info })
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
            <Container className='p-3'>
                <p className="title fw-bold">자료실 글 수정</p>
                <Form.Group className='mb-3' controlId='titleForm'>
                    <Form.Label className="d-none">제목</Form.Label>
                    <Form.Control type={'text'} name='subject' value={info.subject} onChange={handleChangeInfo} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='contentForm'>
                    <Form.Label className="d-none">Content</Form.Label>
                    <Form.Control as='textarea' type={'text'} name='content' value={info.content} onChange={handleChangeInfo}  style={{ height: "60vh" }} />
                </Form.Group>
                <div className='text-end'>
                <Button variant='primary' type='button' onClick={handleClickModify} className='add-button'>수정</Button>
                <Button variant='danger' type='button' onClick={handleClickDelete} className='add-button ms-3'>삭제</Button>
                </div>
            </Container>
        </>
    )
}

export default InfoModifyComponent