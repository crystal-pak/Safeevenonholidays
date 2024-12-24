import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import useCustomMove from '../../hooks/useCustomMove'
import { getList } from '../../api/infoApi'
import PageComponent from '../common/PageComponent'

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
  const {page, size, list, refresh, read} = useCustomMove()
  const [serverData, setServerData] = useState(initState)

  useEffect(() => {
    getList({page, size}).then(data => {
      console.log(data)
      setServerData(data)
    })
  }, [page, size, refresh])

  return (
    <>
      <Table striped bordered hover>
      <thead className='text-center'>
        <tr>
          <th>#</th>
          <th className='w-75'>title</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {serverData.dtoList.map((item) => (
          <tr>
            <td className='text-center'>{item.id}</td>
            <td
              onClick={() => read(item.id)}
              style={{cursor: 'pointer'}}
            >{item.subject}</td>
            <td className='text-center'>{item.createDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <PageComponent serverData={serverData} list={list} />
    </>
  )
}

export default InfoListComponent