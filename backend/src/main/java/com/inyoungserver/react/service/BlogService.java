package com.inyoungserver.react.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.inyoungserver.react.dto.MemberDto;
import com.inyoungserver.react.entity.MemberEntity;
import com.inyoungserver.react.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

    @Transactional
    public void save(BlogDto blogDto){
        BlogEntity blogEntity = BlogEntity.toEntity(blogDto);
        blogRepository.save(blogEntity);
    }

    public List <BlogDto> findAll(){
        List <BlogEntity> blogEntityList = blogRepository.findAll();
        List <BlogDto> blogDtoList = new ArrayList <> ();
        for(BlogEntity blogEntity : blogEntityList){
            blogDtoList.add(BlogDto.toDto(blogEntity));
        }
        return blogDtoList;
    }

    public List <Object> getBlogWithMember(int num){
        Optional <BlogEntity> optionalBlogEntity =  blogRepository.findById(num);
        if(optionalBlogEntity.isPresent()){
            BlogEntity blogEntity = optionalBlogEntity.get();
            Optional <MemberEntity> optionalMemberEntity = memberRepository.findByMememail(blogEntity.getMememail());
            if(optionalMemberEntity.isPresent()){
                MemberEntity memberEntity = optionalMemberEntity.get();
                List <Object> dtoList = new ArrayList<>();
                dtoList.add(MemberDto.toDto(memberEntity));
                dtoList.add(BlogDto.toDto(blogEntity));
                return dtoList;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    @Transactional
    public void delete(int num){
        blogRepository.deleteById(num);
    }

    @Transactional
    public void update(BlogDto blogDto){
        Optional <BlogEntity> optionalBlogEntity = blogRepository.findById(blogDto.getBlog_num());
        if(optionalBlogEntity.isPresent()){
            BlogEntity blogEntity = optionalBlogEntity.get();
            BlogEntity updatedBlogEntity = BlogEntity.toUpdateEntity(blogEntity, blogDto);
            blogRepository.save(updatedBlogEntity);
        }
    }

    @Transactional
    public void updateHits(int blog_num){
        blogRepository.updateHits(blog_num);
    }

}
