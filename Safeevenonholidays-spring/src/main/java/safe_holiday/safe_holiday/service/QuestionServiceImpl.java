package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.QuestionDTO;
import safe_holiday.safe_holiday.repository.QuestionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    //조회
    @Override
    public QuestionDTO get(Long id) {
        Optional<Question> result = questionRepository.findById(id);
        Question question = result.orElseThrow();
        return entityToDTO(question);
    }

    //등록
    @Override
    public Long register(QuestionDTO questionDTO) {
        Question question = DTOToEntity(questionDTO);
        Question result = questionRepository.save(question);
        return result.getId();
    }

    //수정
    @Override
    public void modify(QuestionDTO questionDTO) {
        Optional<Question> result = questionRepository.findById(questionDTO.getId());
        Question question = result.orElseThrow();

        question.setSubject(questionDTO.getSubject());
        question.setContent(questionDTO.getContent());
        question.setCreateDate(questionDTO.getCreateDate());
        question.setModifyDate(questionDTO.getModifyDate());

        questionRepository.save(question);
    }

    //삭제
    @Override
    public void remove(Long id) {
        questionRepository.deleteById(id);
    }

    //페이징 처리
    @Override
    public PageResponseDTO<QuestionDTO> getlist(PageRequestDTO pageRequestDTO) {

        //가져온다, Todo의 리스트
        Page<Question> result = questionRepository.search(pageRequestDTO);

        List<QuestionDTO> dtoList = result.get().map(question -> entityToDTO(question)).collect(Collectors.toList());

        PageResponseDTO<QuestionDTO> responseDTO = PageResponseDTO.<QuestionDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

        return responseDTO;
    }
}