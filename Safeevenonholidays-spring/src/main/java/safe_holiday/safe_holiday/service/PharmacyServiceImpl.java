package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Pharmacy;
import safe_holiday.safe_holiday.dto.PageRequestDTO;
import safe_holiday.safe_holiday.dto.PageResponseDTO;
import safe_holiday.safe_holiday.dto.PharmacyDTO;
import safe_holiday.safe_holiday.repository.PharmacyRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PharmacyServiceImpl implements PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    @Override
    public PageResponseDTO<PharmacyDTO> getlist(PageRequestDTO pageRequestDTO) {

        Page<Pharmacy> result = pharmacyRepository.search(pageRequestDTO);

        List<PharmacyDTO> dtoList = result.get().map(pharmacy -> entityToDTO(pharmacy)).collect(Collectors.toList());

        PageResponseDTO<PharmacyDTO> responseDTO = PageResponseDTO.<PharmacyDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

        return responseDTO;
    }
}
