package com.inyoungserver.react.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.inyoungserver.react.dto.BlogManageDto;
import com.inyoungserver.react.entity.BlogManageEntity;
import com.inyoungserver.react.repository.BlogManageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogManageService {
    private final BlogManageRepository blogManageRepository;

    public List <BlogManageDto> findAll(){
        List <BlogManageEntity> blogManageEntityList = blogManageRepository.findAll();
        List <BlogManageDto> blogManageDtoList = new ArrayList <> ();
        for(BlogManageEntity blogManageEntity : blogManageEntityList){
            blogManageDtoList.add(BlogManageDto.toSaveBlogManageDto(blogManageEntity));
        }
        return blogManageDtoList;
    }

    public List <BlogManageDto> update(BlogManageDto blogManageDto){
        System.out.println("memberDto : " + blogManageDto);
        Optional<BlogManageEntity> optionalBlogManageEntity = blogManageRepository.findById(blogManageDto.getNum());
        if(optionalBlogManageEntity.isPresent()){
            BlogManageEntity blogManageEntity = optionalBlogManageEntity.get();
            BlogManageEntity updatedBlogManageEntity = BlogManageEntity.toUpdateManageEntity(blogManageEntity, blogManageDto);
            blogManageRepository.save(blogManageEntity);
            List <BlogManageDto> blogManageDtoList = new ArrayList <> ();
            blogManageDtoList.add(BlogManageDto.toSaveBlogManageDto(updatedBlogManageEntity));
            return blogManageDtoList;
        }else{
            BlogManageEntity blogManageEntity = BlogManageEntity.toSaveEntity(blogManageDto);
            blogManageRepository.save(blogManageEntity);
            List <BlogManageDto> blogManageDtoList = new ArrayList <> ();
            blogManageDtoList.add(BlogManageDto.toSaveBlogManageDto(blogManageEntity));
            return blogManageDtoList;
        }
    }
}
