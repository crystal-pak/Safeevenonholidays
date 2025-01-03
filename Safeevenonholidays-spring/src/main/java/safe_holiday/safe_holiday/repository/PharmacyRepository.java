package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.repository.search.PharmacySearch;

import java.util.Optional;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long>, PharmacySearch {

    Optional<Pharmacy> findByPharmacyId(String pharmacyId);
}
