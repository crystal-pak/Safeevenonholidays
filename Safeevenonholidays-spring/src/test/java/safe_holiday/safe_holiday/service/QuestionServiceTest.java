package safe_holiday.safe_holiday.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.QuestionDTO;
import safe_holiday.safe_holiday.repository.QuestionRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class QuestionServiceTest {

    @Autowired
    QuestionService questionService;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SafeMemberRepository safeMemberRepository;

    @Test
    void 등록10개() {
        Optional<SafeMember> member = safeMemberRepository.findById(1L);

        for(int i = 1; i<=10; i++) {
            QuestionDTO questionDTO = QuestionDTO.builder()
                    .subject("제목" + i)
                    .content("내용" + i)
                    .author(member.get())
                    .createDate(LocalDate.now())
                    .build();

            questionService.register(questionDTO);
        }
    }

    @Test
    void 수정() {
        long id = 1L;
        Optional<Question> findQuestion = questionRepository.findById(id);

        Question question = findQuestion.orElseThrow();
        question.setSubject("수정");
        question.setContent("수정");
        question.setModifyDate(LocalDate.now());

        questionRepository.save(question);
    }

    @Test
    void 삭제() {
        long id = 1L;
        questionRepository.deleteById(id);
    }

    @Test
    void 페이징리스트() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .build();
        log.info("페이징리스트의 기본값 {}", questionService.getlist(pageRequestDTO));
    }
}