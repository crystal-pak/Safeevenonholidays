package safe_holiday.safe_holiday.repository.search;

import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.domain.QPharmacy;
import safe_holiday.safe_holiday.dto.PageRequestDTO;

import java.util.List;

public class PharmacySearchImpl extends QuerydslRepositorySupport implements PharmacySearch {
    public PharmacySearchImpl() {
        super(Pharmacy.class);
    }

    @Override
    public Page<Pharmacy> search(PageRequestDTO pageRequestDTO) {
        QPharmacy pharmacy = QPharmacy.pharmacy;
        JPQLQuery<Pharmacy> query = from(pharmacy);

        //페이징 처리 추가
        PageRequest pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1, //1부터 시작하므로 -1
                pageRequestDTO.getSize(),
                Sort.by("id").descending());
        this.getQuerydsl().applyPagination(pageable, query);

        //쿼리 실행
        List<Pharmacy> list = query.fetch(); //목록 데이터 가져올 때

        long total = query.fetchCount(); //Long 타입으로 결과를 가져다 준다.

        return new PageImpl<>(list, pageable, total);
    }
}
