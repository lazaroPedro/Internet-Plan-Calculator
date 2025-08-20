package com.lazaropedro.api_internet_plan.repository;

import com.lazaropedro.api_internet_plan.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {

}
