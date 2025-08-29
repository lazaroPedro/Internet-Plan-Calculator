package com.lazaropedro.api_internet_plan.repository;

import com.lazaropedro.api_internet_plan.dto.DashboardResponse;
import com.lazaropedro.api_internet_plan.model.Client;
import com.lazaropedro.api_internet_plan.model.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client,Long> {
    @Query(value = "SELECT SUM(qtd_cellphone + qtd_computer + qtd_smarttv + qtd_tvbox + qtd_other) FROM clients", nativeQuery = true)
    Long sumAllDisps();

    List<Client> findAllByOrderByCreatedDesc();
    Long countByCreatedBetween(LocalDateTime createdAfter, LocalDateTime createdBefore);
}
