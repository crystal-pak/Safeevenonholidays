package safe_holiday.safe_holiday.repository.search;

import org.springframework.data.domain.Page;
import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

public interface InfoSearch {
    Page<Info> search(PageRequestDTO pageRequestDTO);
}
