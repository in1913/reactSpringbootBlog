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
    private String nickname;
    private String mempass;
    private String memname;
    private String birth;
    private String address;
    private String tel;
    private String education;
    private String photo_url;

    // entity to dto 값 가져오기
    public static MemberDto toDto(MemberEntity memberEntity){
        MemberDto memberDto = new MemberDto();
        memberDto.setMememail(memberEntity.getMememail());
        memberDto.setNickname(memberEntity.getNickname());
        memberDto.setMemname(memberEntity.getMemname());
        memberDto.setBirth(memberEntity.getBirth());
        memberDto.setAddress(memberEntity.getAddress());
        memberDto.setTel(memberEntity.getTel());
        memberDto.setEducation(memberEntity.getEducation());
        memberDto.setPhoto_url(memberEntity.getPhoto_url());
        return memberDto;
    }

}
