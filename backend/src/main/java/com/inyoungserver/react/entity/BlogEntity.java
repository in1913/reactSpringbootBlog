package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.BlogDto;

import com.inyoungserver.react.repository.MemberRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="blog")
public class BlogEntity extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blog_num;

    @Column
    private String mememail;

    @Column 
    private String classification;

    @Column 
    private String title;

    @Column(columnDefinition = "MEDIUMBLOB") 
    private String content;

    @Column
    private String tags;

    @Column
    private int hits;

    // dto to entity
    public static BlogEntity toEntity(BlogDto blogDto){
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setMememail(blogDto.getMememail());
        blogEntity.setClassification(blogDto.getClassification());
        blogEntity.setTitle(blogDto.getTitle());
        blogEntity.setContent(blogDto.getContent());
        blogEntity.setTags(blogDto.getTags());
        blogEntity.setHits(blogDto.getHits());
        return blogEntity;
    }

    public static BlogEntity toUpdateEntity(BlogEntity blogEntity, BlogDto blogDto){
        blogEntity.setClassification(blogDto.getClassification());
        blogEntity.setContent(blogDto.getContent());
        blogEntity.setTags(blogDto.getTags());
        blogEntity.setTitle(blogDto.getTitle());
        return blogEntity;
    }
}
