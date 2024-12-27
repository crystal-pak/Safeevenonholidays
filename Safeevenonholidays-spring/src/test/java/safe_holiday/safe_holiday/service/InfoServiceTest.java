package safe_holiday.safe_holiday.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.repository.InfoRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class InfoServiceTest {

    @Autowired InfoService infoService;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    SafeMemberRepository safeMemberRepository;

    @Test
    void 등록() {
        Optional<SafeMember> member = safeMemberRepository.findById(1L);

        InfoDTO infoDTO = InfoDTO.builder()
                .subject("등록테스트")
                .content("등록테스트")
                .author(member.get())
                .createDate(LocalDate.now())
                .build();

        infoService.register(infoDTO);
    }

    @Test
    @WithMockUser(username = "admin@email.com")
    void 등록100개() {
        Optional<SafeMember> member = safeMemberRepository.findById(9L);

        for(int i = 1; i<=100; i++) {
            InfoDTO infoDTO = InfoDTO.builder()
                    .subject("제목" + i)
                    .content("내용" + i)
                    .author(member.get())
                    .createDate(LocalDate.now())
                    .build();

            infoService.register(infoDTO);
        }
    }

    @Test
    void 수정() {
        long id = 1L;
        Optional<Info> findInfo = infoRepository.findById(id);

        Info info = findInfo.orElseThrow();
        info.setSubject("수정테스트");
        info.setContent("수정테스트");
        info.setModifyDate(LocalDate.now());

        infoRepository.save(info);
    }

    @Test
    void 삭제() {
        long id = 1L;
        infoRepository.deleteById(id);
    }

    @Test
    void 페이징리스트() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .build();
        log.info("페이징리스트의 기본값 {}", infoService.getlist(pageRequestDTO));
    }
}