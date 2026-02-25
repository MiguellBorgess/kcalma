package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.AddFoodDTO;
import com.grupo21.kcalma.dto.FoodByNameRequestDTO;
import com.grupo21.kcalma.dto.FoodResponseDTO;
import com.grupo21.kcalma.repositories.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final UserService userService;
    private final FoodRepository foodRepository;

    public FoodResponseDTO addFood(AddFoodDTO dados, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);
        Food food = new Food();

        food.setName(dados.name());
        food.setUser(user);
        food.setCalories(dados.calories());

        return FoodResponseDTO.create(foodRepository.save(food));
    }

    public List<FoodResponseDTO> getAll(Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        List<Food> foods = foodRepository.getAllByUser(user);

        return foods.stream().map(FoodResponseDTO::create).collect(Collectors.toList());
    }

    public FoodResponseDTO getByName(FoodByNameRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Food food = foodRepository.getByNameAndUser(data.name(), user);

        return FoodResponseDTO.create(food);
    }
}