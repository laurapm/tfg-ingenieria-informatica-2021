package com.meteoclima.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SensorInfoDTO {

	private int stationId;
	private int sensorId;
	private String date;
	private double value;
	private boolean realData;
}
