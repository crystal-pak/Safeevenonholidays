package safe_holiday.safe_holiday.repository.search;

import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import safe_holiday.safe_holiday.domain.QQuestion;
import safe_holiday.safe_holiday.domain.Question;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

import java.util.List;

public class QuestionSearchImpl extends QuerydslRepositorySupport implements QuestionSearch {
    public QuestionSearchImpl() {
        super(Question.class);
    }

    @Override
    public Page<Question> search(PageRequestDTO pageRequestDTO) {
        QQuestion question = QQuestion.question;
        JPQLQuery<Question> query = from(question);

        PageRequest pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("id").descending());
        this.getQuerydsl().applyPagination(pageable, query);

        List<Question> list = query.fetch();

        long total = query.fetchCount();

        return new PageImpl<>(list, pageable, total);
    }
}
