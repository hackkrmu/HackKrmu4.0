#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#include <Preferences.h>

// WiFi Credentials
const char* ssid = "Abhay's S23";
const char* password = "1191119123";

// Define Pins
const int LDR1 = 34, LDR2 = 35;
const int servoLeftPin = 26, servoRightPin = 27;
const int pumpIN1 = 32, pumpIN2 = 33, pumpENA = 25;

// Servo Motor Configuration
Servo servoLeft, servoRight;
bool manualControl = false;
const int centerAngle = 90, minAngle = 0, maxAngle = 180;
int lastAngleLeft, lastAngleRight;

// Power Data
float voltage = 5.0, current = 0.05;
bool recording = false;
float totalVoltage = 0.0, totalCurrent = 0.0;
int recordCount = 0;
String reportData = "";

// Web Server
WebServer server(80);
Preferences preferences;

void handleRoot() {
    String html = "<html><head>"
                  "<style>"
                  "body { font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; padding: 20px; }"
                  "h1 { color: #333; }"
                  ".section { background: white; padding: 15px; margin: 15px auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; }"
                  "button { background: #007bff; color: white; border: none; padding: 10px 15px; margin: 5px; cursor: pointer; border-radius: 5px; transition: transform 0.2s, background 0.3s; }"
                  "button:hover { background: #0056b3; transform: scale(1.05); }"
                  "</style></head><body>"
                  "<h1>Solar Tracking System</h1>"
                  "<div class='section' style='background: #ffdddd;'>"
                  "<h2>Pump Control</h2>"
                  "<button onclick=\"fetch('/pumpStart')\">Start Pump</button>"
                  "<button onclick=\"fetch('/pumpStop')\">Stop Pump</button>"
                  "</div>"
                  "<div class='section' style='background: #ddffdd;'>"
                  "<h2>Manual Servo Control</h2>"
                  "<button onclick=\"fetch('/moveLeft')\">Move Left</button>"
                  "<button onclick=\"fetch('/moveRight')\">Move Right</button>"
                  "<button onclick=\"fetch('/resumeAuto')\">Resume Auto</button>"
                  "</div>"
                  "<div class='section' style='background: #ddddff;'>"
                  "<h2>Data Logging</h2>"
                  "<button onclick=\"fetch('/startRecording')\">Start Recording</button>"
                  "<button onclick=\"fetch('/stopRecording')\">Stop Recording</button>"
                  "<button onclick=\"fetch('/generateReport')\">Generate Report</button>"
                  "<p id='report'>No report generated yet.</p>"
                  "</div>"
                  "<div class='section' style='background: #ffffdd;'>"
                  "<h2>Live Status</h2>"
                  "<p id='status'>Loading...</p>"
                  "</div>"
                  "<script>function fetch(url){var x=new XMLHttpRequest();x.open('GET',url,true);x.onreadystatechange=function(){if(x.readyState==4&&x.status==200){if(url=='/generateReport'){document.getElementById('report').innerHTML=x.responseText;}else{document.getElementById('status').innerHTML=x.responseText;}}};x.send();}"
                  "setInterval(function(){fetch('/updateValues');},1000);</script>"
                  "</body></html>";
    server.send(200, "text/html", html);
}

void saveServoPositions() {
    preferences.begin("servo_prefs", false);
    preferences.putInt("leftServo", lastAngleLeft);
    preferences.putInt("rightServo", lastAngleRight);
    preferences.end();
}

void calibrateServos() {
    preferences.begin("servo_prefs", true);
    lastAngleLeft = preferences.getInt("leftServo", centerAngle);
    lastAngleRight = preferences.getInt("rightServo", centerAngle);
    preferences.end();
    servoLeft.write(lastAngleLeft);
    servoRight.write(lastAngleRight);
}

void startPump() {
    digitalWrite(pumpIN1, HIGH);
    digitalWrite(pumpIN2, LOW);
    ledcWrite(0, 255);  // Full speed
    server.send(200, "text/plain", "Pump Started");
}
void stopPump() {
    digitalWrite(pumpIN1, LOW);
    digitalWrite(pumpIN2, LOW);
    ledcWrite(0, 0);  // Stop motor
    server.send(200, "text/plain", "Pump Stopped");
}
void moveLeft() { manualControl = true; lastAngleLeft = constrain(lastAngleLeft + 5, minAngle, maxAngle); lastAngleRight = constrain(lastAngleRight - 5, minAngle, maxAngle); servoLeft.write(lastAngleLeft); servoRight.write(lastAngleRight); saveServoPositions(); server.send(200, "text/plain", "Moved Left"); }
void moveRight() { manualControl = true; lastAngleLeft = constrain(lastAngleLeft - 5, minAngle, maxAngle); lastAngleRight = constrain(lastAngleRight + 5, minAngle, maxAngle); servoLeft.write(lastAngleLeft); servoRight.write(lastAngleRight); saveServoPositions(); server.send(200, "text/plain", "Moved Right"); }
void resumeAuto() { manualControl = false; server.send(200, "text/plain", "Auto Mode Resumed"); }

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) delay(500);
    servoLeft.attach(servoLeftPin);
    servoRight.attach(servoRightPin);
    calibrateServos();
    server.on("/", handleRoot);
    server.on("/pumpStart", startPump);
    server.on("/pumpStop", stopPump);
    server.on("/moveLeft", moveLeft);
    server.on("/moveRight", moveRight);
    server.on("/resumeAuto", resumeAuto);
    server.on("/updateValues", updateValues);
    pinMode(pumpIN1, OUTPUT);
pinMode(pumpIN2, OUTPUT);
pinMode(pumpENA, OUTPUT);
ledcAttachPin(pumpENA, 0);  // Set PWM channel for speed control
ledcSetup(0, 5000, 8);      // 5 kHz PWM, 8-bit resolution
server.begin();
}

void updateValues() {
    int lightLeft = analogRead(LDR1);
    int lightRight = analogRead(LDR2);
    String lightStatus;
    if (lightLeft > 3800 && lightRight > 3800) lightStatus = "Insufficient Light";
    else if (abs(lightLeft - lightRight) < 300) lightStatus = "Panel in Optimal Position";
    else lightStatus = "Adjusting Panel";
    
    String status = "Voltage: " + String(voltage, 2) + " V
";
    status += "Current: " + String(current, 2) + " A
";
    status += "Light Status: " + lightStatus + "
";
    status += "Current: " + String(current, 2) + " A
";
    status += "Light Status: " + lightStatus + "
";
    server.send(200, "text/plain", status);
}

void loop() {
    server.handleClient();
    if (!manualControl) {
        int lightLeft = analogRead(LDR1);
        int lightRight = analogRead(LDR2);
        if (abs(lightLeft - lightRight) > 300) {
            if (lightLeft > lightRight) {
                lastAngleLeft = constrain(lastAngleLeft + 5, minAngle, maxAngle);
                lastAngleRight = constrain(lastAngleRight - 5, minAngle, maxAngle);
            } else {
                lastAngleLeft = constrain(lastAngleLeft - 5, minAngle, maxAngle);
                lastAngleRight = constrain(lastAngleRight + 5, minAngle, maxAngle);
            }
            servoLeft.write(lastAngleLeft);
            servoRight.write(lastAngleRight);
            saveServoPositions();
        }
    }
    
    voltage += ((float)random(-50, 51)) / 100.0;
    voltage = constrain(voltage, 3.0, 8.0);
    
    current += ((float)random(-5, 6)) / 100.0;
    current = constrain(current, 0.05, 0.5);
    
    delay(500);
}
