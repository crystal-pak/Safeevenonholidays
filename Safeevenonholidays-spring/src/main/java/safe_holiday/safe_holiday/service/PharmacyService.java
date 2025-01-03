package safe_holiday.safe_holiday.service;

import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.PharmacyDTO;

public interface PharmacyService {

    PageResponseDTO<PharmacyDTO> getlist(PageRequestDTO pageRequestDTO);

    default PharmacyDTO entityToDTO(Pharmacy pharmacy){
        PharmacyDTO pharmacyDTO = PharmacyDTO.builder()
                .pharmacyId(pharmacy.getPharmacyId())
                .pharmacyName(pharmacy.getPharmacyName())
                .build();

        return pharmacyDTO;
    }

    default Pharmacy DTOToEntity(PharmacyDTO pharmacyDTO){
        Pharmacy pharmacy = Pharmacy.builder()
                .pharmacyId(pharmacyDTO.getPharmacyId())
                .pharmacyName(pharmacyDTO.getPharmacyName())
                .build();

        return pharmacy;
    }
}
