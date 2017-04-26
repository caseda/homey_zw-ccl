/*
 * Homey CommandClass
 * Wake Up (GET ONLY)
 * Versions 1 - 2
 *
 * It is not really necessary to get these values.
 * The wake up interval is already bound in the device's setting popup.
 * But if you want to know the range of a device,
 * then this A way to get the default (version 1) or the range (version 2) values
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GETTING WAKE UP INTERVAL (version 1) ===========
 * To get a certain device's default wake up interval we can use the
 * "Send raw data" in the z-wave settings.
 *
 * NODE_ID = the node id you want the information from (Decimal or Hexadecimal)
 * 0x84 = COMMAND_CLASS_WAKE_UP
 * 0x05 = WAKE_UP_INTERVAL_GET
 *
 * The device does need to be awake just before sending this GET.
 *
 * Report back will be in Hexadecimal:
 * COMMAND_CLASS_WAKE_UP, data: 0x06#1#2#3#4
 * 06 = WAKE_UP_INTERVAL_REPORT
 * #1 - #3 = Default Seconds
 * #4 = receiving NODE_ID (Homey)
 *
 * IE: 0x06000e1001 = Default Seconds: 3600
 */

NODE_ID,0x84,0x05

/*
 * =========== GETTING WAKE UP INTERVAL (version 2) ===========
 * To get a certain device's wake up range we can use the
 * "Send raw data" in the z-wave settings.
 *
 * NODE_ID = the node id you want the information from (Decimal or Hexadecimal)
 * 0x84 = COMMAND_CLASS_WAKE_UP
 * 0x09 = WAKE_UP_INTERVAL_CAPABILITIES_GET
 *
 * The device does need to be awake just before sending this GET.
 *
 * Report back will be in Hexadecimal:
 * COMMAND_CLASS_WAKE_UP, data: 0x0a#1#2#3#4#5#6#7#8#9#A#B#C
 * 0a = WAKE_UP_INTERVAL_REPORT
 * #1 - #3 = Minimum Seconds
 * #4 - #6 = Maximum Seconds
 * #7 - #9 = Default Seconds
 * #A - #C = Step Size
 *
 * IE:  0x0a0000f0000e10000e1000003c = min sec: 0, max sec: 3600, def sec: 3600, step size: 60 seconds
 */

NODE_ID,0x84,0x09
