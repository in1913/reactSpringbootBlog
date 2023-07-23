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
        blogEntity.setBlog_num(blog_num);
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

    @Transactional
    public void deleteByBlog_num(BlogEntity blogEntity){
        commentRepository.deleteByBlogEntity(blogEntity);
    }

    @Transactional
    public void delete(int cmt_num){
        commentRepository.deleteById(cmt_num);
    }

    @Transactional
    public void update(CommentDto commentDto){
        Optional <CommentEntity> optionalCommentEntity = commentRepository.findById(commentDto.getCmt_num());
        if(optionalCommentEntity.isPresent()){
            CommentEntity commentEntity = optionalCommentEntity.get();
            CommentEntity updatedCommentEntity = CommentEntity.toUpdateEntity(commentEntity, commentDto);
            commentRepository.save(updatedCommentEntity);
        }
    }
}
