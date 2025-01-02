package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.dto.AnswerDTO;

import java.time.LocalDate;
import java.util.List;

public interface AnswerService {

    //조회
    AnswerDTO get(Long id);

    //전체 조회
    public List<Answer> getList(Long questionId);

    //등록
    Long register(Long questionId, AnswerDTO answerDTO);

    //수정
    void modify(AnswerDTO answerDTO);

    //삭제
    void remove(Long id);

    default AnswerDTO entityToDTO(Answer answer){
        AnswerDTO answerDTO = AnswerDTO.builder()
                .id(answer.getId())
                .content(answer.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(answer.getAuthor())
                .question(answer.getQuestion())
                .build();
        return answerDTO;
    }

    default Answer DTOToEntity(AnswerDTO answerDTO){
        Answer answer = Answer.builder()
                .id(answerDTO.getId())
                .content(answerDTO.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(answerDTO.getAuthor())
                .question(answerDTO.getQuestion())
                .build();
        return answer;
    }

}
