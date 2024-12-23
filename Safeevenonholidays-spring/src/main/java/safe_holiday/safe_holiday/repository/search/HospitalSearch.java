package safe_holiday.safe_holiday.repository.search;

import org.springframework.data.domain.Page;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

public interface HospitalSearch {

    Page<Hospital> search(PageRequestDTO pageRequestDTO);
}
