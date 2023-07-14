package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.BlogDto;
import com.inyoungserver.react.dto.CommentDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
@Table(name = "comment")
public class CommentEntity extends TimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cmt_num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_num", referencedColumnName = "blog_num")
    private BlogEntity blogEntity;

    @Column
    private String nickname;

    @Column
    private String password;

    @Column
    private String commentemail;

    @Column(columnDefinition = "TEXT")
    private String content;

    public static CommentEntity toSaveEntity(int blog_num, CommentDto commentDto){
        CommentEntity commentEntity = new CommentEntity();
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setBlog_num(blog_num);
        commentEntity.setBlogEntity(blogEntity);
        commentEntity.setNickname(commentDto.getNickname());
        commentEntity.setPassword(commentDto.getPassword());
        commentEntity.setCommentemail(commentDto.getCommentemail());
        commentEntity.setContent(commentDto.getContent());
        return commentEntity;
    }
}
