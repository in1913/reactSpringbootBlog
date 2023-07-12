package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.BlogDto;
import com.inyoungserver.react.dto.MemberDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="blog")
public class BlogEntity extends BlogTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mememail", referencedColumnName = "mememail")
    private MemberEntity memberEntity;

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

    
    public static BlogEntity toSaveEntity(BlogDto blogDto){
        BlogEntity blogEntity = new BlogEntity();
        MemberDto memberDto = new MemberDto();
        MemberEntity memberEntity = blogEntity.getMemberEntity();
        memberEntity.setMememail(memberDto.getMememail());
        blogEntity.setClassification(blogDto.getClassification());
        blogEntity.setTitle(blogDto.getTitle());
        blogEntity.setContent(blogDto.getContent());
        blogEntity.setTags(blogDto.getTags());
        blogEntity.setHits(0);
        return blogEntity;
    }
}
