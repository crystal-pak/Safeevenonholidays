package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.dto.AnswerDTO;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("SELECT DISTINCT a FROM Answer a " +
            "JOIN FETCH a.author " +
            "JOIN FETCH a.question q " +
            "WHERE q.id = :questionId")
    List<Answer> findByQuestionId(Long questionId);
}
