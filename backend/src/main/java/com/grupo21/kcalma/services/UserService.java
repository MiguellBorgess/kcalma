package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.domain.weightRecord.WeightRecord;
import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.exceptions.ChangePasswordException;
import com.grupo21.kcalma.exceptions.NotFoundException;
import com.grupo21.kcalma.exceptions.UserNotAllowedException;
import com.grupo21.kcalma.exceptions.UserNotFoundException;
import com.grupo21.kcalma.repositories.UserRepository;
import com.grupo21.kcalma.repositories.WeightRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final WeightRecordRepository weightRepository;

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

        return new UserDetailsResponseDTO(user.getName(), user.getEmail(), user.getAltura());
    }

    public User getAuthenticatedUser(Principal connectedUser) {
        return (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
    }

    @Transactional
    public UserDetailsResponseDTO updateUser(UpdateUserRequestDTO data, Principal connectedUser) {
        User user = getAuthenticatedUser(connectedUser);

        if(data.getName()!=null) user.setName(data.getName());
        if(data.getEmail()!=null) user.setEmail(data.getEmail());

        if(data.getAltura()!=0){
            if (data.getAltura() < 50 || data.getAltura() > 300)
                throw new IllegalArgumentException("Altura deve ser entre 50cm e 300cm");
            user.setAltura(data.getAltura());
        }

        repository.save(user);
        return new UserDetailsResponseDTO(user.getName(), user.getEmail(), user.getAltura());
    }

    @Transactional
    public WeightRecordResponseDTO addWeightRecord(AddWeightRecordRequestDTO data, Principal connectedUser){
        User user = getAuthenticatedUser(connectedUser);
        if(data.pesoKg()<=0) throw new IllegalArgumentException("O peso não pode ser menor ou igual a 0");

        WeightRecord record = new WeightRecord();
        record.setPesoKg(data.pesoKg());
        record.setUser(user);

        WeightRecord newRecord = weightRepository.save(record);

        return new WeightRecordResponseDTO(newRecord.getId(), newRecord.getPesoKg(), newRecord.getCreatedAt());
    }

    @Transactional
    public void DeleteWeightRecord(DeleteWeightRecordRequestDTO data, Principal connectedUser) {
        User user = getAuthenticatedUser(connectedUser);

        WeightRecord record = weightRepository.findById(data.id()).orElseThrow(() -> new NotFoundException("Weight Record não encontrado"));

            if (!record.getUser().equals(user))
                throw new UserNotAllowedException("Essa Weight Record não pertence a esse usuário");

            weightRepository.delete(record);
        }

    public List<WeightRecordResponseDTO> getWeightRecords(Principal connectedUser) {
        User user = getAuthenticatedUser(connectedUser);

        List<WeightRecord> records = weightRepository.getAllByUser(user);

        return records.stream()
                .map(record -> new WeightRecordResponseDTO(
                        record.getId(),
                        record.getPesoKg(),
                        record.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}