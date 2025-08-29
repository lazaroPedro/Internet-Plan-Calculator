package com.lazaropedro.api_internet_plan.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EmailDto {
    private String name;
    private String email;
    private String telephone;







    private String data;
    private double totalWeight;
    private String typePlan;
    private String velocity;

    private long qtdCellphone;
    private long qtdComputer;
    private long qtdSmarttv;
    private long qtdTvbox;
    private long qtdOther;
    private boolean gamer;

    private float weightCellphone;
    private float weightComputer;
    private float weightSmarttv;
    private float weightTvbox;
    private float weightOther;
}
