package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;
import safe_holiday.safe_holiday.service.MailService;
import safe_holiday.safe_holiday.service.MemberService;
import safe_holiday.safe_holiday.util.JWTUtil;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/member")
public class SafeMemberController {

    private final MemberService memberService;
    private final MailService mailService;

    //조회
    @GetMapping("/{id}")
    public SafeMemberDTO get(@PathVariable("id") Long id) {
        return memberService.get(id);
    }

    //리스트
    @GetMapping("/list")
    public PageResponseDTO<SafeMemberDTO> list(PageRequestDTO pageRequestDTO){
        return memberService.getlist(pageRequestDTO);
    }

    //가입
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody SafeMemberDTO safeMemberDTO) {
        Long id = memberService.register(safeMemberDTO);
        return Map.of("id", id);
    }

    //회원 정보 수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, @RequestBody SafeMemberDTO safeMemberDTO) {
        safeMemberDTO.setId(id);
        memberService.modify(safeMemberDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        memberService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }

    //카카오 가입
    @GetMapping("/kakao")
    public Map<String, Object> getMemberKakao(@RequestParam("accessToken") String accessToken) {

        SafeMemberDTO safeMemberDTO = memberService.getKakaoMember(accessToken);
        Map<String, Object> claims = safeMemberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }

    //카카오 회원가입 후 추가 정보 기입
    @PutMapping("/modify")
    public Map<String, String> kakaoModify(@RequestBody SafeMemberDTO safeMemberDTO) {
        memberService.modifyMember(safeMemberDTO);
        return Map.of("RESULT", "modified");
    }

    //아이디 찾기
    @GetMapping("/findid")
    public ResponseEntity<List<String>> findIds(@RequestParam String name) {
        List<String> emails = memberService.findEmailByName(name);
        return ResponseEntity.ok(emails);
    }

    //비밀번호 찾기
    @PostMapping("/findpassword")
    public ResponseEntity<String> sendTemporaryPassword(@RequestParam String email) {
        try {
            // 임시 비밀번호 전송 서비스 호출
            memberService.sendPasswordByEmail(email);

            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메일 전송 실패: " + e.getMessage());
        }
    }

}
