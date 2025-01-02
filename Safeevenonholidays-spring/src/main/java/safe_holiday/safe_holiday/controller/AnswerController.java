package safe_holiday.safe_holiday.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.domain.Answer;
import safe_holiday.safe_holiday.dto.AnswerDTO;
import safe_holiday.safe_holiday.service.AnswerService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerService answerService;

    //답변 조회
    @GetMapping("/{id}")
    public AnswerDTO get(@PathVariable("id") Long id){
        return answerService.get(id);
    }

    // 특정 질문에 대한 모든 답변 조회
    @GetMapping("/list/{questionId}")
    public List<Answer> getListByQuestionId(@PathVariable Long questionId) {
        return answerService.getList(questionId);
    }

    // 답변 등록
    @PostMapping("/{questionId}")
    public Map<String, Long> register(@PathVariable("questionId") Long questionId, @RequestBody AnswerDTO answerDTO) {
        Long answerId = answerService.register(questionId, answerDTO);
        return Map.of("id", answerId);
    }

    //답변수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, @RequestBody AnswerDTO answerDTO) {
        answerDTO.setId(id);
        answerService.modify(answerDTO);
        return Map.of("RESULT","SUCCESS");
    }

    //답변삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id) {
        answerService.remove(id);
        return Map.of("RESULT","SUCCESS");

    }

}
