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
                .nickName("관리자")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);
        member.addRole(MemberRole.ADMIN);

        safeMemberRepository.save(member);
    }

    @Test
    void 카카오사용자추가() {
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("kakao@email.com")
                .password(encodedPassword)
                .name("카카오 사용자")
                .nickName("카카오 사용자")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

        safeMemberRepository.save(member);
    }

    @Test
    void 박수정추가() {
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("1@email.com")
                .password(encodedPassword)
                .name("박수정")
                .nickName("박수정")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

        safeMemberRepository.save(member);
    }

    @Test
    void 김다현추가() {
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("2@email.com")
                .password(encodedPassword)
                .name("김다현")
                .nickName("김다현")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

        safeMemberRepository.save(member);
    }

    @Test
    void 황서현추가() {
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("3@email.com")
                .password(encodedPassword)
                .name("황서현")
                .nickName("황서현")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

        safeMemberRepository.save(member);
    }

    @Test
    void 이동광추가() {
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("4@email.com")
                .password(encodedPassword)
                .name("이동광")
                .nickName("이동광")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

        safeMemberRepository.save(member);
    }

    @Test
    void 이승우추가() {
        String password = "1234";
        String encodedPassword = passwordEncoder.encode(password);

        SafeMember member = SafeMember.builder()
                .email("5@email.com")
                .password(encodedPassword)
                .name("이승우")
                .nickName("이승우")
                .social(false)
                .build();

        member.addRole(MemberRole.USER);

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