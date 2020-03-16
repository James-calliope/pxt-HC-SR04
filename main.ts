/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum Distance_Unit {
    //% block="mm" enumval=0
    Distance_Unit_mm,

    //% block="cm" enumval=1
    Distance_Unit_cm,

    //% block="inch" enumval=2
    Distance_Unit_inch,
}


/**
 * Custom blocks
 */
//% weight=10 color=#0fbc11 icon="\uf140"
namespace HCSR04 {

    /**
    * get Ultrasonic distance
    */
    //%  block="Ultrasonic distance in unit %distance_unit at trig pin%trig echo pin %echo"
    //% weight=10
    export function distance(distance_unit: Distance_Unit, trig: DigitalPin, echo: DigitalPin): number {

        // send pulse
        pins.setPull(trig, PinPullMode.PullNone)
        pins.digitalWritePin(trig, 0)
        control.waitMicros(2)
        pins.digitalWritePin(trig, 1)
        control.waitMicros(10)
        pins.digitalWritePin(trig, 0)

        // read pulse
        let d = pins.pulseIn(echo, PulseValue.High, 25000)  // 8 / 340 = 
        let distance = d * 9 / 6 / 58

        if (distance > 400) {
            distance = 0
        }

        switch (distance_unit) {
            case 0:
                return Math.floor(distance * 10) //mm
                break
            case 1:
                return Math.floor(distance)  //cm
                break
            case 2:
                return Math.floor(distance / 254)   //inch
                break
            default:
                return 0
        }

    }

}