package safe_holiday.safe_holiday.repository.search;

import org.springframework.data.domain.Page;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

public interface MemberSearch {

    Page<SafeMember> search(PageRequestDTO pageRequestDTO);
}
