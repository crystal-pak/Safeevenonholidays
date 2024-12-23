package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;
import safe_holiday.safe_holiday.service.MemberService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class SafeMemberController {

    private final MemberService memberService;
    private final SafeMemberRepository safeMemberRepository;

    //조회
    @GetMapping("/{id}")
    public SafeMemberDTO get(@PathVariable("id") Long id) {
        return memberService.get(id);
    }

    //가입
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody SafeMemberDTO safeMemberDTO) {
        Long id = memberService.register(safeMemberDTO);
        return Map.of("id", id);
    }

    //회원 정보 수정
    @PutMapping("/{id}")
    public SafeMemberDTO modify(@PathVariable("id") Long id, @RequestBody SafeMemberDTO safeMemberDTO) {
        safeMemberDTO.setId(id);
        memberService.modify(safeMemberDTO);
        return memberService.get(id);
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        memberService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
