package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.domain.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByHospitalId_HospitalId(String hospitalId);

    List<Review> findByPharmacyId_PharmacyId(String pharmacyId);

    @Query("SELECT f FROM Review f LEFT JOIN FETCH f.hospitalId LEFT JOIN FETCH f.pharmacyId WHERE f.author.id = :authorId")
    List<Review> findAllByAuthorId(@Param("authorId") Long authorId);
}
