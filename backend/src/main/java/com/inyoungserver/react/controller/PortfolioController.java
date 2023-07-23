package com.inyoungserver.react.controller;

import com.inyoungserver.react.dto.PortfolioDto;
import com.inyoungserver.react.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @PostMapping("/api/portfolio/write")
    public ResponseEntity <String> write(@RequestBody PortfolioDto portfolioDto){
        portfolioService.save(portfolioDto);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/api/portfoliolist")
    public ResponseEntity <List<PortfolioDto>> findAll(){
        List <PortfolioDto> portfolioDtoList = portfolioService.findAll();
        return ResponseEntity.ok(portfolioDtoList);
    }
}
