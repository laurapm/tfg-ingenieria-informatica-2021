package com.meteoclima.entities;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "measurement")
@IdClass(MeasurementCompositeId.class)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Measurement {
	@Id
	private int stationId;
	@Id
	private int sensorTypeId;
	@Id
	private Timestamp date;

	@Column(name = "value", nullable = false)
	private double value;

}
