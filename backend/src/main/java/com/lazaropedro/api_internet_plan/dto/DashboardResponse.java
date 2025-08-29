package com.lazaropedro.api_internet_plan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class DashboardResponse {
    private long allClients;
    private long todayClients;
    private long allDisp;
}
