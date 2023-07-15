package com.inyoungserver.react.dto;

import com.inyoungserver.react.entity.PortfolioEntity;
import lombok.*;

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
    private String start_date;
    private String end_date;
    private int people;

    public static PortfolioDto toDto(PortfolioEntity portfolioEntity){
        PortfolioDto portfolioDto = new PortfolioDto();
        portfolioDto.setNum(portfolioEntity.getNum());
        portfolioDto.setPhotos(portfolioEntity.getPhotos());
        portfolioDto.setTitle(portfolioEntity.getTitle());
        portfolioDto.setSummary(portfolioEntity.getSummary());
        portfolioDto.setMain_description(portfolioEntity.getMain_description());
        portfolioDto.setFront_content(portfolioEntity.getFront_content());
        portfolioDto.setBack_content(portfolioEntity.getBack_content());
        portfolioDto.setDb_content(portfolioEntity.getDb_content());
        portfolioDto.setDeployment(portfolioEntity.getDeployment());
        portfolioDto.setGit_site(portfolioEntity.getGit_site());
        portfolioDto.setWeb_site(portfolioEntity.getWeb_site());
        portfolioDto.setStart_date(portfolioEntity.getStart_date());
        portfolioDto.setEnd_date(portfolioEntity.getEnd_date());
        portfolioDto.setPeople(portfolioEntity.getPeople());

        return portfolioDto;
    }
}
