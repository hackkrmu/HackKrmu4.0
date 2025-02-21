#include <ESP8266WiFi.h>


const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";


const char* apiKey = "YOUR_THINGSPEAK_API_KEY";  
const char* host = "api.thingspeak.com";

WiFiClient client;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi!");
}

void loop() {
    float voltage = analogRead(A0) * (5.0 / 1023.0);  

    Serial.print("Solar Voltage: ");
    Serial.print(voltage);
    Serial.println(" V");

    if (client.connect(host, 80)) {  
        String url = "/update?api_key=" + String(apiKey) + "&field1=" + String(voltage);
        client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                     "Host: " + host + "\r\n" +
                     "Connection: close\r\n\r\n");
        client.stop();
    }

    delay(5000);  
}