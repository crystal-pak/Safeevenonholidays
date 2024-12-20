package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.repository.search.InfoSearch;

public interface InfoRepository extends JpaRepository<Info, Long>, InfoSearch {
}
