package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import safe_holiday.safe_holiday.dto.FavoriteDTO;
import safe_holiday.safe_holiday.service.FavoriteService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    //조회
    @GetMapping("/{id}")
    public FavoriteDTO get(@PathVariable("id") Long id){
        return favoriteService.get(id);
    }

    //등록
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody FavoriteDTO favoriteDTO){
        Long id = favoriteService.register(favoriteDTO);
        return Map.of("id", id);
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id){
        favoriteService.remove(id);
        return Map.of("RESULT", "SUCCESS");
    }
}
