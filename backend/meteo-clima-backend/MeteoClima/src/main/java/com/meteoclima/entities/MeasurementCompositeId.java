package com.meteoclima.entities;

import java.io.Serializable;
import java.sql.Timestamp;

public class MeasurementCompositeId implements Serializable {

	private int stationId;
	private int sensorTypeId;
	private Timestamp date;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode());
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
		MeasurementCompositeId other = (MeasurementCompositeId) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (sensorTypeId != other.sensorTypeId)
			return false;
		if (stationId != other.stationId)
			return false;
		return true;
	}

}
