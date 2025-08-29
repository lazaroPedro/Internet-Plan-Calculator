package com.lazaropedro.api_internet_plan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ApiInternetPlanApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiInternetPlanApplication.class, args);
	}

}
