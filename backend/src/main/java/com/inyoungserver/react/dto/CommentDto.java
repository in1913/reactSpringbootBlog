package com.inyoungserver.react.dto;

import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.entity.CommentEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentDto {
    private int num;
    private String nickname;
    private String password;
    private String commentemail;
    private String content;
    private BlogDto blogDto;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public static CommentDto toCommentDto(CommentEntity commentEntity){
        CommentDto commentDto = new CommentDto();
        BlogDto blogDto = new BlogDto();
        BlogEntity blogEntity = commentEntity.getBlogEntity();
        commentDto.setNum(commentDto.getNum());
        blogDto.setNum(blogEntity.getNum());
        commentDto.setNum(commentEntity.getNum());
        commentDto.setNickname(commentEntity.getNickname());
        commentDto.setCreatedTime(commentEntity.getCreatedTime());
        commentDto.setUpdatedTime(commentEntity.getUpdatedTime());
        commentDto.setCommentemail(commentEntity.getCommentemail());
        commentDto.setContent(commentEntity.getContent());

        commentDto.setBlogDto(blogDto);

        return commentDto;
    }
}
