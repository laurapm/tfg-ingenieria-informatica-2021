package com.meteoclima.entities;

import java.io.Serializable;

public class AlertEventId implements Serializable {

	private int alertId;
	private int stationId;
	private int sensorTypeId;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + alertId;
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
		AlertEventId other = (AlertEventId) obj;
		if (alertId != other.alertId)
			return false;
		if (sensorTypeId != other.sensorTypeId)
			return false;
		if (stationId != other.stationId)
			return false;
		return true;
	}

}