package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.dto.*;

public interface HospitalService {

    PageResponseDTO<HospitalDTO> getlist(PageRequestDTO pageRequestDTO);

    default HospitalDTO entityToDTO(Hospital hospital){
        HospitalDTO hospitalDTO = HospitalDTO.builder()
                .id(hospital.getId())
                .hospitalId(hospital.getHospitalId())
                .hospitalName(hospital.getHospitalName())
                .build();

        return hospitalDTO;
    }

    default Hospital DTOToEntity(HospitalDTO hospitalDTO){
        Hospital hospital = Hospital.builder()
                .id(hospitalDTO.getId())
                .hospitalId(hospitalDTO.getHospitalId())
                .hospitalName(hospitalDTO.getHospitalName())
                .build();

        return hospital;
    }
}
