package safe_holiday.safe_holiday.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Pharmacy {

    @Id
    private String pharmacyId;

    private String pharmacyName;

    @OneToMany(mappedBy = "pharmacyId", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "pharmacyId", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Favorite> favoriteList = new ArrayList<>();
}
