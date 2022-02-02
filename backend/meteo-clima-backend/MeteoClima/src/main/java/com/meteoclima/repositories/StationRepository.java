package com.meteoclima.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.Station;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

	List<Station> findByCityID(int cityID);
}
