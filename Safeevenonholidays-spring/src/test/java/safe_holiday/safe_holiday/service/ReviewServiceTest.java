package safe_holiday.safe_holiday.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import safe_holiday.safe_holiday.domain.Review;
import safe_holiday.safe_holiday.domain.SafeMember;
import safe_holiday.safe_holiday.dto.ReviewDTO;
import safe_holiday.safe_holiday.repository.ReviewRepository;
import safe_holiday.safe_holiday.repository.SafeMemberRepository;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class ReviewServiceTest {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired ReviewService reviewService;

    @Autowired
    SafeMemberRepository safeMemberRepository;

    @Test
    void 리뷰등록() {
        Optional<SafeMember> member = safeMemberRepository.findById(1L);

        ReviewDTO reviewDTO = ReviewDTO.builder()
                .rating(5)
                .content("리뷰테스트")
                .author(member.get())
                .createDate(LocalDateTime.now())
                .build();

        reviewService.register(reviewDTO);
    }

    @Test
    void 리뷰수정() {
        long id = 1L;
        Optional<Review> findReview = reviewRepository.findById(id);

        Review review = findReview.orElseThrow();
        review.setRating(3);
        review.setContent("리뷰 수정");
        review.setModifyDate(LocalDateTime.now());

        reviewRepository.save(review);
    }

    @Test
    void 리뷰삭제() {
        long id = 1L;
        reviewRepository.deleteById(id);
    }
}