package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Info;
import safe_holiday.safe_holiday.dto.InfoDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;

public interface InfoService {

    //조회
    InfoDTO get(Long id);

    //등록
    Long register(InfoDTO infoDTO);

    //수정
    void modify(InfoDTO infoDTO);

    //삭제
    void remove(Long id);

    PageResponseDTO<InfoDTO> getlist(PageRequestDTO pageRequestDTO);

    //엔터티를 DTO로 변환
    default InfoDTO entityToDTO(Info info){
        InfoDTO infoDTO = InfoDTO.builder()
                .id(info.getId())
                .subject(info.getSubject())
                .content(info.getContent())
                .createDate(info.getCreateDate())
                .modifyDate(info.getModifyDate())
                .author(info.getAuthor())
                .build();
        return infoDTO;
    }

    //DTO를 엔터티로 변환
    default Info DTOToEntity(InfoDTO infoDTO){
        Info info = Info.builder()
                .id(infoDTO.getId())
                .subject(infoDTO.getSubject())
                .content(infoDTO.getContent())
                .createDate(infoDTO.getCreateDate())
                .modifyDate(infoDTO.getModifyDate())
                .author(infoDTO.getAuthor())
                .build();
        return info;
    }
}
