#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// node 2
#define WIFI_SSID "Manthan's M32"
#define WIFI_PASSWORD "oofv3260"
#define FIREBASE_HOST "https://nodemcudata-6c3df-default-rtdb.firebaseio.com"  
#define FIREBASE_AUTH "uWoTgIoe822SwLuAITqXakrsTRNSt4EmXDo66MIN"    


FirebaseData fbData;
FirebaseAuth auth;
FirebaseConfig config;

#define GREEN_LED D8 

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

    pinMode(GREEN_LED, OUTPUT);
    digitalWrite(GREEN_LED, LOW); 
}

void loop() {
    if (Firebase.getInt(fbData, "/device1/status")) {
        int status = fbData.intData();
        if (status == 1) {
            digitalWrite(GREEN_LED, HIGH);  
            Serial.println("🚦 NodeMCU 1 is near! Turning on LED.");
        } else {
            digitalWrite(GREEN_LED, LOW);   // Turn off Green Light
        }
    } else {
        Serial.println("❌ Error fetching data from Firebase");
    }

    delay(3000); // Check every 3 seconds
}
