#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

// SPI pin definitions
#define SCK  (13)   // Clock pin (D13)
#define MOSI (11)   // Data Out pin (D11)
#define MISO (12)   // Data In pin (D12)
#define SS   (10)   // Slave Select (can be any digital pin, using D10 here)

// Create an instance of the Adafruit_PN532 class
Adafruit_PN532 nfc(SS);

void setup(void) {
  Serial.begin(115200);

  // Initialize the PN532 in SPI mode
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    while (1); // Halt
  }

  // Configure the PN532 to read RFID tags
  nfc.SAMConfig();
}

void loop(void) {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on the card type)

  // Look for an NFC card
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if (success) {
    // Authenticate and read a block of data from the card
    uint8_t blockNumber = 4; // Block number to read
    uint8_t data[16];        // Buffer to store the data
    uint8_t key[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF}; // Default key

    // Authenticate using the default key
    if (nfc.mifareclassic_AuthenticateBlock(uid, uidLength, blockNumber, 0, key)) {
      // Read the data block
      if (nfc.mifareclassic_ReadDataBlock(blockNumber, data)) {
        // Convert the data back to the unique ID
        uint32_t uniqueID = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
        Serial.println(uniqueID);
      }
    }

    delay(1000);
  }
}