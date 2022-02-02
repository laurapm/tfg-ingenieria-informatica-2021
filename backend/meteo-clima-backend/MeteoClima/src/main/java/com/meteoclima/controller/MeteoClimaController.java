package com.meteoclima.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.meteoclima.dto.SensorInfoDTO;
import com.meteoclima.dto.StationData;
import com.meteoclima.dto.StationSensorTypeDTO;
import com.meteoclima.entities.Alert;
import com.meteoclima.entities.AlertEvent;
import com.meteoclima.entities.City;
import com.meteoclima.entities.Measurement;
import com.meteoclima.entities.SensorType;
import com.meteoclima.entities.Station;
import com.meteoclima.entities.StationSensorType;
import com.meteoclima.repositories.AlertEventRepository;
import com.meteoclima.repositories.AlertRepository;
import com.meteoclima.repositories.CityRepository;
import com.meteoclima.repositories.MeasurementRepository;
import com.meteoclima.repositories.SensorTypeRepository;
import com.meteoclima.repositories.StationRepository;
import com.meteoclima.repositories.StationSensorTypeRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(path = "/meteoclima")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
@Slf4j
public class MeteoClimaController {

	@Autowired
	private StationRepository stationRepository;

	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private AlertRepository alertRepository;

	@Autowired
	private SensorTypeRepository sensorTypeRepository;

	@Autowired
	private MeasurementRepository measurementRepository;

	@Autowired
	private AlertEventRepository alertEventRepository;

	@Autowired
	private StationSensorTypeRepository stationSensorTypeRepository;

	@GetMapping("/test")
	public String test() {
		return "Get request work";
	}

	@GetMapping("/stations")
	public List<Station> getAllStations() {
		return stationRepository.findAll();
	}

	@GetMapping("/cities")
	public List<City> getAllCities() {
		return cityRepository.findAll();
	}

	@GetMapping("/alerts")
	public List<Alert> getAllAlerts() {
		return alertRepository.findAll();
	}

	@GetMapping("/sensorTypes")
	public List<SensorType> getAllSensorTypes() {
		return sensorTypeRepository.findAll();
	}

	@GetMapping("/sensors-station")
	public StationSensorTypeDTO getAllSensorsForStation(@RequestParam int stationId) throws Exception {
		List<StationSensorType> listSensors = stationSensorTypeRepository.findByStationId(stationId);
		Station station = stationRepository.findById(stationId).orElse(null);

		List<String> sensors = new ArrayList<>();
		for (StationSensorType sensor : listSensors) {

			Optional<SensorType> sensorInfo = sensorTypeRepository.findById(sensor.getSensorTypeId());

			if (!sensorInfo.isPresent()) {
				throw new Exception("Sensor is not present");
			}
			sensors.add(sensorInfo.get().getName());
		}
		String stationName = station != null ? station.getName() : Strings.EMPTY;
		return new StationSensorTypeDTO(stationId, stationName, sensors);
	}

	@GetMapping("/measurements-station-sensor")
	public List<SensorInfoDTO> getMeasurementsStationSensor(@RequestParam int stationId, @RequestParam int sensorId) {
		List<Measurement> listMeasurements = measurementRepository.findByStationIdAndSensorTypeId(stationId, sensorId,
				Sort.by(Sort.Direction.DESC, "date"));
		List<SensorInfoDTO> response = new ArrayList<>();

		for (Measurement measurement : listMeasurements) {
			String date = measurement.getDate().toLocalDateTime().toString();
			SensorInfoDTO infoDTO = new SensorInfoDTO(stationId, sensorId, date, measurement.getValue(), true);
			response.add(infoDTO);
		}
		return response;
	}

	@GetMapping("/measurements/all")
	public List<Measurement> getAllMeasurements() {
		return measurementRepository.findAll();
	}

	@GetMapping("/alert-events")
	public List<AlertEvent> getAllAlertEventsForStation(@RequestParam int stationId) {
		return alertEventRepository.findByStationId(stationId);
	}

	@RequestMapping(value = "/create-station", method = RequestMethod.POST)
	public void createStation(@RequestBody StationData stationToCreate) {
		log.info("Station to create {}", stationToCreate.toString());
		if (!cityRepository.findByName(stationToCreate.getCity()).isPresent()) {
			City cityToCreate = new City();
			cityToCreate.setName(stationToCreate.getCity());
			cityToCreate.setCountry(stationToCreate.getCountry());
		} else {
			log.info("create station");
		}

	}
}
