import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Table } from 'react-bootstrap'
import { getList } from './../../api/helpApi';
import useCustomMove from './../../hooks/useCustomMove';
import PageComponent from './../common/PageComponent';

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const HelpListComponent = () => {
  const { page, size, list, refresh, detail, add } = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const loginState = useSelector(state => state.loginSlice)

  useEffect(() => {
    getList({ page, size }).then(data => {
      console.log(data)
      setServerData(data)
    })
  }, [page, size, refresh])

  return (
    <>
      <Container className="mt-4 mb-4">
      <p className="title fw-bold text-center col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">QnA 페이지</p>
        <Table className="text-start mt-5">
          <thead className='text-center'>
            <tr>
              <th>글번호</th>
              <th className='w-50'>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((question, index) => (
              <tr>
                <td className='text-center'>{serverData.totalCount - ((page - 1) * size + index)}</td>
                <td
                  onClick={() => detail(question.id)}
                  style={{ cursor: 'pointer' }}
                >{question.subject}</td>
                <td className='text-center'>{question.author.name}</td>
                <td className='text-center'>{question.createDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='text-end'>
                  {loginState.roleNames.length > 0 ?
                    <Button onClick={add}>글작성</Button>
                    :
                    <></>
                  }
                </div>
        <PageComponent serverData={serverData} list={list} />

      </Container>

    </>

  )
}

export default HelpListComponent