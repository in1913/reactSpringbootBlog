package com.inyoungserver.react.entity;

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
    private String mememail;

    @Column
    private String nickname;

    @Column(columnDefinition = "TEXT")
    private String content;

    public static CommentEntity toSaveEntity(int blog_num, CommentDto commentDto){
        CommentEntity commentEntity = new CommentEntity();
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setBlog_num(blog_num);
        commentEntity.setNickname(commentDto.getNickname());
        commentEntity.setBlogEntity(blogEntity);
        commentEntity.setMememail(commentDto.getMememail());
        commentEntity.setContent(commentDto.getContent());
        return commentEntity;
    }

    public static CommentEntity toUpdateEntity(CommentEntity commentEntity, CommentDto commentDto){
        commentEntity.setContent(commentDto.getContent());
        return commentEntity;
    }
}
