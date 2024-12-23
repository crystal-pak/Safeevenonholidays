package safe_holiday.safe_holiday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import safe_holiday.safe_holiday.domain.Hospital;
import safe_holiday.safe_holiday.dto.*;
import safe_holiday.safe_holiday.repository.HospitalRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;

    //페이징 처리
    @Override
    public PageResponseDTO<HospitalDTO> getlist(PageRequestDTO pageRequestDTO) {

        //가져온다, Todo의 리스트
        Page<Hospital> result = hospitalRepository.search(pageRequestDTO);

        List<HospitalDTO> dtoList = result.get().map(hospital -> entityToDTO(hospital)).collect(Collectors.toList());

        PageResponseDTO<HospitalDTO> responseDTO = PageResponseDTO.<HospitalDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

        return responseDTO;
    }
}
