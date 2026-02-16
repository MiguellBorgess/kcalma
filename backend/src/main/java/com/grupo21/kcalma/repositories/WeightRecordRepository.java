package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.user.WeightRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeightRecordRepository extends JpaRepository<WeightRecord, Long> {

}
