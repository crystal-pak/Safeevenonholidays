package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.repository.search.QuestionSearch;

public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionSearch {
}
