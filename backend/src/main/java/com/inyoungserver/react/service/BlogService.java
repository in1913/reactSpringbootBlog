package com.inyoungserver.react.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.inyoungserver.react.dto.MemberDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inyoungserver.react.dto.BlogDto;

import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.repository.BlogRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;

    @Transactional
    public void save(BlogDto blogDto, String mememail){
        BlogEntity blogEntity = BlogEntity.toSaveEntity(blogDto, mememail);
        blogRepository.save(blogEntity);
    }

    public List <BlogDto> findAll(){
        List <BlogEntity> blogEntityList = blogRepository.findAll();
        List <BlogDto> blogDtoList = new ArrayList <> ();
        for(BlogEntity blogEntity : blogEntityList){
            blogDtoList.add(BlogDto.toSaveDto(blogEntity));
        }
        return blogDtoList;
    }

    public List <BlogDto> getBlogWithMember(int num){
        Optional <BlogEntity> optionalBlogEntity =  blogRepository.getBlogWithMember(num);
        if(optionalBlogEntity.isPresent()){
            BlogEntity blogEntity = optionalBlogEntity.get();
            BlogDto blogDto = BlogDto.getBlogWithMember(blogEntity);
            List <BlogDto> blogDtoList = new ArrayList<>();
            blogDtoList.add(blogDto);
            return blogDtoList;
        }else{
            return null;
        }
    }

}
