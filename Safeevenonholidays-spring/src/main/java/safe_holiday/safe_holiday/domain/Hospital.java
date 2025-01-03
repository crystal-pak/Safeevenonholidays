package safe_holiday.safe_holiday.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "hospitalId")
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

    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }
}
