package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.ChangePasswordRequestDTO;
import com.grupo21.kcalma.dto.UserDetailsResponseDTO;
import com.grupo21.kcalma.exceptions.ChangePasswordException;
import com.grupo21.kcalma.exceptions.UserNotFoundException;
import com.grupo21.kcalma.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;

    public User getUserByEmail(String email) {
        return repository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User Not Found"));
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void updatePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        repository.save(user);
    }

    public void changePassword(ChangePasswordRequestDTO data, Principal connectedUser) {
        User user = getAuthenticatedUser(connectedUser);

        if (passwordEncoder.matches(data.password(), user.getPassword())){
            if (data.newPassword().equals(data.confirmPassword())) {
                user.setPassword(passwordEncoder.encode(data.newPassword()));
                repository.save(user);
                return;
            }
            throw new ChangePasswordException("The passwords do not match");
        }
        throw new ChangePasswordException("The password is incorrect");
    }

    public UserDetailsResponseDTO getUserDetails(Principal connectedUser) {
        User user = getAuthenticatedUser(connectedUser);

        return new UserDetailsResponseDTO(user.getName(), user.getEmail());
    }

    public User getAuthenticatedUser(Principal connectedUser) {
        return (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
    }
}