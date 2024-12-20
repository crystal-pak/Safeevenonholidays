package safe_holiday.safe_holiday.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {

    //현재 페이지에서 표시할 데이터 목록
    private List<E> dtoList;

    //현재 페이지에 표시될 페이지 번호의 목록
    private List<Integer> pageNumList;

    //현재 페이지 정보(클라이언트가 요청한 페이지 정보를 담고있는 객체)
    private PageRequestDTO pageRequestDTO;

    //이전, 다음 페이지가 있는지 여부(true or false)
    private boolean prev, next;

    //전체 데이터 수, 이전페이지, 다음페이지, 총페이지, 현재페이지
    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll") //빌더 메서드 이름을 지정해줄 수 있다.
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long totalCount){
        this.dtoList = dtoList; //현재 페이지의 데이터 목록
        this.pageRequestDTO = pageRequestDTO; //현재 페이지와 크기 정보
        this.totalCount = (int) totalCount; //전체 데이터 개수

        //끝값 계산 : end = (현재 페이지 번호 / 10.0 -> 올림) * 10
        int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0) * 10);

        //시작값
        int start = end - 9;

        //마지막 페이지
        // last = ceil(전체 데이터 개수 / 페이지 크기)
        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        //end가 실제 마지막 페이지(last)를 넘지 않도록 합니다.
        end = end > last ? last : end;

        //이전, 1보다 크면 true
        this.prev = start > 1;

        //다음, 만약 끝값이 39이고 한 페이지당 10개씩이면 39*10 = 390 => totalCount가 더크면 true, 끝값의 데이터가 전체 데이터를 초과하지 않으면 true
        this.next = totalCount > end * pageRequestDTO.getSize();

        //페이지 넘버 리스트
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        //prev와 next는 있을 수도 있고 없을 수도 있다.
        this.prevPage = prev ? start - 1 : 0;
        this.nextPage = next ? end + 1 : 0;

        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();
    }
}
