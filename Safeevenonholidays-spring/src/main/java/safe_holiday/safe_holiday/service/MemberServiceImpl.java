package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final SafeMemberRepository safeMemberRepository;

    //고유 번호 조회
    @Override
    public SafeMemberDTO get(Long id) {
        Optional<SafeMember> result = safeMemberRepository.findById(id);
        SafeMember safeMember = result.orElseThrow();
        return entityToDTO(safeMember);
    }

    //가입
    @Override
    public Long register(SafeMemberDTO safeMemberDTO) {
        SafeMember safeMember = DTOToEntity(safeMemberDTO);
        validateDuplicateMember(safeMember);
        SafeMember result = safeMemberRepository.save(safeMember);
        return result.getId();
    }

    //중복회원 검증
    private void validateDuplicateMember(SafeMember safeMember){
        Optional<SafeMember> findMember = safeMemberRepository.findByEmail(safeMember.getEmail());

        if(findMember.isPresent()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //회원 정보 수정
    @Override
    public void modify(SafeMemberDTO safeMemberDTO) {
        Optional<SafeMember> result = safeMemberRepository.findById(safeMemberDTO.getId());
        SafeMember safeMember = result.orElseThrow();

        safeMember.setPassword(safeMemberDTO.getPassword());

        safeMemberRepository.save(safeMember);
    }

    //삭제
    @Override
    public void remove(Long id) {
        safeMemberRepository.deleteById(id);
    }
}
