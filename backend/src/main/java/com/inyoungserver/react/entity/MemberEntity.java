package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.MemberDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

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

    public static MemberEntity toMemberEntity(MemberDto memberDto){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setNum(memberDto.getNum());
        memberEntity.setMememail(memberDto.getMememail());
        memberEntity.setMemname(memberDto.getMemname());
        memberEntity.setMempass(memberDto.getMempass());
        memberEntity.setBirth(memberDto.getBirth());
        memberEntity.setAddress(memberDto.getAddress());
        memberEntity.setTel(memberDto.getTel());
        memberEntity.setEducation(memberDto.getEducation());
        memberEntity.setPhoto_url(memberDto.getPhoto_url());
        return memberEntity;
    }

    public static MemberEntity toUpdateEntity(MemberEntity memberEntity, MemberDto memberDto){
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
        if (!memberDto.getMempass().isEmpty()) {
            memberEntity.setMempass(memberDto.getMempass());            
        }
        
        return memberEntity;
        
    }

}
