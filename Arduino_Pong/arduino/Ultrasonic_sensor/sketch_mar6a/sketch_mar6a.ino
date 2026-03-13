const int sigPin = 7;
// Pin where the potentiometer is connected
const int potPin = A0;

// Variable to store the value
int potValue = 0;


long duration;
float distance;

void setup() {
  Serial.begin(9600);
}

void loop() {

  // Send trigger pulse
  pinMode(sigPin, OUTPUT);
  digitalWrite(sigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(sigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(sigPin, LOW);

  // Read echo
  pinMode(sigPin, INPUT);
  duration = pulseIn(sigPin, HIGH);

  // Convert to distance in cm
  distance = duration * 0.034 / 2;

  Serial.print("ultrasonic");
  Serial.print(":");
  Serial.println(distance);

  potValue = analogRead(potPin);  
  Serial.print("linear_pot");
  Serial.print(":");
  Serial.println(potValue);        // Send value to Serial Monitor

   // Read value from potentiometer


  delay(10);
}