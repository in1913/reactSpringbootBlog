package com.inyoungserver.react.service;

import com.inyoungserver.react.dto.CommentDto;
import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.entity.CommentEntity;
import com.inyoungserver.react.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    @Transactional
    public void save(int blog_num, CommentDto commentDto){
        CommentEntity commentEntity = CommentEntity.toSaveEntity(blog_num, commentDto);
        commentRepository.save(commentEntity);
    }

    public List <CommentDto> getCommentWithBlog(int blog_num){
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setNum(blog_num);
        Optional <List <CommentEntity>> optionalCommentEntityList = commentRepository.findByBlogEntity(blogEntity);
        if(optionalCommentEntityList.isPresent()){
            List <CommentEntity> commentEntityList = optionalCommentEntityList.get();
            List <CommentDto> commentDtoList = new ArrayList<>();
            for(CommentEntity commentEntity : commentEntityList){
                commentDtoList.add(CommentDto.toCommentDto(commentEntity));
            }
            return commentDtoList;
        }else {
            return null;
        }
    }
}