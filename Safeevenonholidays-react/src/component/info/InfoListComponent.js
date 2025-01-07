import React, { useEffect, useState } from 'react'
import { Table, Button, Container } from 'react-bootstrap'
import useCustomMove from '../../hooks/useCustomMove'
import { getList } from '../../api/infoApi'
import PageComponent from '../common/PageComponent'
import { useSelector } from 'react-redux'

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

const InfoListComponent = () => {
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
      <p className="title fw-bold">자료실 페이지</p>
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
            {serverData.dtoList.map((item, index) => (
              <tr>
                <td className='text-center'>{serverData.totalCount - ((page - 1) * size + index)}</td>
                <td
                  onClick={() => detail(item.id)}
                  style={{ cursor: 'pointer' }}
                >{item.subject}</td>
                <td className='text-center'>{item.author.name}</td>
                <td className='text-center'>{item.createDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='text-end'>
          {loginState.roleNames.length > 1 ?
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

export default InfoListComponent