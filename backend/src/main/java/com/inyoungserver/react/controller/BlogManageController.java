package com.inyoungserver.react.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.inyoungserver.react.dto.BlogManageDto;
import com.inyoungserver.react.service.BlogManageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor 
@CrossOrigin(origins = "http://localhost:3000")
public class BlogManageController {
    private final BlogManageService blogManageService;

    @GetMapping("/api/blogmanage")
    public ResponseEntity <List <BlogManageDto>> findAll(){
        List <BlogManageDto> blogManageDtoList = blogManageService.findAll();
        if(blogManageDtoList.size() == 0){
            return ResponseEntity.ok().body(null);
        }else{
            return ResponseEntity.ok().body(blogManageDtoList);
        }

    }
    
    @PostMapping("/api/blogupdate")
    public ResponseEntity <List <BlogManageDto>> update(@RequestBody BlogManageDto blogManageDto){
        List <BlogManageDto> blogManageDtoList = blogManageService.update(blogManageDto);
        return ResponseEntity.ok().body(blogManageDtoList);
    }
}
