#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// WiFi & Firebase Credentials
#define WIFI_SSID "Manthan's M32"
#define WIFI_PASSWORD "oofv3260"
#define FIREBASE_HOST "https://nodemcudata-6c3df-default-rtdb.firebaseio.com"  // 🔸 Replace with Firebase URL
#define FIREBASE_AUTH "uWoTgIoe822SwLuAITqXakrsTRNSt4EmXDo66MIN"     // 🔸 Replace with Firebase Secret Key

FirebaseData fbData;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected to WiFi");

    // Firebase Setup
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);

    // Upload "1" when the device is present
    Firebase.setInt(fbData, "/device1/status", 1);
}

void loop() {
    // Keep updating presence
    Firebase.setInt(fbData, "/device1/status", 1);
    delay(5000); // Update every 5 seconds
}
