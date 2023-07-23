package com.inyoungserver.react.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.inyoungserver.react.entity.BlogEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BlogRepository extends JpaRepository <BlogEntity, Integer>{
    @Modifying
    @Query(value="UPDATE BlogEntity b SET b.hits = b.hits + 1 WHERE b.blog_num = :blog_num")
    void updateHits(@Param("blog_num") int blog_num);
}
