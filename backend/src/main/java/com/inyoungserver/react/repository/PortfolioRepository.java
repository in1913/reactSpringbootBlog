package com.inyoungserver.react.repository;

import com.inyoungserver.react.entity.PortfolioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository <PortfolioEntity, Integer> {

}
