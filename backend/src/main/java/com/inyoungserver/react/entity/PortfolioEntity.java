package com.inyoungserver.react.entity;

import com.inyoungserver.react.dto.PortfolioDto;
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

    @Column(columnDefinition = "MEDIUMBLOB")
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
    private String start_date;

    @Column
    private String end_date;

    @Column
    private int people;

    public static PortfolioEntity toEntity(PortfolioDto portfolioDto){
        PortfolioEntity portfolioEntity = new PortfolioEntity();
        portfolioEntity.setPhotos(portfolioDto.getPhotos());
        portfolioEntity.setTitle(portfolioDto.getTitle());
        portfolioEntity.setSummary(portfolioDto.getSummary());
        portfolioEntity.setMain_description(portfolioDto.getMain_description());
        portfolioEntity.setFront_content(portfolioDto.getFront_content());
        portfolioEntity.setBack_content(portfolioDto.getBack_content());
        portfolioEntity.setDb_content(portfolioDto.getDb_content());
        portfolioEntity.setDeployment(portfolioDto.getDeployment());
        portfolioEntity.setGit_site(portfolioDto.getGit_site());
        portfolioEntity.setWeb_site(portfolioDto.getWeb_site());
        portfolioEntity.setStart_date(portfolioDto.getStart_date());
        portfolioEntity.setEnd_date(portfolioDto.getEnd_date());
        portfolioEntity.setPeople(portfolioDto.getPeople());

        return portfolioEntity;
    }
}
