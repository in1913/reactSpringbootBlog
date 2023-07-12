package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.BlogManageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="blog_manage")
public class BlogManageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column
    private String blog_name;

    @Column
    private String blog_owner_name;

    @Column
    private String photo_url;

    @Column
    private String classification;

    public static BlogManageEntity toUpdateManageEntity(BlogManageEntity blogManageEntity, BlogManageDto blogManageDto){
        if(!blogManageDto.getBlog_name().isEmpty()){
            blogManageEntity.setBlog_name(blogManageDto.getBlog_name());
        }
        if(!blogManageDto.getBlog_owner_name().isEmpty()){
            blogManageEntity.setBlog_owner_name(blogManageDto.getBlog_owner_name());
        }
        if(!blogManageDto.getPhoto_url().isEmpty()){
            blogManageEntity.setPhoto_url(blogManageDto.getPhoto_url());
        }
        if(!blogManageDto.getClassification().isEmpty()){
            blogManageEntity.setClassification(blogManageDto.getClassification());
        }
        
        return blogManageEntity;
    }
}
