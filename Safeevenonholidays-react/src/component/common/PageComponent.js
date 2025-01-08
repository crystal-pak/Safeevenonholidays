import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const PageComponent = ({ serverData, list }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 반응형으로 보여줄 페이지 번호 개수 설정
  const getVisiblePages = () => {
    if (windowWidth <= 576) return 3; // 작은 화면에서는 3개만 표시
    if (windowWidth <= 768) return 5; // 중간 화면에서는 5개만 표시
    return serverData.pageNumList.length; // 큰 화면에서는 전체 표시
  };

  const visiblePages = getVisiblePages();

  // 페이지 번호를 줄이기 위한 로직
  const renderPageNumbers = () => {
    const totalPages = serverData.pageNumList.length;
    const currentPage = serverData.current;

    if (totalPages <= visiblePages) {
      return serverData.pageNumList;
    }

    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start === 1) {
      end = Math.min(visiblePages, totalPages);
    } else if (end === totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    return serverData.pageNumList.slice(start - 1, end); // 반환할 페이지 번호 범위
  };

  const pageNumbersToShow = renderPageNumbers();

  return (
    <>
      <Pagination className="justify-content-center">
        {serverData.prev ? (
          <Pagination.Prev onClick={() => list({ page: serverData.prevPage })} />
        ) : null}

        {pageNumbersToShow[0] > 1 && <Pagination.Item onClick={() => list({ page: 1 })}>1</Pagination.Item>}
        {pageNumbersToShow[0] > 2 && <Pagination.Ellipsis disabled />}

        {pageNumbersToShow.map((item) => (
          <Pagination.Item
            key={item}
            active={serverData.current === item}
            onClick={() => list({ page: item })}
          >
            {item}
          </Pagination.Item>
        ))}

        {pageNumbersToShow[pageNumbersToShow.length - 1] < serverData.totalPage - 1 && (
          <Pagination.Ellipsis disabled />
        )}
        {pageNumbersToShow[pageNumbersToShow.length - 1] < serverData.totalPage && (
          <Pagination.Item onClick={() => list({ page: serverData.totalPage })}>
            {serverData.totalPage}
          </Pagination.Item>
        )}

        {serverData.next ? (
          <Pagination.Next onClick={() => list({ page: serverData.nextPage })} />
        ) : null}
      </Pagination>
    </>
  );
};

export default PageComponent;
