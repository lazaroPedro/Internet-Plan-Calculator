package com.lazaropedro.api_internet_plan.repository;

import com.lazaropedro.api_internet_plan.model.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}
