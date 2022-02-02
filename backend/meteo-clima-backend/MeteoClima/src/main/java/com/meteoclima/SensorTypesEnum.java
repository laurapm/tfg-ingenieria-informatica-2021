package com.meteoclima;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SensorTypesEnum {

	TEMPERATURE(1, "ºC", -20, 30, 35),
	HUMIDITY(2, "%", 0, 100, 60), 
	RAINING(3, "m2", 0, 300, 10),
	UV(4, "", 0, 100, 10),
	OZONE(5, "mg/m3", 0, 100, 10), 
	WIND(6, "m/s", 0, 200, 80),
	PREASSURE(7, "hpa", 1013, 1083, 1080);

	private int id;
	private String units;
	private double minValue;
	private double maxValue;
	private double alertValue;

}
