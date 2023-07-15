package com.inyoungserver.react.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "portfolio")
public class PortfolioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column
    private String photos;

    @Column
    private String title;

    @Column
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String main_description;

    @Column
    private String front_content;

    @Column
    private String back_content;

    @Column
    private String db_content;

    @Column
    private String deployment;

    @Column
    private String git_site;

    @Column
    private String web_site;

    @Column
    private String period;

    @Column
    private String people;

}
