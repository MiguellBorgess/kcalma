package com.grupo21.kcalma.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final ResourceLoader resourceLoader;

    public void sendPasswordResetEmail(String to, String userName, String resetLink) throws MessagingException {
        String subject = "Redefinição de Senha";

        String content = getPasswordResetEmailContent(userName, resetLink);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

    private String getPasswordResetEmailContent(String userName, String resetLink) {
        Resource resource = resourceLoader.getResource("classpath:templates/password_reset_email.html");

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

            String content = reader.lines().collect(Collectors.joining("\n"));

            content = content.replace("${userName}", userName)
                    .replace("${resetLink}", resetLink);

            return content;
        } catch (IOException e) {
            return "Erro ao carregar o conteúdo do e-mail.";
        }
    }

}