package com.lazaropedro.api_internet_plan.dto;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlanResponse {
    private Float totalWeight;
    private String suggestedPlan;
    private int velocity;

    private float weightCellPhone;
    private float weightComputer;
    private float weightSmartTV;
    private float weightTVBox;
    private float weightOther;


}
