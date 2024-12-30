package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.dto.*;
import safe_holiday.safe_holiday.repository.HospitalRepository;
import safe_holiday.safe_holiday.service.HospitalService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hospital")
public class HospitalController {

    private final HospitalService hospitalService;
    private final HospitalRepository hospitalRepository;

    @GetMapping("/")
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    //리스트
    @GetMapping("/list")
    public PageResponseDTO<HospitalDTO> list(PageRequestDTO pageRequestDTO){
        return hospitalService.getlist(pageRequestDTO);
    }
}
