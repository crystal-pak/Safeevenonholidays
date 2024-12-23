package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Review;
import safe_holiday.safe_holiday.dto.ReviewDTO;
import safe_holiday.safe_holiday.repository.ReviewRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    //조회
    @Override
    public ReviewDTO get(Long id) {
        Optional<Review> result = reviewRepository.findById(id);
        Review review = result.orElseThrow();
        return entityToDTO(review);
    }

    //등록
    @Override
    public Long register(ReviewDTO reviewDTO) {
        Review review = DTOToEntity(reviewDTO);
        Review result = reviewRepository.save(review);
        return result.getId();
    }

    //수정
    @Override
    public void moidfy(ReviewDTO reviewDTO) {
        Optional<Review> result = reviewRepository.findById(reviewDTO.getId());
        Review review = result.orElseThrow();

        review.setRating(reviewDTO.getRating());
        review.setContent(reviewDTO.getContent());
        review.setModifyDate(reviewDTO.getModifyDate());

        reviewRepository.save(review);
    }

    //삭제
    @Override
    public void remove(Long id) {
        reviewRepository.deleteById(id);
    }
}
