package com.lazaropedro.api_internet_plan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Table(name="clients")
@Entity
@Data
public class Client {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    private String telephone;

    private long qtdCellPhone;
    private long qtdComputer;
    private long qtdSmartTV;
    private long qtdTVBox;
    private long qtdOther;
    private boolean gamer;

    private float totalWeight;
    @CreationTimestamp
    private LocalDateTime created;
    private PlanType planType;


}
