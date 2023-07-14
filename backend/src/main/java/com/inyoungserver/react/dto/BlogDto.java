package com.inyoungserver.react.dto;

import java.time.LocalDateTime;

import com.inyoungserver.react.entity.BlogEntity;
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
    private int blog_num;
    private String classification;
    private String mememail;
    private String title;
    private String content;
    private String tags;
    private int hits;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;


    // entity to dto
    public static BlogDto toDto(BlogEntity blogEntity){
        BlogDto blogDto = new BlogDto();
        blogDto.setBlog_num(blogEntity.getBlog_num());
        blogDto.setClassification(blogEntity.getClassification());
        blogDto.setMememail(blogEntity.getMememail());
        blogDto.setTitle(blogEntity.getTitle());
        blogDto.setContent(blogEntity.getContent());
        blogDto.setTags(blogEntity.getTags());
        blogDto.setHits(blogEntity.getHits());
        blogDto.setCreatedTime(blogEntity.getCreatedTime());
        blogDto.setUpdatedTime(blogEntity.getUpdatedTime());
        return blogDto;
    }

}
