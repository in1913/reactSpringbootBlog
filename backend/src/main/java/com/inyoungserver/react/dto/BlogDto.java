package com.inyoungserver.react.dto;

import java.time.LocalDateTime;

import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.entity.MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BlogDto {
    private int num;
    private String classification;
    private String title;
    private String content;
    private String tags;
    private int hits;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private MemberDto memberDto;

    public static BlogDto toSaveDto(BlogEntity blogEntity){
        BlogDto blogDto = new BlogDto();
        MemberDto memberDto = new MemberDto();
        MemberEntity memberEntity = blogEntity.getMemberEntity();
        blogDto.setNum(blogEntity.getNum());
        memberDto.setMememail(memberEntity.getMememail());
        blogDto.setClassification(blogEntity.getClassification());
        blogDto.setTitle(blogEntity.getTitle());
        blogDto.setContent(blogEntity.getContent());
        blogDto.setTags(blogEntity.getTags());
        blogDto.setHits(blogEntity.getHits());
        blogDto.setCreatedTime(blogEntity.getCreatedTime());
        blogDto.setUpdatedTime(blogEntity.getUpdatedTime());

        blogDto.setMemberDto(memberDto);
        return blogDto;
    }

    public static BlogDto getBlogWithMember(BlogEntity blogEntity) {
        BlogDto blogDto = new BlogDto();
        MemberDto memberDto = new MemberDto();
        MemberEntity memberEntity = blogEntity.getMemberEntity();
        blogDto.setNum(blogEntity.getNum());
        blogDto.setContent(blogEntity.getContent());
        memberDto.setMememail(memberEntity.getMememail());
        blogDto.setTags(blogEntity.getTags());
        blogDto.setTitle(blogEntity.getTitle());
        blogDto.setHits(blogEntity.getHits());
        blogDto.setClassification(blogEntity.getClassification());
        blogDto.setCreatedTime(blogEntity.getCreatedTime());
        blogDto.setUpdatedTime(blogEntity.getUpdatedTime());
        memberDto.setMemname(memberEntity.getMemname());
        memberDto.setPhoto_url(memberEntity.getPhoto_url());
        blogDto.setMemberDto(memberDto);
        return blogDto;
    }
}
