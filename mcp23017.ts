/**
 * Functions for the mcp23017 IO expander with the Calliope mini
 *
 * @author Moritz Heine
 */

namespace mcp23017 {

    const ADDRESS = 0x20;
    const MCP23017_GPIO_A = 0x12;
    const MCP23017_GPIO_B = 0x13;
    const MCP23017_IODIRA = 0x00;
    const MCP23017_IODIRB = 0x01;

    /**
     * Initialize mcp23017 module.
     */
    export function init(): void {
        // set all pins on both registers to input
        write_reg(MCP23017_IODIRA, 0xff)
        write_reg(MCP23017_IODIRB, 0xff)
    }

    /**
     * Write digital value to pin
     */
    export function digitalWrite(pin: number = 0, state: number = 0): void {
        let reg = regOfPin(pin, MCP23017_GPIO_A, MCP23017_GPIO_B)
        let bit = bitOfPin(pin)
        let io_reg = regOfPin(pin,MCP23017_IODIRA,MCP23017_IODIRB)
        bitWrite(io_reg,bit,0)
        bitWrite(reg, bit, state)
    }

    /**
     * Read digital value from pin
     */
    export function digitalRead(pin: number): number {
        let reg = regOfPin(pin, MCP23017_GPIO_A, MCP23017_GPIO_B)
        let bit = bitOfPin(pin)
        return bitRead(reg, bit)
    }

    function bitOfPin(pin: number): number {
        return pin%8
    }

    function bitWrite(regAddr: number, bit: number, value: number) {
        let bits = readRegister(regAddr)
        if (((bits >> bit) & 0x1) != value) {
            // if bit not in desired state flip it
            write_reg(regAddr, bits ^ (1 << bit))
        }
    }

    function bitRead(regAddr: number, bit: number): number {
        let bits = readRegister(regAddr)
        return (bits >> bit) & 0x1
    }

    function regOfPin(pin: number, portAaddr: number, portBaddr: number): number {
        return (pin<8) ? portAaddr : portBaddr
    }

    function write_reg(reg: number, val: number): void {
        pins.i2cWriteNumber(ADDRESS, (reg << 8) | val, NumberFormat.UInt16BE)
    }
    
    function readRegister(reg: number): number {
        pins.i2cWriteNumber(ADDRESS, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDRESS, NumberFormat.UInt8BE)
    }
}