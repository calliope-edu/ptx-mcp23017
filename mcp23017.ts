/**
 * Functions for the mcp23017 IO expander with the Calliope mini
 *
 * @author Moritz Heine
 */

//% weight=2 color=#1174EE block="mcp23017 IO expander"
namespace mcp23017 {
    let ADDRESS = 0x20;
    const MCP23017_GPIO_A = 0x12;
    const MCP23017_GPIO_B = 0x13;
    const MCP23017_IODIRA = 0x00;
    const MCP23017_IODIRB = 0x01;

    /**
     * Write digital value to pin
     */
    //% blockId=digitalWrite
    //% block="write digital value of pin %pin | %state "
    //% weight=210
    export function digitalWrite(pin: number, state: number): void {
        let reg = regOfPin(pin, MCP23017_GPIO_A, MCP23017_GPIO_B)
        let bit = bitOfPin(pin)
        let io_reg = regOfPin(pin, MCP23017_IODIRA, MCP23017_IODIRB)
        bitWrite(io_reg, bit, 0)
        bitWrite(reg, bit, state)
    }

    /**
     * Read digital value from pin
     */
    //% weight=209
    //% block="read digital value of pin %pin"
    //% blockId=digitalRead
    export function digitalRead(pin: number): number {
        let reg = regOfPin(pin, MCP23017_GPIO_A, MCP23017_GPIO_B)
        let bit = bitOfPin(pin)
        return bitRead(reg, bit)
    }

    /**
     * Set custom i2c address
     * only necessary if multiple chips are used
     */
    //% weight=208
    //% block="set i2c address to | %i2c_addr"
    //% blockId=i2c_address
    export function i2c_address(i2c_addr: number = 0): void {
        ADDRESS = 0x20 + i2c_addr
    }

    function bitOfPin(pin: number): number {
        return pin%8
    }

    function bitWrite(regAddr: number, bit: number, value: number) {
        let bits = readRegister(regAddr)
        if (((bits >> bit) & 0x1) != value) {
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