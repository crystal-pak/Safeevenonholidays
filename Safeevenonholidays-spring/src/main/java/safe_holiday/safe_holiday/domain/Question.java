package safe_holiday.safe_holiday.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    @Column(length = 200) //제목 최대 길이 200자
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate createDate;

    private LocalDate modifyDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private SafeMember author;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE) // 질문 삭제 시 답변도 삭제
    private List<Answer> answerList;

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public void setModifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
    }

    public void setAuthor(SafeMember author) {
        this.author = author;
    }
}
