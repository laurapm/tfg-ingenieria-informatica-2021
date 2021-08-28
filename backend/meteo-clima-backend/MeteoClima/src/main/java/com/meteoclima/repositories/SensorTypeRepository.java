package com.meteoclima.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.SensorType;

@Repository
public interface SensorTypeRepository extends JpaRepository<SensorType, Integer> {

}
