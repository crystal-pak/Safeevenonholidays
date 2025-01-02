package safe_holiday.safe_holiday.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter @Setter
@ToString
@Builder(builderMethodName = "memberBuilder")
public class SafeMemberDTO extends User {

    private Long id;

    private String email;

    private String password;

    private String name;

    private String nickName;

    private boolean social;

    private String socialId;

    @Builder.Default
    private List<String> roleNames = new ArrayList<>();

    // 기본 생성자 추가
    public SafeMemberDTO() {
        super("default", "default", new ArrayList<>());
    }

    //우리는 문자로 권한을 받으면 되는데 시큐리티는 객체로 받아야 함. 그래서 new SimpleGrantedAuthority("ROLE_" + str) 문자를 객체로 생성해 준다.
    public SafeMemberDTO(Long id, String email, String password, String name, String nickName, boolean social, String socialId, List<String> roleNames) {
        super(email, password, roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.social = social;
        this.socialId = socialId;
        this.roleNames = roleNames;
    }

    @JsonIgnore
    @Override
    public List<GrantedAuthority> getAuthorities() {
        return roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList());
    }

    //JWT 문자열을 만들어서 데이터를 주고 받는다.
    //JWT 문자열의 내용물을 클레임스(Claims)라고 한다.
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("id", id);
        dataMap.put("email", email);
        dataMap.put("password", password);
        dataMap.put("name", name);
        dataMap.put("nickName", nickName);
        dataMap.put("social", social);
        dataMap.put("socialId", socialId);
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }
}
