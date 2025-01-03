package safe_holiday.safe_holiday.domain;

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
public class Hospital {

    @Id
    private String hospitalId;

    private String hospitalName;

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "hospitalId", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();
}
