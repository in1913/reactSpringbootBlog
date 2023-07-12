package com.inyoungserver.react.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inyoungserver.react.entity.MemberEntity;

public interface MemberRepository extends JpaRepository <MemberEntity, Integer>{
    Optional <MemberEntity> findByMememail(String mememail);
}
