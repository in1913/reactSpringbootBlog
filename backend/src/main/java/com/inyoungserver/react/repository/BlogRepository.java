package com.inyoungserver.react.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inyoungserver.react.entity.BlogEntity;

public interface BlogRepository extends JpaRepository <BlogEntity, Integer>{
    @Query("SELECT b, m.memname, m.photo_url FROM " +
        "BlogEntity b JOIN b.memberEntity m WHERE b.num = :num")
    Optional <BlogEntity> getBlogWithMember(@Param("num") int num);
}
