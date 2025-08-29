package com.lazaropedro.api_internet_plan.service;

import com.lazaropedro.api_internet_plan.dto.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Async
    public void sendEmail(EmailDto email) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");



        Context context = new Context();
        context.setVariable("data", email);
        try {
            helper.setTo(email.getEmail());
            helper.setSubject("Plano Contratado com Sucesso!");
            helper.setText(templateEngine.process("email-cliente", context), true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao tentar enviar e-mail", e);
        }


    }
    @Async
    public void sendAdminEmail(EmailDto email, String adminEmail) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

        Context context = new Context();
        context.setVariable("data", email);
        try {
            helper.setTo(adminEmail);
            helper.setSubject("Nova venda realizada com sucesso!");
            helper.setText(templateEngine.process("email-admin", context), true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao tentar enviar e-mail", e);
        }


    }
}
