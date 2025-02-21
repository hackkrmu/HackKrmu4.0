#define IN1 9  
#define IN2 10 

void setup() {
    
    pinMode(IN1, OUTPUT);
    pinMode(IN2, OUTPUT);
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    delay(3000); 

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);

    delay(15000); 

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
    delay(3000); 

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
}

void loop() {
    
}
