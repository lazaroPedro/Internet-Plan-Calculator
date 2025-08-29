package com.lazaropedro.api_internet_plan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

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
    @Column(name = "qtd_cellphone")
    private long qtdCellphone;
    @Column(name = "qtd_computer")
    private long qtdComputer;
    @Column(name = "qtd_smarttv")
    private long qtdSmarttv;
    @Column(name = "qtd_tvbox")
    private long qtdTvbox;
    @Column(name = "qtd_other")
    private long qtdOther;
    private boolean gamer;
    @Column(name = "total_weight")
    private float totalWeight;
    @CreationTimestamp
    private LocalDateTime created;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan_type")
    private PlanType planType;


}
