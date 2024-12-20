package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.dto.AnswerDTO;
import safe_holiday.safe_holiday.repository.AnswerRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;

    //조회
    @Override
    public AnswerDTO get(Long id) {
        Optional<Answer> result = answerRepository.findById(id);
        Answer answer = result.orElseThrow();
        return entityToDTO(answer);
    }

    //등록
    @Override
    public Long register(AnswerDTO answerDTO) {
        Answer answer = DTOToEntity(answerDTO);
        Answer result = answerRepository.save(answer);
        return result.getId();
    }

    //수정
    @Override
    public void modify(AnswerDTO answerDTO) {
        Optional<Answer> result = answerRepository.findById(answerDTO.getId());
        Answer answer = result.orElseThrow();

        answer.setContent(answerDTO.getContent());
        answer.setModifyDate(answerDTO.getModifyDate());

        answerRepository.save(answer);
    }

    //삭제
    @Override
    public void remove(Long id) {
        answerRepository.deleteById(id);
    }
}
