package com.lazaropedro.api_internet_plan.service;

import com.lazaropedro.api_internet_plan.dto.ClientRequest;
import com.lazaropedro.api_internet_plan.dto.DashboardResponse;
import com.lazaropedro.api_internet_plan.dto.EmailDto;
import com.lazaropedro.api_internet_plan.dto.PlanRequest;
import com.lazaropedro.api_internet_plan.model.Client;
import com.lazaropedro.api_internet_plan.model.PlanType;
import com.lazaropedro.api_internet_plan.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepo;

    private final PlanService planService;
    private final EmailService emailService;
    @Autowired

    public ClientService(ClientRepository clientRepo, PlanService planService, EmailService emailService) {
        this.clientRepo = clientRepo;
        this.planService = planService;
        this.emailService = emailService;
    }

    public Client createClient(ClientRequest clientRequest){
        Client client = new Client();
        client.setName(clientRequest.getName());
        client.setEmail(clientRequest.getEmail());
        client.setTelephone(clientRequest.getTelephone().replaceAll("\\D", ""));


        client.setQtdCellphone(clientRequest.getQtdCellphone());
        client.setQtdComputer(clientRequest.getQtdComputer());
        client.setQtdSmarttv(clientRequest.getQtdSmarttv());
        client.setQtdTvbox(clientRequest.getQtdTvbox());
        client.setQtdOther(clientRequest.getQtdOther());
        client.setGamer(clientRequest.isGamer());

        PlanRequest planRequest = new PlanRequest();
        planRequest.setQtdCellphone(clientRequest.getQtdCellphone());
        planRequest.setQtdComputer(clientRequest.getQtdComputer());
        planRequest.setQtdSmarttv(clientRequest.getQtdSmarttv());
        planRequest.setQtdTvbox(clientRequest.getQtdTvbox());
        planRequest.setQtdOther(clientRequest.getQtdOther());
        planRequest.setGamer(clientRequest.isGamer());

        var recomend = planService.calcPlan(planRequest);
        if (recomend.getTotalWeight() == 0f)
            throw new RuntimeException("Nenhum valor foi inserido");
        client.setTotalWeight(recomend.getTotalWeight());
        client.setPlanType(PlanType.valueOf(recomend.getSuggestedPlan().toUpperCase()));

        var save =  clientRepo.save(client);



        String dataFormatada = save.getCreated().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
        EmailDto emailData = EmailDto.builder()
                .email(client.getEmail())
                .name(client.getName())
                .telephone(client.getTelephone())
                .data(dataFormatada)
                .typePlan("Plano " + client.getPlanType().name())
                .velocity(recomend.getVelocity() + " Mbps")
                .totalWeight(recomend.getTotalWeight())
                .qtdCellphone(client.getQtdCellphone())
                .qtdComputer(client.getQtdComputer())
                .qtdSmarttv(client.getQtdSmarttv())
                .qtdTvbox(client.getQtdTvbox())
                .qtdOther(client.getQtdOther())
                .weightCellphone(recomend.getWeightCellPhone())
                .weightComputer(recomend.getWeightComputer())
                .weightSmarttv(recomend.getWeightSmartTV())
                .weightTvbox(recomend.getWeightTVBox())
                .weightOther(recomend.getWeightOther()).build();

        emailService.sendEmail(emailData);
        emailService.sendAdminEmail(emailData, "lazaro.p806@gmail.com");

        return save;
    }

    public List<Client> getClients(){
        return clientRepo.findAllByOrderByCreatedDesc();
    }


    public DashboardResponse getDashboard() {
        DashboardResponse dash = new DashboardResponse();
        var sum = clientRepo.sumAllDisps();
        if(sum == null){
            sum = 0L;
        }
        dash.setAllDisp(sum);
        dash.setAllClients(clientRepo.count());
        LocalDate hoje = LocalDate.now();
        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.atTime(LocalTime.MAX);

        dash.setTodayClients(clientRepo.countByCreatedBetween(inicio, fim));
        return dash;
    }
}
