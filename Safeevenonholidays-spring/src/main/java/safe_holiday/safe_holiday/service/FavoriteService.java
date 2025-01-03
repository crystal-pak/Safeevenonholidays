package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.dto.FavoriteDTO;

import java.util.List;

public interface FavoriteService {

    //조회
    List<FavoriteDTO> get(Long authorId);

    //등록
    Long register(FavoriteDTO favoriteDTO);

    //삭제
    void remove(Long id);

    default FavoriteDTO entityToDTO(Favorite favorite){
        FavoriteDTO favoriteDTO = FavoriteDTO.builder()
                .id(favorite.getId())
                .favorite(favorite.isFavorite())
                .author(favorite.getAuthor())
                .hospitalId(favorite.getHospitalId())
                .pharmacyId(favorite.getPharmacyId())
                .build();
        return favoriteDTO;
    }

    default Favorite DTOToEntity(FavoriteDTO favoriteDTO){
        Favorite favorite = Favorite.builder()
                .id(favoriteDTO.getId())
                .favorite(favoriteDTO.isFavorite())
                .author(favoriteDTO.getAuthor())
                .hospitalId(favoriteDTO.getHospitalId())
                .pharmacyId(favoriteDTO.getPharmacyId())
                .build();
        return favorite;
    }
}
