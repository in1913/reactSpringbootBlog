package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.MemberDto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name="members")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(unique = true)
    private String mememail;

    @Column
    private String mempass;

    @Column
    private String memname;

    @Column
    private String birth;

    @Column
    private String address;

    @Column
    private String tel;

    @Column
    private String education;

    @Column
    private String photo_url;

    // dto to entity
    public static MemberEntity toEntity(MemberDto memberDto){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMememail(memberDto.getMememail());
        memberEntity.setMempass(memberDto.getMempass());
        memberEntity.setMemname(memberDto.getMemname());
        memberEntity.setBirth(memberDto.getBirth());
        memberEntity.setAddress(memberDto.getAddress());
        memberEntity.setTel(memberDto.getTel());
        memberEntity.setEducation(memberDto.getEducation());
        memberEntity.setPhoto_url(memberDto.getPhoto_url());
        return memberEntity;
    }

    public static MemberEntity toUpdateEntity(MemberEntity memberEntity, MemberDto memberDto){
        if(!memberDto.getMememail().isEmpty()){
            memberEntity.setMememail(memberDto.getMememail());
        }
        if(!memberDto.getMempass().isEmpty()){
            memberEntity.setMempass(memberDto.getMempass());
        }
        if(!memberDto.getMemname().isEmpty()){
            memberEntity.setMemname(memberDto.getMemname());
        }
        if(!memberDto.getBirth().isEmpty()){
            memberEntity.setBirth(memberDto.getBirth());
        }
        if(!memberDto.getAddress().isEmpty()){
            memberEntity.setAddress(memberDto.getAddress());
        }
        if(!memberDto.getTel().isEmpty()){
            memberEntity.setTel(memberDto.getTel());
        }
        if(!memberDto.getEducation().isEmpty()){
            memberEntity.setEducation(memberDto.getEducation());
        }
        if(!memberDto.getPhoto_url().isEmpty()){
            memberEntity.setPhoto_url(memberDto.getPhoto_url());
        }
        return memberEntity;
    }

}
