package safe_holiday.safe_holiday.repository;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import safe_holiday.safe_holiday.domain.SafeMember;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class SafeMemberRepositoryTest {

    @Autowired private SafeMemberRepository safeMemberRepository;

    @Test
    void 회원추가() {
        SafeMember member = SafeMember.builder()
                .email("user2@email.com")
                .password("password")
                .grade(SafeMember.Grade.USER)
                .name("이기자")
                .social(false)
                .build();

        safeMemberRepository.save(member);
    }

    @Test
    void 일반회원10명추가() {
        for(int i = 1; i <= 10; i++) {
            SafeMember member = SafeMember.builder()
                    .email("user" + i + "@email.com")
                    .password("password" + i)
                    .grade(SafeMember.Grade.USER)
                    .name("홍길동")
                    .social(false)
                    .build();

            safeMemberRepository.save(member);
        }
    }
}