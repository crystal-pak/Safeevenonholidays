package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.*;
import safe_holiday.safe_holiday.dto.ReviewDTO;
import safe_holiday.safe_holiday.repository.InfoRepository;
import safe_holiday.safe_holiday.repository.ReviewRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final SafeMemberRepository safeMemberRepository;

    //조회
    @Override
    public ReviewDTO get(Long id) {
        Optional<Review> result = reviewRepository.findById(id);
        Review review = result.orElseThrow();
        return entityToDTO(review);
    }

    @Override
    public List<ReviewDTO> getReviewsByHospitalId(String hospitalId) {
        List<Review> reviews = reviewRepository.findByHospitalId_HospitalId(hospitalId);
        return reviews.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getReviewsByPharmacyId(String pharmacyId) {
        List<Review> reviews = reviewRepository.findByPharmacyId_PharmacyId(pharmacyId);
        return reviews.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    //등록
    @Override
    public Long register(ReviewDTO reviewDTO) {
        /// 현재 로그인한 사용자 이름 가져오기
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // 사용자 정보 조회 및 예외 처리
        SafeMember member = safeMemberRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + username));

        // DTO → 엔티티 변환
        Review review = DTOToEntity(reviewDTO);
        review.setAuthor(member);

        // 병원 또는 약국 ID 설정
        if (reviewDTO.getHospitalId() != null) {
            Hospital hospital = new Hospital(); // 병원 객체 생성
            hospital.setHospitalId(reviewDTO.getHospitalId().getHospitalId()); // 병원 ID 설정
            review.setHospitalId(hospital); // 리뷰에 병원 설정
        }

        if (reviewDTO.getPharmacyId() != null) {
            Pharmacy pharmacy = new Pharmacy(); // 약국 객체 생성
            pharmacy.setPharmacyId(reviewDTO.getPharmacyId().getPharmacyId()); // 약국 ID 설정
            review.setPharmacyId(pharmacy); // 리뷰에 약국 설정
        }

        // 리뷰 저장
        Review result = reviewRepository.save(review);
        return result.getId();
    }

    //수정
    @Override
    public void modify(ReviewDTO reviewDTO) {
        Optional<Review> result = reviewRepository.findById(reviewDTO.getId());
        Review review = result.orElseThrow();

        review.setRating(reviewDTO.getRating());
        review.setContent(reviewDTO.getContent());
        review.setModifyDate(LocalDate.now());

        reviewRepository.save(review);
    }

    //삭제
    @Override
    public void remove(Long id) {
        reviewRepository.deleteById(id);
    }
}
