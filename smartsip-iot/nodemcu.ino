#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "Ultrasonic.h"

const char* ssid = "Sahil";
const char* password = "12345678";

#define TRIGGER_PIN D6
#define ECHO_PIN D7
Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

#define VIBRATION_SENSOR_PIN D5
#define BUZZER_PIN D2  

const char* serverUrl = "http://api.tonystark.in/bottle.php";
const char* notifyUrl = "http://api.tonystark.in/beep.php";

float previousVolume = 0;

float getStableDistance(int samples = 10) {
  float sum = 0;
  for (int i = 0; i < samples; i++) {
    sum += ultrasonic.read();
    delay(30);
  }
  return sum / samples;
}

void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.reconnect();
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 10) {
      delay(500);
      attempts++;
    }
  }
}

void beepBuzzer() {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(500);
  digitalWrite(BUZZER_PIN, LOW);
  delay(500);
  digitalWrite(BUZZER_PIN, HIGH);
  delay(500);
  digitalWrite(BUZZER_PIN, LOW);
}

void setup() {
  Serial.begin(115200);
  pinMode(VIBRATION_SENSOR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  checkWiFi();

  float distance = getStableDistance();
  Serial.print("Water Level: ");
  Serial.println(distance);

  float waterVolume = 1000 - (distance * 38.46);
  if (waterVolume <= 0) {
    delay(3000);
    return;
  }

  Serial.print("Water Volume: ");
  Serial.println(waterVolume);

  int vibrationState = digitalRead(VIBRATION_SENSOR_PIN);
  Serial.print("Vibration: ");
  Serial.println(vibrationState == HIGH ? "Detected" : "None");

  float changePercent = (previousVolume == 0) ? 100 : (abs(waterVolume - previousVolume) / previousVolume) * 100;

  if (waterVolume > 950) {
    return;
  } 
  else if (abs(changePercent) > 12) {
    int isIntake = (previousVolume > waterVolume) ? 1 : 0;

    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;

      String requestUrl = String(serverUrl) + "?value=" + String(waterVolume) + "&isintake=" + String(isIntake);
      http.begin(client, requestUrl);
      int httpResponseCode = http.GET();


      if (httpResponseCode > 0) {
        Serial.print("Response: ");
        Serial.println(http.getString());
      } else {
        Serial.print("HTTP Error: ");
        Serial.println(http.errorToString(httpResponseCode).c_str());
      }
      http.end();

      http.begin(client, notifyUrl);
      httpResponseCode = http.GET();

      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.print("Notify Response: ");
        Serial.println(response);

        if (response.indexOf("\"beep\":true") != -1) {
          beepBuzzer();
        }
      } else {
        Serial.print("Notify HTTP Error: ");
        Serial.println(http.errorToString(httpResponseCode).c_str());
      }

      http.end();
    }

    previousVolume = waterVolume;
  }

  delay(7000);
}
