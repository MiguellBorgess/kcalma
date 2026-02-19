package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.LoginRequestDTO;
import com.grupo21.kcalma.dto.RegisterRequestDTO;
import com.grupo21.kcalma.exceptions.UserNotFoundException;
import com.grupo21.kcalma.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(RegisterRequestDTO input) {
        User newUser = new User();

        newUser.setPassword(passwordEncoder.encode(input.password()));
        newUser.setEmail(input.email());
        newUser.setName(input.name());
        newUser.setRole(input.role());

        if (input.altura() < 50 || input.altura() > 300)
            throw new IllegalArgumentException("Altura deve ser entre 50cm e 300cm");

        newUser.setAltura(input.altura());

        userRepository.save(newUser);
    }

    public User authenticate(LoginRequestDTO input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    input.email(),
                    input.password()
            )
        );

        return userRepository.findByEmail(input.email()).orElseThrow(UserNotFoundException::new);
    }
}
