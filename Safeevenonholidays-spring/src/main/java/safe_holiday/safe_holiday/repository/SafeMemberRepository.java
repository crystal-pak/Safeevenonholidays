package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.SafeMember;

public interface SafeMemberRepository extends JpaRepository<SafeMember, Long> {
}
