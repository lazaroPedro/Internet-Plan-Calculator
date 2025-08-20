package com.lazaropedro.api_internet_plan.dto;

import com.lazaropedro.api_internet_plan.model.PlanType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class ClientRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    private String telephone;
    @PositiveOrZero
    private long qtdCellPhone;
    @PositiveOrZero
    private long qtdComputer;
    @PositiveOrZero
    private long qtdSmartTV;
    @PositiveOrZero
    private long qtdTVBox;
    @PositiveOrZero
    private long qtdOther;
    @NotNull
    private boolean gamer;
    @NotNull
    private PlanType planType;

}
