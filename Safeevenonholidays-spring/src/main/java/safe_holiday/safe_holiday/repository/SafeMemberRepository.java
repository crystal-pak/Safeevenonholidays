package safe_holiday.safe_holiday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import safe_holiday.safe_holiday.domain.SafeMember;

import java.util.Optional;

public interface SafeMemberRepository extends JpaRepository<SafeMember, Long> {

    @Query("select m from SafeMember m where m.email = :email")
    SafeMember getWithRoles(@Param("email") String email);

    //사용자 이메일로 조회
    Optional<SafeMember> findByEmail(String email);
}
