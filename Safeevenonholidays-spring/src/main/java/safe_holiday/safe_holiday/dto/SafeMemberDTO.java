package safe_holiday.safe_holiday.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import safe_holiday.safe_holiday.domain.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SafeMemberDTO {
    private Long id;

    private String email;

    private String password;

    private String name;

    private String nickName;

    private boolean social;

    private List<Question> questionList = new ArrayList<>();

    private List<Answer> answerList = new ArrayList<>();

    private List<Info> InfoList = new ArrayList<>();

    private List<Review> reviewList = new ArrayList<>();

    private List<Favorite> favoriteList = new ArrayList<>();

    private SafeMember.Grade grade;
}
