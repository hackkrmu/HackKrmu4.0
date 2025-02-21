
#define BLYNK_TEMPLATE_ID "TMPLX9GgD_5O"
#define BLYNK_TEMPLATE_NAME "Rain Drop Alert"
#define BLYNK_AUTH_TOKEN "hMjbyC5U-mM7YFpUIP361172H89MgV0w"

#define BLYNK_PRINT Serial

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

#define RAIN_SENSOR_PIN A0
#define RAIN_SENSOR_THRESHOLD 500 

char ssid[] = "SSID";
char pass[] = "yourPassword";

void setup()
{
  Serial.begin(115200);
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop()
{
  int sensorValue = analogRead(RAIN_SENSOR_PIN);
  Serial.print("Rain sensor value: ");
  Serial.println(sensorValue);

  if (sensorValue < RAIN_SENSOR_THRESHOLD) {
    Blynk.logEvent("rainalert");
  }

  Blynk.virtualWrite(V0, sensorValue);

  Blynk.run();
  delay(1000);
}