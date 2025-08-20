package com.lazaropedro.api_internet_plan.service;

import com.lazaropedro.api_internet_plan.dto.ClientRequest;
import com.lazaropedro.api_internet_plan.dto.PlanRequest;
import com.lazaropedro.api_internet_plan.model.Client;
import com.lazaropedro.api_internet_plan.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepo;

    private final PlanService planService;
    @Autowired

    public ClientService(ClientRepository clientRepo, PlanService planService) {
        this.clientRepo = clientRepo;
        this.planService = planService;
    }

    public Client createClient(ClientRequest clientRequest){
        Client client = new Client();
        client.setName(clientRequest.getName());
        client.setEmail(clientRequest.getEmail());
        client.setTelephone(clientRequest.getTelephone().replaceAll("\\D", ""));
        client.setPlanType(clientRequest.getPlanType());

        client.setQtdCellPhone(clientRequest.getQtdCellPhone());
        client.setQtdComputer(clientRequest.getQtdComputer());
        client.setQtdSmartTV(clientRequest.getQtdSmartTV());
        client.setQtdTVBox(clientRequest.getQtdTVBox());
        client.setQtdOther(clientRequest.getQtdOther());
        client.setGamer(clientRequest.isGamer());

        PlanRequest planRequest = new PlanRequest();
        planRequest.setQtdCellPhone(clientRequest.getQtdCellPhone());
        planRequest.setQtdComputer(clientRequest.getQtdComputer());
        planRequest.setQtdSmartTV(clientRequest.getQtdSmartTV());
        planRequest.setQtdTVBox(clientRequest.getQtdTVBox());
        planRequest.setQtdOther(clientRequest.getQtdOther());
        planRequest.setGamer(clientRequest.isGamer());

        var recomend = planService.calcPlan(planRequest);
        if (recomend.getTotalWeight() == 0f)
            throw new RuntimeException("Nenhum valor foi inserido");
        client.setTotalWeight(recomend.getTotalWeight());
        return clientRepo.save(client);
    }

    public List<Client> getClients(){
        return clientRepo.findAll();
    }


}
