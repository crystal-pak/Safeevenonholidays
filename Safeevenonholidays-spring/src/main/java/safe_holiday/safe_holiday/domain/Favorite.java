package safe_holiday.safe_holiday.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    private boolean favorite;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private SafeMember author;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id")
    private Pharmacy pharmacyId;

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public void setAuthor(SafeMember author) {
        this.author = author;
    }

    public void setHospitalId(Hospital hospitalId) {
        this.hospitalId = hospitalId;
    }

    public void setPharmacyId(Pharmacy pharmacyId) {
        this.pharmacyId = pharmacyId;
    }
}
