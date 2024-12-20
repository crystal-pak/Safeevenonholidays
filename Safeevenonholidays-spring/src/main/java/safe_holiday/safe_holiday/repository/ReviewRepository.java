package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
