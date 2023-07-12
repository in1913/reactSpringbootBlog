package com.inyoungserver.react.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.inyoungserver.react.dto.MemberDto;
import com.inyoungserver.react.entity.MemberEntity;
import com.inyoungserver.react.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void save(MemberDto memberDto){
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDto);
        memberRepository.save(memberEntity);
    }

    public MemberDto login(MemberDto memberDto){
        Optional <MemberEntity> byMememail  = memberRepository.findByMememail(memberDto.getMememail());
        if(byMememail.isPresent()){
            MemberEntity memberEntity = byMememail.get();
            if(memberEntity.getMempass().equals((memberDto.getMempass()))){
                MemberDto dto = MemberDto.toMemberDto(memberEntity);
                return dto;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    public List <MemberDto> userInfo(String mememail){
        Optional <MemberEntity> byMememail  = memberRepository.findByMememail(mememail);
        if(byMememail.isPresent()){
            MemberEntity memberEntity = byMememail.get();       
            MemberDto dto = MemberDto.getMemInfo(memberEntity);
            List <MemberDto> memberDtoList = new ArrayList <> ();
            memberDtoList.add(dto);
            return memberDtoList;
        }else{
            return null;
        }
    }

    public List <MemberDto> update(MemberDto memberDto){
        System.out.println("memberDto : " + memberDto);
        Optional <MemberEntity> optionalMemberEntity = memberRepository.findByMememail(memberDto.getMememail());
        if(optionalMemberEntity.isPresent()){
            MemberEntity memberEntity = optionalMemberEntity.get();
            MemberEntity updatedMemberEntity = MemberEntity.toUpdateEntity(memberEntity, memberDto);
            memberRepository.save(updatedMemberEntity);
            List <MemberDto> memberDtoList = new ArrayList <> ();
            memberDtoList.add(MemberDto.toMemberDto(updatedMemberEntity));
            return memberDtoList;
        }else{
            return null;
        }
    }
}
