package com.meteoclima.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

	Optional<City> findByName(String name);
}