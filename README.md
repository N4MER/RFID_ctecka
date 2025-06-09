# RFID_ctecka
Evidence karet pomocí RFID čtečky

Potřebné technologie:
Node.js
Microsoft SQL Server Management Studio
Arduino IDE
Jakýkoliv terminál

Postup instalace čtečky:

1.) Stáhněte si složku RFID_čtečka

2.) Vytvořte databázi v Microsoft Management Studiu pomocí souboru db.sql, který naleznete v RFID_ctecka/other

3.) V terminálu zadejte cestu ke složce server a zadejte příkaz npm install

4.) Otevřete soubor app.js v RFID_ctecka/server ip adresu serveru na ip adresu vašeho serveru

5.) otevřete database.js v RFID_ctecka/server/myModules a přepište config na přihlašovací údaje do vaší databáze

6.) V terminálu zadejte příkaz npm run app.js

7.) Otevřete soubor wifi_modul.ino v RFID_ctecka/other/wifi_modul a do řádku ssid napište název sítě na ktém běží náš server a místo password heslo k vaší síti. Poté napište do serverUrl ip adresu serveru a za to napište /receive_card_id Nakonec nahrajte soubor do wifi modulu esp8266 a zapněte serial monitor

8.) Nahrajte soubor ctecka.ino na arduino
