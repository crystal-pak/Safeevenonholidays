package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import safe_holiday.safe_holiday.domain.MemberRole;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.KakaoUserInfoDTO;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.util.LinkedHashMap;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final SafeMemberRepository safeMemberRepository;

    private final PasswordEncoder passwordEncoder;

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

    //accessToken을 이용해서 사용자 정보 가져오기 => 기존 회원 정보가 있는 경우, 없는 경우
    @Override
    public SafeMemberDTO getKakaoMember(String accessToken) {
        KakaoUserInfoDTO kakaoUserInfo = getNicknameFromKakaoAccessToken(accessToken);
        log.info("가져온 nickName {}", kakaoUserInfo);
        Optional<SafeMember> result = safeMemberRepository.findByNickName(kakaoUserInfo.getNickname());

        //기존 회원의 경우 DTO로 변환한 뒤 반환
        if(result.isPresent()){
            SafeMemberDTO safeMemberDTO = entityToDTO(result.get());
            return safeMemberDTO;
        }

        //새로운 회원의 경우 비밀번호 임의로 생성
        SafeMember socialMember = makeSocialMember(kakaoUserInfo.getId(), kakaoUserInfo.getNickname());
        safeMemberRepository.save(socialMember);
        SafeMemberDTO safeMemberDTO = entityToDTO(socialMember);
        return safeMemberDTO;
    }

    private KakaoUserInfoDTO getNicknameFromKakaoAccessToken(String accessToken) {

        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        //토큰이 없을 경우
        if(accessToken == null) {
            throw new RuntimeException("AccessToken is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<Object> entity = new HttpEntity<>(headers);

        //실제로 보내야 한다. UriComponentsBuilder를 사용한다.
        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        //이 때 나오는 정보가 LinkedHashMap 형태로 나온다.
        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                entity,
                LinkedHashMap.class
        );

        log.info("response {}", response);

        //사용자 정보에서 아이디를 가져오자, nickName, id
        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        log.info("bodyMap {}", bodyMap);
        log.info("id {}", bodyMap.get("id"));
        String id = String.valueOf(bodyMap.get("id"));

        LinkedHashMap<String, String> properties = bodyMap.get("properties");
        log.info("nickName {}", properties.get("nickname"));
        String nickname = properties.get("nickname");

        return new KakaoUserInfoDTO(id, nickname);
    }

    //해당 닉네임을 가진 회원이 없다면 새로운 회원을 추가할 때 패스워드를 임의로 생성한다.
    private String makeTempPassword() {
        StringBuffer buffer = new StringBuffer();

        for(int i = 0; i < 10; i++) {
            buffer.append( (char) ( (int)(Math.random() * 55) + 65 ));
        }
        return buffer.toString();
    }

    //소셜 회원 만들기
    private SafeMember makeSocialMember(String id, String nickname){
        String tempPassword = makeTempPassword();
        log.info("tempPassword: ", tempPassword);

        //회원만들기
        SafeMember member = SafeMember.builder()
                .email(id + "@email.com")
                .name("신규회원")
                .password(passwordEncoder.encode(tempPassword))
                .nickName(nickname)
                .social(true)
                .build();
        member.addRole(MemberRole.USER);
        return member;
    }

    //회원 수정
    @Override
    public void modifyMember(SafeMemberDTO safeMemberDTO) {

        Optional<SafeMember> result = safeMemberRepository.findByNickName(safeMemberDTO.getNickName());

        SafeMember member = result.orElseThrow();
        member.setName(safeMemberDTO.getName());
        member.setPassword(passwordEncoder.encode(safeMemberDTO.getPassword()));
        member.setSocial(false);
        safeMemberRepository.save(member);
    }
}
