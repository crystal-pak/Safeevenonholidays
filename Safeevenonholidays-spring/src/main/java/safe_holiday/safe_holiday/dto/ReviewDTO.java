package safe_holiday.safe_holiday.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.domain.SafeMember;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Long id;

    private int rating;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate modifyDate;

    private SafeMember author;

    private Hospital hospitalId;

    private Pharmacy pharmacyId;
}
