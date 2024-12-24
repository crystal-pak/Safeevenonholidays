import React from 'react'
import { Pagination } from 'react-bootstrap'

const PageComponent = ({serverData, list}) => {
  console.log("현재페이지" + serverData.current)

  return (
    <> 
    <Pagination className='justify-content-center'>
        {serverData.prev?
        <Pagination.Prev
            onClick = {() => list({page : serverData.prevPage})}
        /> : <></>}
    
        {serverData.pageNumList.map((item) => (
            <Pagination.Item
                active = {serverData.current === item}
                onClick = {() => list({page : item})}
            >{item}</Pagination.Item>
        ))}
        
        {serverData.next? <Pagination.Next
            onClick = {() => list({page : serverData.nextPage})}
        /> : <></>}
    </Pagination>
    </>
  )
}

export default PageComponent