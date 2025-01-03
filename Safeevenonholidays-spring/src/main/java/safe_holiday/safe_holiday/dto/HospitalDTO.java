package safe_holiday.safe_holiday.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import safe_holiday.safe_holiday.domain.Favorite;
import safe_holiday.safe_holiday.domain.Review;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDTO {

    private String hospitalId;

    private String hospitalName;

    private List<Review> reviewList = new ArrayList<>();

    private List<Favorite> favoriteList = new ArrayList<>();
}
