package safe_holiday.safe_holiday.service;

import org.springframework.security.core.parameters.P;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.domain.Review;
import safe_holiday.safe_holiday.dto.ReviewDTO;

import java.time.LocalDate;
import java.util.List;

public interface ReviewService {

    //조회
    List<ReviewDTO> get(Long authorId);

    List<ReviewDTO> getReviewsByHospitalId(String hospitalId);

    List<ReviewDTO> getReviewsByPharmacyId(String pharmacyId);

    //등록
    Long register(ReviewDTO reviewDTO);

    //수정
    void modify(ReviewDTO reviewDTO);

    //삭제
    void remove(Long id);

    default ReviewDTO entityToDTO(Review review){
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .content(review.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(review.getAuthor())
                .hospitalId(review.getHospitalId())
                .pharmacyId(review.getPharmacyId())
                .build();
        return reviewDTO;
    }

    default Review DTOToEntity(ReviewDTO reviewDTO){
        Review review = Review.builder()
                .id(reviewDTO.getId())
                .rating(reviewDTO.getRating())
                .content(reviewDTO.getContent())
                .createDate(LocalDate.now())
                .modifyDate(LocalDate.now())
                .author(reviewDTO.getAuthor())
                .hospitalId(reviewDTO.getHospitalId())
                .pharmacyId(reviewDTO.getPharmacyId())
                .build();
        return review;
    }
}
