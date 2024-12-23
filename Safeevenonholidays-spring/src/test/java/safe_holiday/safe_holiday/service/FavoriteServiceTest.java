package safe_holiday.safe_holiday.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.FavoriteDTO;
import safe_holiday.safe_holiday.repository.FavoriteRepository;
import safe_holiday.safe_holiday.repository.HospitalRepository;
import safe_holiday.safe_holiday.repository.PharmacyRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FavoriteServiceTest {

    @Autowired FavoriteService favoriteService;

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    SafeMemberRepository safeMemberRepository;

    @Autowired
    HospitalRepository hospitalRepository;

    @Autowired
    PharmacyRepository pharmacyRepository;

    @Test
    void 즐겨찾기등록() {
        Optional<SafeMember> member = safeMemberRepository.findById(1L);
        Optional<Hospital> hospital = hospitalRepository.findById(1L);
        Optional<Pharmacy> pharmacy = pharmacyRepository.findById(1L);

        FavoriteDTO favoriteDTO = FavoriteDTO.builder()
                .favorite(true)
                .author(member.get())
                .pharmacyId(pharmacy.get())
                .build();

        favoriteService.register(favoriteDTO);
    }
    
    @Test
    void 즐겨찾기삭제() {
        long id = 1L;
        favoriteRepository.deleteById(id);
    }

}