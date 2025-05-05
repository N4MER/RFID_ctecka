#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "";
const char* password = "";

String serverUrl = "";

const int ledFalsePin = 5;
const int ledTruePin = 4;

void setup() {
  Serial.begin(9600);

  pinMode(ledFalsePin, OUTPUT);
  pinMode(ledTruePin, OUTPUT);

  delay(2000);

  digitalWrite(ledFalsePin, HIGH);
  digitalWrite(ledTruePin, HIGH);
  delay(500);
  digitalWrite(ledFalsePin, LOW);
  digitalWrite(ledTruePin, LOW);
  delay(500);
  digitalWrite(ledFalsePin, HIGH);
  digitalWrite(ledTruePin, HIGH);
  delay(500);
  digitalWrite(ledFalsePin, LOW);
  digitalWrite(ledTruePin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  if (Serial.available()) {
    String cardID = Serial.readStringUntil('\n');
    cardID.trim();

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      WiFiClient client;

      http.begin(client, serverUrl);
      http.addHeader("Content-Type", "text/plain");

      int httpCode = http.POST(cardID);

      if (httpCode == 200) {
        String response = http.getString();
        response.trim();

        if (response == "true") {
          digitalWrite(ledTruePin, HIGH);
          digitalWrite(ledFalsePin, LOW);
          delay(2000);
          digitalWrite(ledTruePin, LOW);
        } else if (response == "false") {
          digitalWrite(ledTruePin, LOW);
          digitalWrite(ledFalsePin, HIGH);
          delay(2000);
          digitalWrite(ledFalsePin, LOW);
        } else {
          digitalWrite(ledTruePin, LOW);
          digitalWrite(ledFalsePin, LOW);
        }
      } else {
        Serial.println("HTTP request failed");
      }

      http.end();
    }
  }
}
