package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.domain.user.WeightRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeightRecordRepository extends JpaRepository<WeightRecord, Long> {

    List<WeightRecord> getAllByUser(User user);
}
