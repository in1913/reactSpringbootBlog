package com.inyoungserver.react.dto;

import com.inyoungserver.react.entity.MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDto {
    private int num;
    private String mememail;
    private String mempass;
    private String memname;
    private String birth;
    private String address;
    private String tel;
    private String education;
    private String photo_url;

    public static MemberDto toMemberDto(MemberEntity memberEntity){
        MemberDto memberDto = new MemberDto();
        memberDto.setNum(memberEntity.getNum());
        memberDto.setMememail(memberEntity.getMememail());
        memberDto.setMempass(memberEntity.getMempass());
        memberDto.setMemname(memberEntity.getMemname());
        memberDto.setBirth(memberEntity.getBirth());
        memberDto.setAddress(memberEntity.getAddress());
        memberDto.setTel(memberEntity.getTel());
        memberDto.setEducation(memberEntity.getEducation());
        memberDto.setPhoto_url(memberEntity.getPhoto_url());
        return memberDto;
    }

    public static MemberDto getMemInfo(MemberEntity memberEntity){
        MemberDto memberDto = new MemberDto();
        memberDto.setNum(memberEntity.getNum());
        memberDto.setMememail(memberEntity.getMememail());
        memberDto.setMemname(memberEntity.getMemname());
        memberDto.setBirth(memberEntity.getBirth());
        memberDto.setAddress(memberEntity.getAddress());
        memberDto.setTel(memberEntity.getTel());
        memberDto.setEducation(memberEntity.getEducation());
        memberDto.setPhoto_url(memberEntity.getPhoto_url());
        return memberDto;
    }

}
