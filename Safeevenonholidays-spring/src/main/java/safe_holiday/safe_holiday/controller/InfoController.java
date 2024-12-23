package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.service.InfoService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/info")
public class InfoController {

    private final InfoService infoService;

    //조회
    @GetMapping("/{id}")
    public InfoDTO get(@PathVariable("id") Long id) {
        return infoService.get(id);
    }

    //리스트
    @GetMapping("/list")
    public PageResponseDTO<InfoDTO> list(PageRequestDTO pageRequestDTO){
        return infoService.getlist(pageRequestDTO);
    }

    //등록
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody InfoDTO infoDTO){
        Long id = infoService.register(infoDTO);
        return Map.of("id", id);
    }

    //수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, @RequestBody InfoDTO infoDTO) {
        //수정하기 전에 안전하게 id값을 넣어준다.
        infoDTO.setId(id);
        infoService.modify(infoDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        infoService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
