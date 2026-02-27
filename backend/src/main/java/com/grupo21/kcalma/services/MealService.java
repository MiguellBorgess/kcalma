package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.AddMealRequestDTO;
import com.grupo21.kcalma.dto.MealByIdRequestDTO;
import com.grupo21.kcalma.dto.MealResponseDTO;
import com.grupo21.kcalma.dto.UpdateMealRequestDTO;
import com.grupo21.kcalma.repositories.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealService {

    private final UserService userService;
    private final MealRepository mealRepository;

    public MealResponseDTO addMeal(AddMealRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Meal meal = new Meal();

        meal.setUser(user);
        meal.setName(data.name());
        meal.setMealType(data.mealType());
        meal.setDescription(data.description());

        return MealResponseDTO.create(mealRepository.save(meal));
    }

    public List<MealResponseDTO> getAllMeals(Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        List<Meal> meals = mealRepository.getAllByUser(user);

        return meals.stream().map(MealResponseDTO::create).collect(Collectors.toList());
    }

    public MealResponseDTO getMealById(MealByIdRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Meal> opMeal = mealRepository.findById(data.id());

        if(opMeal.isPresent()){
            Meal meal = opMeal.get();

            if(meal.getUser().equals(user)){
                return MealResponseDTO.create(meal);
            }
        }
        return null; //temporário
    }

    public void deleteById(MealByIdRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Meal> opMeal = mealRepository.findById(data.id());

        if(opMeal.isPresent()){
            Meal meal = opMeal.get();

            if(meal.getUser().equals(user)){
                mealRepository.deleteById(data.id());
            }
        }
    }

    public MealResponseDTO updateMeal(UpdateMealRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Meal> opMeal = mealRepository.findById(data.id());

        if(opMeal.isPresent()){
            Meal meal = opMeal.get();

            if(meal.getUser().equals(user)){
                if(data.name()!=null) meal.setName(data.name());
                if(data.description()!=null) meal.setDescription(data.description());
                if(data.mealType()!=null) meal.setMealType(data.mealType());

                Meal updatedMeal = mealRepository.save(meal);

                return MealResponseDTO.create(updatedMeal);
            }
        }
        return null; //temporário
    }
}