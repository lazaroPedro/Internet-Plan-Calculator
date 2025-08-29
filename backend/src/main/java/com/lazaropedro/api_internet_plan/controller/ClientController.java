package com.lazaropedro.api_internet_plan.controller;

import com.lazaropedro.api_internet_plan.dto.ClientRequest;
import com.lazaropedro.api_internet_plan.dto.DashboardResponse;
import com.lazaropedro.api_internet_plan.model.Client;
import com.lazaropedro.api_internet_plan.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/clients")
public class ClientController {
    private final ClientService clientService;
    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getClients());
    }
    @GetMapping("/info")
    public ResponseEntity<DashboardResponse> showDashboardInfo(){
        return ResponseEntity.ok(clientService.getDashboard());
    }
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody @Valid ClientRequest client) {
        return ResponseEntity.ok(clientService.createClient(client));
    }
}
