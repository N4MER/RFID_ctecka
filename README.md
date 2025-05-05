# RFID_ctecka
Evidence karet pomocí RFID čtečky

Potřebné technologie:
Node.js
Microsoft SQL Server Management Studio
Arduino IDE

Postup nastavení čtečky:

1.) V Microsoft SQL Server Management Studiu spusťte soubor db.sql, který naleznete ve složce others
2.) V terminálu zadejte umístění souboru a zadejte příkaz npm install
3.) Otevřete složku server a najděte soubor app.js na řádku 8 přepište ip serveru na ip vašeho serveru
4.) Ve složce mz modules otevřete soubor database.js a přepište config na řádku 4 na přihlašovací údaje k vaší databázi
5.) V terminálu zadejte příkaz npm run app.js
6.) Otevřete soubor wifi_modul.ino a na řádek 4 zadejte název sítě na kterém beží server a heslo (pokud nějaké je). Nakonec nahrajte soubor na wifi modul esp8266 a zapněte serial monitor
7.) Nahrajte soubor ctecka.ino na arduino
