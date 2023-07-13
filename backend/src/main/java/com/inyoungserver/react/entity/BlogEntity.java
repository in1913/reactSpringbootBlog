package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.BlogDto;
import com.inyoungserver.react.dto.MemberDto;

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

    
    public static BlogEntity toSaveEntity(BlogDto blogDto, String mememail){
        BlogEntity blogEntity = new BlogEntity();
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMememail(mememail);

        blogEntity.setClassification(blogDto.getClassification());
        blogEntity.setTitle(blogDto.getTitle());
        blogEntity.setContent(blogDto.getContent());
        blogEntity.setTags(blogDto.getTags());
        blogEntity.setHits(0);
        blogEntity.setMemberEntity(memberEntity);
        return blogEntity;
    }
}
