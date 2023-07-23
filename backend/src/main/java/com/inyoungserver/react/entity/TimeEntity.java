package com.inyoungserver.react.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class TimeEntity {
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdTime;
    @Column(insertable = false)
    private LocalDateTime updatedTime;
}
