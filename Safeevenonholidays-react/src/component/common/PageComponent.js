import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';

const PageComponent = ({ serverData, list }) => {
  const handlePageChange = (page) => {
    list({ page }); // 페이지 변경 시 서버 요청
  };

  return (
    <div className="justify-content-center mt-3">
      {serverData.totalPage > 1 && ( // 전체 페이지가 1개 이상일 때만 페이지네이션 표시
        <ResponsivePagination
          current={serverData.current} // 현재 페이지 번호
          total={serverData.totalPage} // 전체 페이지 수
          onPageChange={handlePageChange} // 페이지 변경 핸들러
        />
      )}
    </div>
  );
};

export default PageComponent;
