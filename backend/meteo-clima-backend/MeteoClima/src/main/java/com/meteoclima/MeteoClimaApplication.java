package com.meteoclima;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MeteoClimaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeteoClimaApplication.class, args);
	}

}
