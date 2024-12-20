package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
