package com.meteoclima.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.Measurement;
import com.meteoclima.entities.StationSensorCompositeId;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, StationSensorCompositeId> {

	List<Measurement> findByStationIdAndSensorTypeId(int stationId, int sensorId);

}