package com.inyoungserver.react.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioDto {
    private int num;
    private String photos;
    private String title;
    private String summary;
    private String main_description;
    private String front_content;
    private String back_content;
    private String db_content;
    private String deployment;
    private String git_site;
    private String web_site;
    private String period;
    private String people;
}
