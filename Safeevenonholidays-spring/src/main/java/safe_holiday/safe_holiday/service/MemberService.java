package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;

public interface MemberService {

    //고유 번호 조회
    SafeMemberDTO get(Long id);

    //가입
    Long register(SafeMemberDTO safeMemberDTO);

    //회원 정보 수정
    void modify(SafeMemberDTO safeMemberDTO);

    //삭제
    void remove(Long id);


    default SafeMemberDTO entityToDTO(SafeMember safeMember){
        SafeMemberDTO safeMemberDTO = SafeMemberDTO.builder()
                .id(safeMember.getId())
                .email(safeMember.getEmail())
                .name(safeMember.getName())
                .nickName(safeMember.getNickName())
                .social(safeMember.isSocial())
                .password(safeMember.getPassword())
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
