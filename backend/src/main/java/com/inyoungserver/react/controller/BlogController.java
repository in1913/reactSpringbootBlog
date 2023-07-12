package com.inyoungserver.react.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.inyoungserver.react.dto.BlogDto;
import com.inyoungserver.react.service.BlogService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor 
// 클래스의 final 필드 또는 @NonNull 필드를 파라미터로 갖는 생성자가 자동으로 생성됨
// 생성자는 주어진 파라미터를 사용하여 필드를 초기화
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {
    private final BlogService blogService;

    @PostMapping("/api/write")
    public ResponseEntity <String> write(@RequestBody BlogDto blogDto){
        System.out.println("BlogDto = " + blogDto);
        blogService.save(blogDto);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/api/bloglist")
    public ResponseEntity<List<BlogDto>> findAll(){
        List <BlogDto> blogDtoList = blogService.findAll();
        return ResponseEntity.ok().body(blogDtoList);
    }

    @GetMapping("/api/blog/{num}")
    public ResponseEntity <List <BlogDto>> getBlogWithMember(@PathVariable("num") int num){
        List <BlogDto> blogDtoList = blogService.getBlogWithMember(num);
        return ResponseEntity.ok().body(blogDtoList);
    }
}
