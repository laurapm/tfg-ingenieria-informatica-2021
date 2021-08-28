package com.meteoclima.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.StationSensorCompositeId;
import com.meteoclima.entities.StationSensorType;

@Repository
public interface StationSensorTypeRepository extends JpaRepository<StationSensorType, StationSensorCompositeId> {

	List<StationSensorType> findByStationId(int stationId);

}
