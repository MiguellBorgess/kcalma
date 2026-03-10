package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.domain.token.refreshToken.RefreshToken;
import com.grupo21.kcalma.domain.token.refreshToken.RefreshTokenRequestDTO;
import com.grupo21.kcalma.domain.token.refreshToken.RefreshTokenResponseDTO;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.exceptions.ExistingEmailException;
import com.grupo21.kcalma.exceptions.TokenRefreshException;
import com.grupo21.kcalma.infra.security.JwtService;
import com.grupo21.kcalma.services.AuthenticationService;
import com.grupo21.kcalma.services.PasswordResetTokenService;
import com.grupo21.kcalma.services.RefreshTokenService;
import com.grupo21.kcalma.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/signup")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO registerUserDto) {
        Optional<User> user = userService.findByEmail(registerUserDto.email());

        if (user.isEmpty()){
            authenticationService.signup(registerUserDto);

            return ResponseEntity.ok().build();
        }

        throw new ExistingEmailException();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody LoginRequestDTO data) {
        User authenticatedUser = authenticationService.authenticate(data);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getId());

        return ResponseEntity.ok(new AuthResponseDTO(jwtToken, refreshToken.getToken()));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO data) {
        return refreshTokenService.findByToken(data.refreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateToken(user);
                    return ResponseEntity.ok(new RefreshTokenResponseDTO(token, data.refreshToken()));
                })
                .orElseThrow(() -> new TokenRefreshException(data.refreshToken(), "Refresh token is not in database!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestParam("email") String userEmail) {
        User user = userService.getUserByEmail(userEmail);

        passwordResetTokenService.createPasswordResetTokenForUser(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate-password-reset-token")
    public ResponseEntity<ValidatePasswordResetTokenDTO> validatePasswordResetToken(@RequestParam("token") String token){
        return ResponseEntity.ok(passwordResetTokenService.validatePasswordResetToken(token));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordDTO data) {
        passwordResetTokenService.resetPassword(data);

        return ResponseEntity.ok().build();
    }
}