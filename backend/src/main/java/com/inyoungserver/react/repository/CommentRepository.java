package com.inyoungserver.react.repository;

import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository <CommentEntity, Integer> {

    Optional <List <CommentEntity>> findByBlogEntity(BlogEntity blogEntity);

    void deleteByBlogEntity(BlogEntity blogEntity);
}
