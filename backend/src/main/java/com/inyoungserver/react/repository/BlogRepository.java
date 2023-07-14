package com.inyoungserver.react.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inyoungserver.react.entity.BlogEntity;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;

public interface BlogRepository extends JpaRepository <BlogEntity, Integer>{

}
