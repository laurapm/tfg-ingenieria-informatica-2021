package com.meteoclima.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SensorRelationIdName {

	TEMPERATURE(1, "Temperature"),
	HUMIDITY(2, "Humidity"),
	RAINING(3, "Raining"),
	UV(4, "UV"), 
	OZONE(5, "Ozone"),
	WIND(6, "Wind"),
	PREASSURE(7, "Preassure");

	private int id;
	private String name;

}
