package com.meteoclima.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StationData {
	private String name;
	private String country;
	private String city;
	private String latitude;
	private String longitude;

}
