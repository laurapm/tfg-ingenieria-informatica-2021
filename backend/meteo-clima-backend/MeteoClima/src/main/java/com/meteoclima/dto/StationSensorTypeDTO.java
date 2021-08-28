package com.meteoclima.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StationSensorTypeDTO {

	private int idStation;

	private String nameStation;

	private List<String> listSensors;
}
