package com.lazaropedro.api_internet_plan.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class PlanRequest {

    @PositiveOrZero

    private long qtdCellphone;
    @PositiveOrZero
    private long qtdComputer;
    @PositiveOrZero
    private long qtdSmarttv;
    @PositiveOrZero
    private long qtdTvbox;
    @PositiveOrZero
    private long qtdOther;
    @NotNull
    private boolean gamer;


}
