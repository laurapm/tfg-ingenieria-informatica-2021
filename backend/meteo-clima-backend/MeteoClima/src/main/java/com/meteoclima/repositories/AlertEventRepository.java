package com.meteoclima.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.AlertEvent;
import com.meteoclima.entities.AlertEventId;

@Repository
public interface AlertEventRepository extends JpaRepository<AlertEvent, AlertEventId> {

	List<AlertEvent> findByStationId(int stationId);

}
