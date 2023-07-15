package com.inyoungserver.react.controller;

import com.inyoungserver.react.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {
    private final PortfolioService portfolioService;
}
