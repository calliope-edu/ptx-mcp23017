/**
 * Functions for the mcp23017 IO expander with the calliope mini
 *
 * @author Moritz Heine
 */

namespace mcp23017 {


    const ADDRESS = 0x20;
    const GPIO_A = 0x12;
    const GPIO_B = 0x13;
    const MCP23017_IODIRA = 0x00;
    const MCP23017_IODIRB = 0x01;

    /**
     * Initialize mcp23017 module.
     */
    //% weight=210
    //% blockId=mcp23017_init block="initialize mcp23017 chip"
    //% blockExternalInputs=1
    //% parts="mcp23017"
    export function init(): void {
        // set all pins on both registers to output
        write_reg(MCP23017_IODIRA, 0x00)
        write_reg(MCP23017_IODIRB, 0x00)
    }
    /**
     * Write digital value to pin
     */
    //% weight=209
    //% blockId=mcp23017_digitalWrite block="write digital value to pin"
    //% parts="mcp23017"
    export function digitalWrite(pin: number, state: string): void {
        let reg = regOfPin(pin, GPIO_A, GPIO_B)
        let state_bool = state == 'HIGH' ? 1 : 0
        let bit = bitOfPin(pin)
        bitWrite(reg, bit, state_bool)
    }
    
    /**
     * Read digital value from pin
     */
    //% weight=208
    //% blockId=mcp23017_digitalRead block="read digital value from pin"
    //% parts="mcp23017"
    export function digitalRead(pin: number): number {
        let reg = regOfPin(pin, GPIO_A, GPIO_B)
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
            write_reg(regAddr, (bits ^ (2 << (bit - 1))))
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