package com.meteoclima.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meteoclima.entities.Alert;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Integer> {

}
