package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.repository.InfoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final InfoRepository infoRepository;

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
        // 임시로 "1번 멤버"를 author에 설정, 나중에 수정할 것 **
        SafeMember member = new SafeMember();
        member.setId(1L);

        infoDTO.setAuthor(member);

        Info info = DTOToEntity(infoDTO);
        Info result = infoRepository.save(info);
        return result.getId();
    }

    //수정
    @Override
    public void modify(InfoDTO infoDTO) {
        Optional<Info> result = infoRepository.findById(infoDTO.getId());
        Info info = result.orElseThrow();

        info.setAuthor(infoDTO.getAuthor());
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
