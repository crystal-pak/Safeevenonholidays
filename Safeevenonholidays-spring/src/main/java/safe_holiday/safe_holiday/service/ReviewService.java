package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Review;
import safe_holiday.safe_holiday.dto.ReviewDTO;

public interface ReviewService {

    //조회
    ReviewDTO get(Long id);

    //등록
    Long register(ReviewDTO reviewDTO);

    //수정
    void moidfy(ReviewDTO reviewDTO);

    //삭제
    void remove(Long id);

    default ReviewDTO entityToDTO(Review review){
        ReviewDTO reviewDTO = ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .content(review.getContent())
                .createDate(review.getCreateDate())
                .modifyDate(review.getModifyDate())
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
                .createDate(reviewDTO.getCreateDate())
                .modifyDate(reviewDTO.getModifyDate())
                .author(reviewDTO.getAuthor())
                .hospitalId(reviewDTO.getHospitalId())
                .pharmacyId(reviewDTO.getPharmacyId())
                .build();
        return review;
    }
}
