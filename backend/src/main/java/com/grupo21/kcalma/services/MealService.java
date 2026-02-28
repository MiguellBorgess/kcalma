package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.Meal.MealFoodId;
import com.grupo21.kcalma.domain.Meal.MealFoods;
import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.repositories.FoodRepository;
import com.grupo21.kcalma.repositories.MealRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealService {

    private final UserService userService;
    private final MealRepository mealRepository;
    private final FoodRepository foodRepository;

    @Transactional
    public MealResponseDTO addMeal(@RequestBody AddMealRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Meal newMeal = new Meal();

        newMeal.setUser(user);
        newMeal.setName(data.name());
        newMeal.setMealType(data.mealType());
        newMeal.setDescription(data.description());

        Meal meal = mealRepository.save(newMeal);


        for (MealFoodItemRequestDTO item : data.mealFoods()) {
            Food food = foodRepository.findById(item.foodId()).orElseThrow(() -> new RuntimeException("Food não encontrado: " + item.foodId()));

            MealFoodId mealFoodId = new MealFoodId(meal.getId(), food.getId());

            MealFoods mealFoods = new MealFoods(mealFoodId, meal, food, item.amount());

            meal.getMealFoods().add(mealFoods);
        }
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

    public void deleteMealById(MealByIdRequestDTO data, Principal connectedUser) {
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

    @Transactional
    public MealResponseDTO addMealFoods(AddMealFoodRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Meal> opMeal = mealRepository.findById(data.mealId());

        if(opMeal.isPresent()) { //trocar por exceção
            Meal meal = opMeal.get();

            if (meal.getUser().equals(user)) {

                for (MealFoodItemRequestDTO item : data.mealFoods()) {
                    MealFoodId mealFoodId = new MealFoodId(meal.getId(), item.foodId());

                    Optional<Food> opFood = foodRepository.findById(item.foodId());

                    if (opFood.isPresent()) { //trocar por exceção
                        Food food = opFood.get();

                        MealFoods mealFoods = new MealFoods(mealFoodId, meal, food, item.amount());

                        meal.getMealFoods().add(mealFoods);


                    }
                }
                return MealResponseDTO.create(mealRepository.save(meal));
            }
        }
        return null; //temporário
    }

    public void deleteMealFoodById(DeleteMealFoodsRequestDTO data, Principal connectedUser) {
        User user = userService.getAuthenticatedUser(connectedUser);

        Optional<Meal> opMeal = mealRepository.findById(data.mealId());

        if(opMeal.isPresent()){
            Meal meal = opMeal.get();

            if(meal.getUser().equals(user)){

                for(Long item:data.foodsId()){

                    Optional<MealFoods> opMealFoods = meal.getMealFoods().stream()
                            .filter(mealFoods -> mealFoods.getFood().getId().equals(item))
                            .findFirst();

                    opMealFoods.ifPresent(mealFoods -> meal.getMealFoods().remove(mealFoods));
                }
                mealRepository.save(meal);
            }
        }
    }
}