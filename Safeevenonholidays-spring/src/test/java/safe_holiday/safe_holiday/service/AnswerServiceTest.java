package safe_holiday.safe_holiday.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.AnswerDTO;
import safe_holiday.safe_holiday.repository.AnswerRepository;
import safe_holiday.safe_holiday.repository.QuestionRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnswerServiceTest {

    @Autowired AnswerService answerService;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    SafeMemberRepository safeMemberRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Test
    void 답변수정() {
        long id = 1L;
        Optional<Answer> findAnswer = answerRepository.findById(id);

        Answer answer = findAnswer.orElseThrow();
        answer.setContent("답변 수정");
        answer.setModifyDate(LocalDate.now());

        answerRepository.save(answer);
    }

    @Test
    void 삭제() {
        long id = 1L;
        answerRepository.deleteById(id);
    }
}