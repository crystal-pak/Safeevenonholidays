package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import safe_holiday.safe_holiday.domain.Favorite;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("SELECT f FROM Favorite f LEFT JOIN FETCH f.hospitalId LEFT JOIN FETCH f.pharmacyId WHERE f.author.id = :authorId")
    List<Favorite> findAllByAuthorId(@Param("authorId") Long authorId);
}
