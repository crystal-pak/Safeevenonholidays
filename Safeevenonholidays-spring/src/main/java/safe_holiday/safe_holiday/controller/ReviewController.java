package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.dto.ReviewDTO;
import safe_holiday.safe_holiday.service.ReviewService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    //조회
    @GetMapping("/{id}")
    public ReviewDTO get(@PathVariable("id") Long id){
        return reviewService.get(id);
    }

    // 병원 ID로 리뷰 조회
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByHospital(@PathVariable String hospitalId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByHospitalId(hospitalId);
        return ResponseEntity.ok(reviews);
    }

    // 약국 ID로 리뷰 조회
    @GetMapping("/pharmacy/{pharmacyId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByPharmacy(@PathVariable String pharmacyId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByPharmacyId(pharmacyId);
        return ResponseEntity.ok(reviews);
    }

    //등록
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody ReviewDTO reviewDTO){
        Long id = reviewService.register(reviewDTO);
        return Map.of("id", id);
    }

    //수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, @RequestBody ReviewDTO reviewDTO){
        reviewDTO.setId(id);
        reviewService.modify(reviewDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        reviewService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
