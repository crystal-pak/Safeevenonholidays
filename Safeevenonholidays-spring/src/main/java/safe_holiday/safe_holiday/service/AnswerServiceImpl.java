package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.AnswerDTO;
import safe_holiday.safe_holiday.repository.AnswerRepository;
import safe_holiday.safe_holiday.repository.QuestionRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final SafeMemberRepository safeMemberRepository;

    //조회
    @Override
    public AnswerDTO get(Long id) {
        Optional<Answer> result = answerRepository.findById(id);
        Answer answer = result.orElseThrow();
        return entityToDTO(answer);
    }

    //전체 조회
    @Override
    public List<Answer> getList(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    //등록
    @Override
    public Long register(Long questionId, AnswerDTO answerDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("현재 로그인된 사용자 이름: {}", username);

        // 사용자 정보 조회 및 예외 처리
        SafeMember member = safeMemberRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + username));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Answer 엔티티 생성 및 저장
        Answer answer = DTOToEntity(answerDTO);
        answer.setAuthor(member);
        answer.setQuestion(question);

        Answer result = answerRepository.save(answer);
        return result.getId();
    }

    //수정
    @Override
    public void modify(AnswerDTO answerDTO) {
        Optional<Answer> result = answerRepository.findById(answerDTO.getId());
        Answer answer = result.orElseThrow();

        answer.setContent(answerDTO.getContent());
        answer.setModifyDate(LocalDate.now());

        answerRepository.save(answer);
    }

    //삭제
    @Override
    public void remove(Long id) {
        answerRepository.deleteById(id);
    }
}
