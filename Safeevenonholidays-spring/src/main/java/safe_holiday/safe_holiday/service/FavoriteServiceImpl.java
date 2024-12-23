package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.dto.FavoriteDTO;
import safe_holiday.safe_holiday.repository.FavoriteRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    //조회
    @Override
    public FavoriteDTO get(Long id) {
        Optional<Favorite> result = favoriteRepository.findById(id);
        Favorite favorite = result.orElseThrow();
        return entityToDTO(favorite);
    }

    //등록
    @Override
    public Long register(FavoriteDTO favoriteDTO) {
        Favorite favorite = DTOToEntity(favoriteDTO);
        Favorite result = favoriteRepository.save(favorite);
        return result.getId();
    }

    //삭제
    @Override
    public void remove(Long id) {
        favoriteRepository.deleteById(id);
    }
}
