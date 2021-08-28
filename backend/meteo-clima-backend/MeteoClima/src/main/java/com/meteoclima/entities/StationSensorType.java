package com.meteoclima.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "station_sensor_type")
@IdClass(StationSensorCompositeId.class)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StationSensorType {
	@Id
	private int stationId;
	@Id
	private int sensorTypeId;
}
