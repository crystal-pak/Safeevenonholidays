package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.QuestionDTO;

import java.time.LocalDate;

public interface QuestionService {

    //조회
    QuestionDTO get(Long id);

    //등록
    Long register(QuestionDTO questionDTO);

    //수정
    void modify(QuestionDTO questionDTO);

    //삭제
    void remove(Long id);

    PageResponseDTO<QuestionDTO> getlist(PageRequestDTO pageRequestDTO);

    default QuestionDTO entityToDTO(Question question){
        QuestionDTO questionDTO = QuestionDTO.builder()
                .id(question.getId())
                .subject(question.getSubject())
                .content(question.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(question.getAuthor())
                .build();

        return questionDTO;
    }

    default Question DTOToEntity(QuestionDTO questionDTO){
        Question question = Question.builder()
                .id(questionDTO.getId())
                .subject(questionDTO.getSubject())
                .content(questionDTO.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(questionDTO.getAuthor())
                .build();

        return question;
    }
}
