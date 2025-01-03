package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Favorite;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByAuthorId(Long authorId);
}
