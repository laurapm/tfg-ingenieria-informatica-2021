#include <ESP8266WiFi.h>
#include "DHT.h"
#include <Wire.h>
#include <SFE_BMP180.h>

#define DHTPIN 2    
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);


const char* ssid = "MiFibra-8DC9";
const char* password = "Gst5jezU";

SFE_BMP180 bmp;
float Po = 1013.0;
float temp  = sqrt (-1);
float comp = sqrt (-1);

void wifiConnection();
float temperatureMeasure();
float humidityMeasure();

void setup() {
  Serial.begin(9600);
  Serial.println("Iniciando...");
  dht.begin();
  bmp.begin();
  wifiConnection();
  if (!bmp.begin()) { // Initicializa el sensor
    // Error en la detección del sensor
    Serial.print("Ooops, BMP085 no detectado ... Comprueba las conexiones!");
    while (1); // Bucle infinito
  }
}


void loop() {
  delay(2000);
  // Print ESP8266 Local IP Address
  Serial.println(WiFi.localIP());

  float temperature = temperatureMeasure();
  float humidity = humidityMeasure();

  Serial.println(" Sensor DHT: ");
  if (!isnan(temperature)){
      Serial.print("Temperatura: ");
      Serial.print(temperature);
      Serial.println(" ºC ");
  }
  if (!isnan(humidity)){
     Serial.print("Humedad ");
     Serial.println(humidity);
  }

  atmPreassureMeasure();

  Serial.println("----------------");
  Serial.println(" Sensor BMP180: ");
  if (!isnan(temp)){
      Serial.print("Temperatura: ");
      Serial.print(temp);
      Serial.println(" ºC ");
  }
  if (!isnan(comp)){
     Serial.print("Presion atm ");
     Serial.println(comp);
  }
}


void wifiConnection()
{
  Serial.begin(115200);
  delay(10);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Conectando a:\t");
  Serial.println(ssid); 

  // Esperar a que nos conectemos
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(200);
   Serial.print('.');
  }

  // Mostrar mensaje de exito y dirección IP asignada
  Serial.println();
  Serial.print("Conectado a:\t");
  Serial.println(WiFi.SSID()); 
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());
}

float temperatureMeasure(){
  Serial.println("Midiendo temperatura");
  return dht.readTemperature(); 
}

float humidityMeasure(){
  Serial.println("Midiendo humedad");
  return dht.readHumidity();
}

void atmPreassureMeasure(){
  char status;
  double T, P, alt;
  bool success = false;

  status = bmp.startTemperature();

  if (status != 0) {
    status = bmp.getTemperature(T);

    if (status != 0) {
      status = bmp.startPressure(3);

      if (status != 0) {
        delay(status);
        status = bmp.getPressure(P, T);

        if (status != 0) {
          alt = bmp.altitude(P, Po);
          comp = bmp.sealevel(P, alt);
          
          Serial.print("Presion: ");
          Serial.print(comp);
          Serial.println(" hPa");

          Serial.print("Temperatura: ");
          temp = T/1.71;
          Serial.print(T/1.71);
          Serial.println(" C");
          
        } else {
          Serial.println("Error midiendo presión");
        }
      } else{
        Serial.println("Error inicializando presión");
      }
    } else{
      Serial.println("Error midiendo temperatura");
    }
  } else{
    Serial.println("Error inicializando temperatura");
  }
}
