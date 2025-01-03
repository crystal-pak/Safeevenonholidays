package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.repository.search.HospitalSearch;

import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long>, HospitalSearch {

    Optional<Hospital> findByHospitalId(String hospitalId);
}
