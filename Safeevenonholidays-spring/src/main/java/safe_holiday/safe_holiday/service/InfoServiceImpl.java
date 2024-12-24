package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.repository.InfoRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final InfoRepository infoRepository;

    private final SafeMemberRepository safeMemberRepository;

    //조회
    @Override
    public InfoDTO get(Long id){
        Optional<Info> result = infoRepository.findById(id);
        Info info = result.orElseThrow();
        return entityToDTO(info);
    }

    //등록
    @Override
    public Long register(InfoDTO infoDTO) {
        /// 현재 로그인한 사용자 이름 가져오기
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("현재 로그인된 사용자 이름: {}", username);

        // 사용자 정보 조회 및 예외 처리
        SafeMember member = safeMemberRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + username));

        // Info 엔티티 생성 및 저장
        Info info = DTOToEntity(infoDTO);
        info.setAuthor(member);

        Info result = infoRepository.save(info);
        return result.getId();
    }

    //수정
    @Override
    public void modify(InfoDTO infoDTO) {
        Optional<Info> result = infoRepository.findById(infoDTO.getId());
        Info info = result.orElseThrow();

        info.setSubject(infoDTO.getSubject());
        info.setContent(infoDTO.getContent());
        info.setModifyDate(LocalDateTime.now());

        infoRepository.save(info);
    }

    //삭제
    @Override
    public void remove(Long id) {
        infoRepository.deleteById(id);

    }

    //페이징 처리
    @Override
    public PageResponseDTO<InfoDTO> getlist(PageRequestDTO pageRequestDTO) {

        Page<Info> result = infoRepository.search(pageRequestDTO);

        List<InfoDTO> dtoList = result.get().map(info -> entityToDTO(info)).collect(Collectors.toList());

        PageResponseDTO<InfoDTO> responseDTO = PageResponseDTO.<InfoDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

        return responseDTO;
    }
}
