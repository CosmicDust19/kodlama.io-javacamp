package com.hrms.hw.business.concretes;

import com.hrms.hw.business.abstracts.CandidateCvService;
import com.hrms.hw.core.utilities.results.DataResult;
import com.hrms.hw.core.utilities.results.Result;
import com.hrms.hw.core.utilities.results.SuccessDataResult;
import com.hrms.hw.core.utilities.results.SuccessResult;
import com.hrms.hw.dataAccess.abstracts.CandidateCvDao;
import com.hrms.hw.entities.concretes.CandidateCv;
import com.hrms.hw.entities.concretes.dtos.CandidateCvAddDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateCvManager implements CandidateCvService {

    private final CandidateCvDao candidateCvDao;
    private final ModelMapper modelMapper;

    @Override
    public DataResult<List<CandidateCv>> getAll() {
        return new SuccessDataResult<>("Success", candidateCvDao.findAll());
    }

    @Override
    public Result add(CandidateCvAddDto candidateCvAddDto) {
        CandidateCv candidateCv = modelMapper.map(candidateCvAddDto, CandidateCv.class);
        candidateCv.setCandidateId(candidateCvAddDto.getCandidateId());
        candidateCvDao.save(candidateCv);
        return new SuccessResult("Success");
    }
}
