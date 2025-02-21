#include <Servo.h>  

Servo myServo;  
int ldrPin = A0;  
int threshold = 500;  

void setup() {
    myServo.attach(9);  
    myServo.write(0);   
    pinMode(ldrPin, INPUT);
}

void loop() {
    int lightValue = analogRead(ldrPin);  

    if (lightValue > threshold) {  
        myServo.write(90);  
    } else {  
        myServo.write(0);  
    }

    delay(100);  
}
