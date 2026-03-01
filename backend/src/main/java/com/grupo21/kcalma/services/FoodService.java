package com.grupo21.kcalma.services;

import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.*;
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
    private final FoodRepository foodRepository;

    public List<FoodResponseDTO> addFoods(List<AddFoodRequestDTO> dadosList) {
        List<Food> foods = dadosList.stream().map(dados -> {
            Food food = new Food();
            food.setName(dados.name());
            food.setMeasureUnit(dados.measureUnit());
            food.setCalories(dados.calories());
            return food;
        }).toList();

        List<Food> savedFoods = foodRepository.saveAll(foods);

        return savedFoods.stream()
                .map(FoodResponseDTO::create)
                .toList();
    }

    public List<FoodResponseDTO> getAll() {
        List<Food> foods = foodRepository.findAll();

        return foods.stream().map(FoodResponseDTO::create).collect(Collectors.toList());
    }

    public FoodResponseDTO getByName(FoodByNameRequestDTO data) {
        Food food = foodRepository.findByName(data.name());

        return FoodResponseDTO.create(food);
    }

    public void deleteById(DeleteFoodRequestDTO data) {
        Optional<Food> opFood= foodRepository.findById(data.id());

        if(opFood.isPresent()){
            foodRepository.deleteById(data.id());
        }
    }
    
    public FoodResponseDTO updateFood(UpdateFoodRequestDTO data){
        Optional<Food> opFood = foodRepository.findById(data.getId());

        if(opFood.isPresent()){
            Food food = opFood.get();

            if(data.getName()!=null) food.setName(data.getName());
            if(data.getMeasureUnit()!=null) food.setMeasureUnit(data.getMeasureUnit());
            if(data.isUpdateCalories()) food.setCalories(data.getCalories());

            Food updatedFood = foodRepository.save(food);

            return FoodResponseDTO.create(updatedFood);
        }
        return null; //temporário
    }
}