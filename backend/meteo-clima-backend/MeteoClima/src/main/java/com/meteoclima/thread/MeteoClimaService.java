package com.meteoclima.thread;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.meteoclima.SensorTypesEnum;
import com.meteoclima.entities.City;
import com.meteoclima.entities.Measurement;
import com.meteoclima.entities.Station;
import com.meteoclima.entities.StationSensorType;
import com.meteoclima.enums.SensorRelationIdName;
import com.meteoclima.repositories.CityRepository;
import com.meteoclima.repositories.MeasurementRepository;
import com.meteoclima.repositories.StationRepository;
import com.meteoclima.repositories.StationSensorTypeRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MeteoClimaService {

	@Autowired
	private StationRepository stationRepo;

	@Autowired
	private MeasurementRepository measurementRepo;

	@Autowired
	private StationSensorTypeRepository stationSensorTypeRepo;

	@Autowired
	private CityRepository cityRepository;

	// @Scheduled(fixedRate = 3600000)
	@Scheduled(fixedRate = 300000)
	public void scheduledTask() {
		// Get all the stations
		List<Station> listStations = stationRepo.findAll();

		listStations.stream().forEach(station -> {
			log.info("Station {} ", station.getName());
			// Get the list of sensors
			List<StationSensorType> listSensors = stationSensorTypeRepo.findByStationId(station.getId());

			SensorTypesEnum[] listOfAllSensors = SensorTypesEnum.values();

			// Looking at missing data in the list of stations
			for (SensorTypesEnum element : listOfAllSensors) {
				StationSensorType stationSensorType = new StationSensorType(station.getCityID(), element.getId());
				if (!listSensors.contains(stationSensorType)) {
					log.info("This station does not have data for " + element);

					// Search data in nearest station
					List<Station> listStationsSameCity = stationRepo.findByCityID(station.getCityID());
					if (listStationsSameCity.size() >= 2) {
						listStationsSameCity.remove(station);
						Station stationWitSensorData = getStationInCityWithSensor(listStationsSameCity,
								stationSensorType);

						if (stationWitSensorData == null) {
							log.info("There is no station with this data, insert data from API");
							insertDataFromAPI(station, stationSensorType);

						} else {
							Measurement measurement = measurementRepo
									.findByStationIdAndSensorTypeId(stationWitSensorData.getId(), element.getId(),
											Sort.by(Sort.Direction.DESC, "date"))
									.get(0);

							log.info("Insert data {} from station {}", measurement.getValue(),
									stationWitSensorData.getName());

						}

					} else {
						log.info("Insert data from API");
						insertDataFromAPI(station, stationSensorType);

					}
				}
			}

			log.info("-------------");

		});
	}

	private Station getStationInCityWithSensor(List<Station> stationsInCity, StationSensorType sensor) {
		// Given the list of the stations that are in the same city and the sensor's
		// measurement wanted

		// If the list is empty return null
		if (stationsInCity.isEmpty())
			return null;

		else {
			for (Station station : stationsInCity) {
				// If the station has the sensor measurement, return it
				List<StationSensorType> listSensors = stationSensorTypeRepo.findByStationId(station.getId());
				if (listSensors.contains(sensor)) {
					List<Measurement> measurement = measurementRepo.findByStationIdAndSensorTypeId(station.getId(),
							sensor.getSensorTypeId(), Sort.by(Sort.Direction.DESC, "date"));
					if (!measurement.isEmpty()) {
						return station;
					} else {
						stationsInCity.remove(station);
						return getStationInCityWithSensor(stationsInCity, sensor);
					}

				} else {
					stationsInCity.remove(station);
					return getStationInCityWithSensor(stationsInCity, sensor);
				}

			}
		}
		return null;
	}

	private void insertDataFromAPI(Station stationToInsert, StationSensorType sensor) {

		int cityID = stationToInsert.getCityID();

		City city = cityRepository.findById(cityID).isPresent() ? cityRepository.findById(cityID).get() : null;
		String apiKey = "a4a2dc045884dbb2375062e2e87409e8";

		if (city != null) {
			try {
				String cityName = city.getName().replaceAll("á", "%c3%a1").replaceAll(" ", "%20");
				String url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + "ES" + "&appid="
						+ apiKey;
				log.info("The URL is {}", url);

				String response = getInfo(url, sensor);
				log.info("The response is {}", response);

			} catch (MalformedURLException e) {
				log.error("Cannot get data from the URL to city {} ", city.getName(), " for station {} ",
						stationToInsert.getName());
			} catch (IOException e) {
				log.error("Error inserting data from API {} ", e.getMessage());
			}
		}

	}

	String getInfo(String url, StationSensorType sensor) throws IOException {
		SensorRelationIdName[] sensorNames = SensorRelationIdName.values();
		ReadJson reader = new ReadJson(); // To ReadJson in order to read from url.
		JSONObject json = reader.getJsonFromUrl(url); // calling method in order to read.

		return "";
	}

}
