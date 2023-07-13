package com.inyoungserver.react.controller;

import com.inyoungserver.react.dto.CommentDto;
import com.inyoungserver.react.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/api/blog/comment/write/{blog_num}")
    public ResponseEntity <List<CommentDto>> commentWrite(@PathVariable("blog_num") int blog_num, @RequestBody CommentDto commentDto){
        commentService.save(blog_num, commentDto);
        List <CommentDto> commentDtoList = commentService.getCommentWithBlog(blog_num);
        return ResponseEntity.ok().body(commentDtoList);
    }

    @GetMapping("/api/blog/comment/{blog_num}")
    public ResponseEntity <List <CommentDto>> getComments(@PathVariable("blog_num") int blog_num){
        List <CommentDto> commentDtoList = commentService.getCommentWithBlog(blog_num);
        return ResponseEntity.ok().body(commentDtoList);
    }
}
