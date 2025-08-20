package com.lazaropedro.api_internet_plan.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
}
