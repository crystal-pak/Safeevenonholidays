package safe_holiday.safe_holiday.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.QuestionDTO;
import safe_holiday.safe_holiday.service.QuestionService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;

    //특정 질문 조회
    @GetMapping("/{id}")
    public QuestionDTO get(@PathVariable("id") Long id) {
        return questionService.get(id);
    }

    //질문 리스트 조회
    @GetMapping("/list")
    public PageResponseDTO<QuestionDTO> list(PageRequestDTO pageRequestDTO) {
        return questionService.getlist(pageRequestDTO);
    }

    //질문 등록
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody QuestionDTO questionDTO) {
        Long id = questionService.register(questionDTO);
        return Map.of("id", id);
    }

    //질문수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id,@RequestBody QuestionDTO questionDTO) {
        questionDTO.setId(id);
        questionService.modify(questionDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    //질문 삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id) {
        questionService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
