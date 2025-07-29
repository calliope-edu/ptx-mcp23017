You will find the English ReadMe at the end of the document.

# ptx-MCP23017
Der MCP23017 ist ein digitaler I/O-Portexpander von Microchip, der über die I²C-Schnittstelle kommuniziert. Er erweitert Mikrocontroller, wie den Calliope mini, um 16 zusätzliche digitale Ein- und Ausgänge. Diese lassen sich einzeln als Input oder Output konfigurieren.

Hauptmerkmale:

16 digitale I/O-Pins (GPIOs)
I²C-Adresse konfigurierbar (bis zu 8 Expander an einem Bus)
Jeder Pin individuell als Eingang oder Ausgang einstellbar
Interrupt-Funktion für schnelle Ereignisverarbeitung
Betriebsspannung: 1,8V bis 5,5V
Anwendungen:
Ideal, wenn mehr digitale Pins benötigt werden, z. B. für Taster, LEDs, Relais oder Sensoren.

# MakeCode-Erweiterung
In der Erweiterung muss zuerst die I²C-Adresse definiert werden.
Nun kann entweder ein digitaler Pin ausgelesen oder beschrieben werden.



# ptx-MCP23017

The MCP23017 is a digital I/O port expander from Microchip that communicates via the I²C interface.  
It extends microcontrollers like the Calliope mini with 16 additional digital input/output pins,  
each of which can be configured individually as either input or output.

## Key Features:

- 16 digital I/O pins (GPIOs)  
- Configurable I²C address (up to 8 expanders on one bus)  
- Each pin individually configurable as input or output  
- Interrupt functionality for fast event handling  
- Operating voltage: 1.8V to 5.5V  

## Applications:

Ideal when additional digital pins are needed, e.g., for buttons, LEDs, relays, or sensors.

# MakeCode Extension

In the extension, the I²C address must be defined first.  
After that, digital pins can either be read from or written to.


## License

MIT

# Supported target

* pxt/calliopemini
