package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final SafeMemberRepository safeMemberRepository;

    //loadUserByUsername()에서 사용자 정보를 조회하고 해당 사용자의 인증과 권한을 처리하게 된다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        SafeMember member = safeMemberRepository.getWithRoles(username);

        if(member == null){
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        SafeMemberDTO safeMemberDTO = new SafeMemberDTO(
                member.getId(),
                member.getEmail(),
                member.getPassword(),
                member.getName(),
                member.getNickName(),
                member.isSocial(),
                member.getMemberRoleList()
                        .stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));

        return (UserDetails) safeMemberDTO;
    }
}
