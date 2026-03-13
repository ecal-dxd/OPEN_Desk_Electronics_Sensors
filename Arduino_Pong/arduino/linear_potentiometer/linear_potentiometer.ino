// Pin where the potentiometer is connected
const int potPin = A0;

// Variable to store the value
int potValue = 0;

void setup() {
  Serial.begin(9600);   // Start serial communication
}

void loop() {
  potValue = analogRead(potPin);   // Read value from potentiometer

  Serial.print("Potentiometer value: ");
  Serial.println(potValue);        // Send value to Serial Monitor

}