package com.meteoclima.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alert_event")
@IdClass(AlertEventId.class)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlertEvent {
	@Id
	private int alertId;
	@Id
	private int stationId;
	@Id
	private int sensorTypeId;

	@Column(name = "active", nullable = false)
	private int active;
}
