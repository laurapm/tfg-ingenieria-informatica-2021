package com.meteoclima.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sensorType")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SensorType {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "units", nullable = false)
	private String units;

	@Column(name = "min_value", nullable = true)
	private double minValue;

	@Column(name = "max_value", nullable = true)
	private double maxValue;

	@Column(name = "alert_value", nullable = true)
	private int alertValue;
}
