package com.inyoungserver.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inyoungserver.react.entity.BlogManageEntity;

public interface BlogManageRepository extends JpaRepository<BlogManageEntity, Integer>{
    
}
