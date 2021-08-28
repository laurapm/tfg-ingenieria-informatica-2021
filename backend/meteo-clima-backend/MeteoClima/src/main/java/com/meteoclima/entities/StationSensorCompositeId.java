package com.meteoclima.entities;

import java.io.Serializable;

public class StationSensorCompositeId implements Serializable {

	private int stationId;
	private int sensorTypeId;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + sensorTypeId;
		result = prime * result + stationId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StationSensorCompositeId other = (StationSensorCompositeId) obj;
		if (sensorTypeId != other.sensorTypeId)
			return false;
		if (stationId != other.stationId)
			return false;
		return true;
	}

}
