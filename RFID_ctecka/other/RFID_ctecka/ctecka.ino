#include <SPI.h>
#include <MFRC522.h>


const int greenLEDPin = 6; 
const int redLEDPin = 5;

#define SDA_PIN 10
#define RST_PIN 9

MFRC522 rfid(SDA_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  delay(2000);    
  SPI.begin();
  rfid.PCD_Init();
  delay(1000);

  pinMode(greenLEDPin, OUTPUT); 
  pinMode(redLEDPin, OUTPUT);
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  unsigned long cardID = getCardID(rfid.uid.uidByte, rfid.uid.size);

  Serial.println(cardID);

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  delay(1000); 
}

unsigned long getCardID(byte *buffer, byte bufferSize) {
  unsigned long cardID = 0;
  for (byte i = 0; i < bufferSize; i++) {
    cardID = (cardID << 8) | buffer[i];
  }
  return cardID;
}
