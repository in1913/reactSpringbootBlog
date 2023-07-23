package com.inyoungserver.react.service;

import com.inyoungserver.react.dto.PortfolioDto;
import com.inyoungserver.react.entity.PortfolioEntity;
import com.inyoungserver.react.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public void save(PortfolioDto portfolioDto){
        PortfolioEntity portfolioEntity = PortfolioEntity.toEntity(portfolioDto);
        portfolioRepository.save(portfolioEntity);
    }

    public List <PortfolioDto> findAll(){
        List <PortfolioEntity> portfolioEntityList = portfolioRepository.findAll();
        List <PortfolioDto> portfolioDtoList = new ArrayList <> ();
        for(PortfolioEntity portfolioEntity: portfolioEntityList){
            portfolioDtoList.add(PortfolioDto.toDto(portfolioEntity));
        }
        return portfolioDtoList;
    }
}
