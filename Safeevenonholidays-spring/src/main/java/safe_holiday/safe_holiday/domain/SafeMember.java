package safe_holiday.safe_holiday.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class SafeMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String password;

    private String name;

    private String nickName;

    private boolean social;

    //new ArrayList<>() : NullPointerException을 방지하기 위해 리스트 초기화 설정
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Question> questionList = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Info> InfoList = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();

    @Enumerated(EnumType.STRING) // enum 값을 문자열로 저장
    private Grade grade;

    public enum Grade {
        ADMIN, USER;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public void setSocial(boolean social) {
        this.social = social;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }
}
