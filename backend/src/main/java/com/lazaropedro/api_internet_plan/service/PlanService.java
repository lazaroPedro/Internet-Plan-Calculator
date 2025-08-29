package com.lazaropedro.api_internet_plan.service;


import com.lazaropedro.api_internet_plan.dto.PlanRequest;
import com.lazaropedro.api_internet_plan.dto.PlanResponse;
import com.lazaropedro.api_internet_plan.dto.SuggestedPlan;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlanService {
    private final List<SuggestedPlan> plans = List.of(
            new SuggestedPlan("Prata", 100, 0, 1, true, false),
            new SuggestedPlan("Bronze", 300, 1, 2, true, true),
            new SuggestedPlan("Ouro", 500, 2, 3, false, false),
            new SuggestedPlan("Diamante", 800, 3, Integer.MAX_VALUE, true, true)

            );
    public PlanResponse calcPlan(PlanRequest planRequest) {
        PlanResponse returnPlan = new PlanResponse();
        returnPlan.setWeightCellPhone(planRequest.getQtdCellphone() * 0.8f);
        returnPlan.setWeightComputer(planRequest.getQtdComputer() * 0.5f);
        returnPlan.setWeightSmartTV(planRequest.getQtdSmarttv() * 0.4f);
        returnPlan.setWeightTVBox(planRequest.getQtdTvbox() * 0.6f);
        returnPlan.setWeightOther(planRequest.getQtdOther() * 0.1f);

        float valor = returnPlan.getWeightCellPhone()
                + returnPlan.getWeightComputer()
                + returnPlan.getWeightSmartTV()
                + returnPlan.getWeightTVBox()
                + returnPlan.getWeightOther();
        if(planRequest.isGamer())
            valor *=2f;
        float finalValor = valor;
        returnPlan.setTotalWeight(finalValor);
        plans.stream().filter(plan -> plan
                .recommend(finalValor)).findFirst().ifPresent(plan -> {
                    returnPlan.setSuggestedPlan(plan.getName());
                    returnPlan.setVelocity(plan.getVelocity());
        });
        return returnPlan;

    }

}
