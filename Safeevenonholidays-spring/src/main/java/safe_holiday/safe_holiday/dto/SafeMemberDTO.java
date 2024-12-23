package safe_holiday.safe_holiday.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import safe_holiday.safe_holiday.domain.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter @Setter
@ToString
@Builder
public class SafeMemberDTO {
    private Long id;

    @NotEmpty(message = "아이디를 적어주세요.")
    private String email;

    @NotEmpty(message = "비밀번호를 적어주세요.")
    private String password;

    @NotEmpty(message = "이름을 적어주세요.")
    private String name;

    private String nickName;

    private boolean social;

    private List<Question> questionList = new ArrayList<>();

    private List<Answer> answerList = new ArrayList<>();

    private List<Info> InfoList = new ArrayList<>();

    private List<Review> reviewList = new ArrayList<>();

    private List<Favorite> favoriteList = new ArrayList<>();

    private SafeMember.Grade grade;

    //우리는 문자로 권한을 받으면 되는데 시큐리티는 객체로 받아야 함. 그래서 new SimpleGrantedAuthority("ROLE_" + str) 문자를 객체로 생성해 준다.
    public SafeMemberDTO(String email, String password, String nickName, boolean social) {
        super();

        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.social = social;
    }

    //JWT 문자열을 만들어서 데이터를 주고 받는다.
    //JWT 문자열의 내용물을 클레임스(Claims)라고 한다.
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("email", email);
        dataMap.put("password", password);
        dataMap.put("nickName", nickName);
        dataMap.put("social", social);

        return dataMap;
    }
}
