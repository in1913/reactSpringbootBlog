package com.inyoungserver.react.controller;

import java.util.ArrayList;
import java.util.List;

import com.inyoungserver.react.dto.CommentDto;
import com.inyoungserver.react.entity.BlogEntity;
import com.inyoungserver.react.service.CommentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    private final CommentService commentService;

    @GetMapping("/api/blog/hits/{blog_num}")
    public ResponseEntity <String> updateHits(@PathVariable("blog_num") int blog_num){
        blogService.updateHits(blog_num);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping("/api/write")
    public ResponseEntity <String> write(@RequestBody BlogDto blogDto, HttpSession session){
        String mememail = (String) session.getAttribute("mememail");
        blogDto.setMememail(mememail);
        blogService.save(blogDto);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping("/api/modify")
    public ResponseEntity <String> update(@RequestBody BlogDto blogDto){
        blogService.update(blogDto);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/api/delete/{num}")
    public ResponseEntity <String> delete(@PathVariable("num") int num){
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setBlog_num(num);
        commentService.deleteByBlog_num(blogEntity);
        blogService.delete(num);
        return ResponseEntity.ok().body("delete");
    }

    @GetMapping("/api/bloglist")
    public ResponseEntity<List<BlogDto>> findAll(){
        List <BlogDto> blogDtoList = blogService.findAll();
        return ResponseEntity.ok().body(blogDtoList);
    }

    @GetMapping("/api/blog/{num}")
    public ResponseEntity <List <Object>> getBlogWithMember(@PathVariable("num") int num){
        List <Object> dtoList = blogService.getBlogWithMember(num);
        return ResponseEntity.ok().body(dtoList);
    }
}
