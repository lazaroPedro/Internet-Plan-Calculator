package com.lazaropedro.api_internet_plan.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SuggestedPlan {
    private String name;
    private int velocity;
    private float min;
    private float max;
    private boolean minInc;
    private boolean maxInc;


    public boolean recommend(float weight){
        boolean ismin = minInc ?  weight >= min : weight > min;
        boolean ismax = maxInc ?  weight <= max : weight < max;
        return ismin && ismax;
    }
}
