package com.lazaropedro.api_internet_plan.controller;

import com.lazaropedro.api_internet_plan.dto.PlanRequest;
import com.lazaropedro.api_internet_plan.dto.PlanResponse;
import com.lazaropedro.api_internet_plan.service.PlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plans")
public class PlanController {


    private final PlanService planService;
    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }
    @PostMapping
    public ResponseEntity<PlanResponse> calcPlan(@RequestBody @Valid PlanRequest planRequest) {
        return ResponseEntity.ok(planService.calcPlan(planRequest));

    }
}
