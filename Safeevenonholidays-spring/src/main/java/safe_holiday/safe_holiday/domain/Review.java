package safe_holiday.safe_holiday.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Min(1)
    @Max(5)
    private int rating;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate createDate;

    private LocalDate modifyDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private SafeMember author;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospitalId;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id")
    private Pharmacy pharmacyId;

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public void setModifyDate(LocalDate modifyDate) {
        this.modifyDate = modifyDate;
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
