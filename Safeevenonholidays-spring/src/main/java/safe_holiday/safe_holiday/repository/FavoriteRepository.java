package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
