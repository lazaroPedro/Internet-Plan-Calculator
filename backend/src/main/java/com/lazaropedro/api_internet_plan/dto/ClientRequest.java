package com.lazaropedro.api_internet_plan.dto;

import com.lazaropedro.api_internet_plan.model.PlanType;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

@Data
public class ClientRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Length(min = 8, max = 20)
    private String telephone;
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
