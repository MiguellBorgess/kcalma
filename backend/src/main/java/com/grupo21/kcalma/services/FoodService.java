package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.exceptions.NotFoundException;
import com.grupo21.kcalma.exceptions.UserNotAllowedException;
import com.grupo21.kcalma.repositories.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final UserService userService;
    private final FoodRepository foodRepository;

    public FoodResponseDTO addFood(AddFoodRequestDTO dados, Principal connectedUser) {

        if (dados.calories() < 0)
            throw new IllegalArgumentException("As calorias devem ser um valor maior ou igual a zero.");

        User user = userService.getAuthenticatedUser(connectedUser);
        Food food = new Food();

        food.setName(dados.name());
        food.setMeasureUnit(dados.measureUnit());
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

        if(food==null)
            throw new NotFoundException("Nenhum alimento encontrado com esse nome e usuário");

        return FoodResponseDTO.create(food);
    }

    public void deleteById(DeleteFoodRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Food> opFood= foodRepository.findById(data.id());

        if (opFood.isEmpty())
            throw new NotFoundException("Nenhum alimento encontrado com esse Id.");

        Food food = opFood.get();

        if(!food.getUser().equals(user))
            throw new UserNotAllowedException("O alimento não pertence ao usuário.");

        foodRepository.deleteById(data.id());
    }
    
    public FoodResponseDTO updateFood(UpdateFoodRequestDTO data, Principal connectedUser){
        User user = userService.getAuthenticatedUser(connectedUser);
        Optional<Food> opFood = foodRepository.findById(data.getId());

        if(opFood.isEmpty())
            throw new NotFoundException("Nenhum alimento encontrado com esse Id.");

        Food food = opFood.get();

        if(!food.getUser().equals(user))
            throw new UserNotAllowedException("O alimento não pertence ao usuário.");

        if(data.getName()!=null) food.setName(data.getName());
        if(data.getMeasureUnit()!=null) food.setMeasureUnit(data.getMeasureUnit());
        if(data.isUpdateCalories()) {
            if (data.getCalories() < 0)
                throw new IllegalArgumentException("As calorias devem ser um valor maior ou igual a zero.");

            food.setCalories(data.getCalories());
        }
        return FoodResponseDTO.create(foodRepository.save(food));
    }
}