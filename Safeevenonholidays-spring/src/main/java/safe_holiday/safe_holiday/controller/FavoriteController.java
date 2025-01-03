package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.FavoriteDTO;
import safe_holiday.safe_holiday.service.FavoriteService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    //조회
    @GetMapping("/member/{authorId}")
    public ResponseEntity<List<FavoriteDTO>> get(@PathVariable Long authorId) {
        List<FavoriteDTO> favorites = favoriteService.get(authorId);
        return ResponseEntity.ok(favorites);
    }

    //등록
    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> register(@RequestBody FavoriteDTO favoriteDTO) {
        Long id = favoriteService.register(favoriteDTO);
        return ResponseEntity.ok(Map.of("id", id)); // 저장된 ID를 명시적으로 반환
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        favoriteService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
