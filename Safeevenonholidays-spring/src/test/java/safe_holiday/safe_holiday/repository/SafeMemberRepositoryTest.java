package safe_holiday.safe_holiday.repository;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import safe_holiday.safe_holiday.domain.MemberRole;
import safe_holiday.safe_holiday.domain.SafeMember;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class SafeMemberRepositoryTest {

    @Autowired private SafeMemberRepository safeMemberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void 관리자추가() {
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("admin@email.com")
                .password(encodedPassword)
                .name("관리자")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);
        member.addRole(MemberRole.ADMIN);

        safeMemberRepository.save(member);
    }

    @Test
    void 일반회원10명추가() {
        for(int i = 1; i <= 10; i++) {
            String password = "password";
            String encodedPassword = passwordEncoder.encode(password);

            SafeMember member = SafeMember.builder()
                    .email("user" + i + "@email.com")
                    .password(encodedPassword)
                    .name("회원" + i)
                    .social(false)
                    .build();

            member.addRole(MemberRole.USER);

            safeMemberRepository.save(member);
        }
    }

    @Test
    void 카카오회원삭제() {
        String email = "3846973570@email.com";

        SafeMember member = safeMemberRepository.getWithRoles(email);
        if(member == null){
            log.info("회원이 존재하지 않습니다. 이메일 : {}", email);
            return;
        }

        //회원 삭제
        safeMemberRepository.delete(member);
        log.info("회원 삭제 완료 {}", email);
    }
}