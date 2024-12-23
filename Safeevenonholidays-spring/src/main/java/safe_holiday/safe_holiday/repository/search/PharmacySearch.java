package safe_holiday.safe_holiday.repository.search;

import org.springframework.data.domain.Page;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

public interface PharmacySearch {

    Page<Pharmacy> search(PageRequestDTO pageRequestDTO);
}
