package com.inyoungserver.react.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.inyoungserver.react.dto.MemberDto;
import com.inyoungserver.react.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/api/login")
    public ResponseEntity <String> login(@ModelAttribute MemberDto memberDto, HttpSession session){
        MemberDto result = memberService.login(memberDto);
        if(result != null){
            session.setAttribute("mememail", result.getMememail());
            return ResponseEntity.ok().body("Success");
        }else{
            return ResponseEntity.ok().body("Failed");
        }
    }

    @PostMapping("/api/update")
    public ResponseEntity <List <MemberDto>> update(@RequestBody MemberDto memberDto){
        List <MemberDto> memberDtoList = memberService.update(memberDto);
        return ResponseEntity.ok().body(memberDtoList);
    }

    @GetMapping("/api/session")
    public ResponseEntity <List <MemberDto>> getSession(HttpSession session){
        String mememail = (String) session.getAttribute("mememail");
        if(mememail != null){
            List <MemberDto> memberDtoList = memberService.userInfo(mememail);
            System.out.println(memberDtoList);
            return ResponseEntity.ok().body(memberDtoList);
        }else{
            return ResponseEntity.ok().body(null);

        }
    }

    @GetMapping("/api/logout")
    public ResponseEntity <String> getLogout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("Success");
    }

    

}
