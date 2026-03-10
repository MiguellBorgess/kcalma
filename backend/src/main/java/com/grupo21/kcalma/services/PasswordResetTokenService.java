package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.token.passwordResetToken.PasswordResetToken;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.ResetPasswordDTO;
import com.grupo21.kcalma.dto.ValidatePasswordResetTokenDTO;
import com.grupo21.kcalma.exceptions.ChangePasswordException;
import com.grupo21.kcalma.exceptions.UserNotFoundException;
import com.grupo21.kcalma.repositories.PasswordResetTokenRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {
    private final PasswordResetTokenRepository repository;
    private final UserService userService;
    private final EmailService emailService;

    private static final Duration PASSWORD_RESET_TOKEN_EXPIRATION = Duration.ofMinutes(30);

    public ValidatePasswordResetTokenDTO validatePasswordResetToken(String token) {
        Optional<PasswordResetToken> passwordResetToken = repository.findByToken(token);

        if (passwordResetToken.isPresent() && isExpired(passwordResetToken.get())) {
            repository.delete(passwordResetToken.get());
            return new ValidatePasswordResetTokenDTO(false, false);
        }

        return passwordResetToken
                .map(t -> new ValidatePasswordResetTokenDTO(true, !isExpired(t)))
                .orElseGet(() -> new ValidatePasswordResetTokenDTO(false, false));
    }

    public void createPasswordResetTokenForUser(User user) {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(UUID.randomUUID().toString());
        passwordResetToken.setExpiryDate(LocalDateTime.now().plus(PASSWORD_RESET_TOKEN_EXPIRATION));

        repository.save(passwordResetToken);

        try {
            emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), "https://edu.smcontabil.com/forgot-password/set-password?token="+passwordResetToken.getToken());
        } catch (MessagingException e) {
        }
    }

    public void resetPassword(ResetPasswordDTO data) {
        PasswordResetToken token = repository.findByToken(data.token()).orElseThrow(UserNotFoundException::new);
        User user = token.getUser();

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            repository.delete(token);
            throw new ChangePasswordException("Reset password token has expired.");
        }

        repository.delete(token);

        if (!data.password().equals(data.confirmPassword())) {
            throw new ChangePasswordException("The passwords do not match");
        }

        userService.updatePassword(user, data.password());
    }

    private Boolean isExpired(PasswordResetToken token) {
        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            repository.delete(token);
            return true;
        }
        return false;
    }
}
