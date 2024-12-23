package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.PharmacyDTO;
import safe_holiday.safe_holiday.service.PharmacyService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pharmacy")
public class PharmacyController {

    private final PharmacyService pharmacyService;

    //리스트
    @GetMapping("/list")
    public PageResponseDTO<PharmacyDTO> list(PageRequestDTO pageRequestDTO){
        return pharmacyService.getlist(pageRequestDTO);
    }
}
