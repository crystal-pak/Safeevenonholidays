package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.dto.FavoriteDTO;
import safe_holiday.safe_holiday.repository.FavoriteRepository;
import safe_holiday.safe_holiday.repository.HospitalRepository;
import safe_holiday.safe_holiday.repository.PharmacyRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final HospitalRepository hospitalRepository;
    private final PharmacyRepository pharmacyRepository;
    private final SafeMemberRepository safeMemberRepository;

    //조회
    @Override
    public List<FavoriteDTO> get(Long authorId) {
        List<Favorite> favorites = favoriteRepository.findAllByAuthorId(authorId);
        return favorites.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    //등록
    @Override
    public Long register(FavoriteDTO favoriteDTO) {
        // 병원 또는 약국 ID 중 하나는 반드시 존재해야 함
        if ((favoriteDTO.getHospitalId() == null || favoriteDTO.getHospitalId().getHospitalId() == null) &&
                (favoriteDTO.getPharmacyId() == null || favoriteDTO.getPharmacyId().getPharmacyId() == null)) {
            throw new IllegalArgumentException("병원 또는 약국 ID 중 하나는 필수입니다.");
        }

        // 병원 ID가 있는 경우 조회
        Hospital hospital = null;
        if (favoriteDTO.getHospitalId() != null && favoriteDTO.getHospitalId().getHospitalId() != null) {
            hospital = hospitalRepository.findByHospitalId(favoriteDTO.getHospitalId().getHospitalId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 병원이 존재하지 않습니다."));
        }

        // 약국 ID 확인 및 조회 (필요한 경우)
        Pharmacy pharmacy = null;
        if (favoriteDTO.getPharmacyId() != null && favoriteDTO.getPharmacyId().getPharmacyId() != null) {
            pharmacy = pharmacyRepository.findByPharmacyId(favoriteDTO.getPharmacyId().getPharmacyId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 약국이 존재하지 않습니다."));
        }

        // Favorite 객체 생성
        Favorite favorite = Favorite.builder()
                .author(safeMemberRepository.findById(favoriteDTO.getAuthor().getId())
                        .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다.")))
                .hospitalId(hospital)
                .pharmacyId(pharmacy)
                .favorite(favoriteDTO.isFavorite())
                .build();

        // Favorite 저장
        Favorite savedFavorite = favoriteRepository.save(favorite);
        return savedFavorite.getId();
    }

    //삭제
    @Override
    public void remove(Long id) {
        favoriteRepository.deleteById(id);
    }
}
