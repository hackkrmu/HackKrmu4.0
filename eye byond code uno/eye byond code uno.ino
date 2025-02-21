const int trigPin = 9;
const int echoPin = 10;
const int ledPin = 5;     
const int motorPin = 6;    // Vibrator connected to PWM pin 6 via transistor
const int minDistance = 5;  // Minimum distance (cm) for max brightness/vibration
const int maxDistance = 100; // Maximum distance (cm) for turning off LED and motor

void setup() {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(ledPin, OUTPUT);
    pinMode(motorPin, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    long duration;
    int distance;

    // Send ultrasonic pulse
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    // Read the echo response
    duration = pulseIn(echoPin, HIGH);
    distance = duration * 0.034 / 2; // Convert to cm

    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" cm");

    // Check if object is within range
    if (distance > 0 && distance <= maxDistance) {
        // Map distance to brightness and vibration intensity
        int intensity = map(distance, minDistance, maxDistance, 255, 0);
        intensity = constrain(intensity, 0, 255); // Keep within safe range

        analogWrite(ledPin, intensity);    // Adjust LED brightness
        analogWrite(motorPin, intensity);  // Adjust vibration strength
    } else {
        // If object is out of range, turn off LED and motor
        analogWrite(ledPin, 0);
        analogWrite(motorPin, 0);
    }

    delay(100); // Small delay for stability
}
