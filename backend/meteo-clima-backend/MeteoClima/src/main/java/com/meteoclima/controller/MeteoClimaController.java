package com.meteoclima.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.meteoclima.entities.Alert;
import com.meteoclima.entities.City;
import com.meteoclima.entities.Station;
import com.meteoclima.repositories.AlertRepository;
import com.meteoclima.repositories.CityRepository;
import com.meteoclima.repositories.StationRepository;

@RestController
@RequestMapping(path = "/meteoclima")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class MeteoClimaController {

	@Autowired
	private StationRepository stationRepo;

	@Autowired
	private CityRepository cityRepo;

	@Autowired
	private AlertRepository alertRepo;

	@GetMapping("/test")
	public String test() {
		return "Get request work";
	}

	@GetMapping("/stations")
	public List<Station> getAllStations() {
		return stationRepo.findAll();
	}

	@GetMapping("/cities")
	public List<City> getAllCities() {
		return cityRepo.findAll();
	}

	@GetMapping("/alerts")
	public List<Alert> getAllAlerts() {
		return alertRepo.findAll();
	}
}
