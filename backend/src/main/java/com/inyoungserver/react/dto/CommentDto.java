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
    private int cmt_num;
    private String mememail;
    private String nickname;
    private String content;
    private BlogDto blogDto;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public static CommentDto toCommentDto(CommentEntity commentEntity){
        CommentDto commentDto = new CommentDto();
        BlogDto blogDto = new BlogDto();
        BlogEntity blogEntity = commentEntity.getBlogEntity();
        commentDto.setCmt_num(commentDto.getCmt_num());
        blogDto.setBlog_num(blogEntity.getBlog_num());
        commentDto.setCmt_num(commentEntity.getCmt_num());
        commentDto.setCreatedTime(commentEntity.getCreatedTime());
        commentDto.setUpdatedTime(commentEntity.getUpdatedTime());
        commentDto.setMememail(commentEntity.getMememail());
        commentDto.setNickname(commentEntity.getNickname());
        commentDto.setContent(commentEntity.getContent());

        commentDto.setBlogDto(blogDto);

        return commentDto;
    }
}
