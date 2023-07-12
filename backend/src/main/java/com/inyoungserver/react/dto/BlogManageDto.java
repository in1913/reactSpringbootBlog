package com.inyoungserver.react.dto;

import com.inyoungserver.react.entity.BlogManageEntity;

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
public class BlogManageDto {
    private int num;
    private String blog_name;
    private String blog_owner_name;
    private String photo_url;
    private String classification;
    
    public static BlogManageDto toSaveBlogManageDto(BlogManageEntity blogManageEntity){
        BlogManageDto blogManageDto = new BlogManageDto();
        blogManageDto.setNum(blogManageEntity.getNum());
        blogManageDto.setBlog_name(blogManageEntity.getBlog_name());
        blogManageDto.setBlog_owner_name(blogManageEntity.getBlog_owner_name());
        blogManageDto.setPhoto_url(blogManageEntity.getPhoto_url());
        blogManageDto.setClassification(blogManageEntity.getClassification());
        return blogManageDto;
    }
}
