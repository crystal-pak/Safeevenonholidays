package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.HospitalDTO;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;

import java.util.stream.Collectors;

public interface MemberService {

    //고유 번호 조회
    SafeMemberDTO get(Long id);

    PageResponseDTO<SafeMemberDTO> getlist(PageRequestDTO pageRequestDTO);

    //가입
    Long register(SafeMemberDTO safeMemberDTO);

    //회원 정보 수정
    void modify(SafeMemberDTO safeMemberDTO);

    //삭제
    void remove(Long id);

    SafeMemberDTO getKakaoMember(String accessToken);

    void modifyMember(SafeMemberDTO safeMemberDTO);

    default SafeMemberDTO entityToDTO(SafeMember safeMember){
        SafeMemberDTO safeMemberDTO = SafeMemberDTO.memberBuilder()
                .id(safeMember.getId())
                .email(safeMember.getEmail())
                .name(safeMember.getName())
                .nickName(safeMember.getNickName())
                .social(safeMember.isSocial())
                .password(safeMember.getPassword())
                .roleNames(safeMember.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()))
                .build();
        return safeMemberDTO;
    }

    default SafeMember DTOToEntity(SafeMemberDTO safeMemberDTO){
        SafeMember safeMember = SafeMember.builder()
                .id(safeMemberDTO.getId())
                .email(safeMemberDTO.getEmail())
                .name(safeMemberDTO.getName())
                .nickName(safeMemberDTO.getNickName())
                .social(safeMemberDTO.isSocial())
                .password(safeMemberDTO.getPassword())
                .build();
        return safeMember;
    }
}
