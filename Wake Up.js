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
 * NODE_ID = The NodeID you want the information from (Decimal or Hexadecimal)
 * 0x84 = COMMAND_CLASS_WAKE_UP
 * 0x05 = WAKE_UP_INTERVAL_GET
 *
 * The device does need to be awake just before sending this GET.
 *
 * Report back will be in Hexadecimal:
 * COMMAND_CLASS_WAKE_UP, data: 0x06#1#2#3#4
 * 0x06    = WAKE_UP_INTERVAL_REPORT
 * #1 - #3 = Current Wake up interval (seconds)
 * #4      = NodeID receiving the "WAKE_UP_NOTIFICATION" (Homey)
 *
 * IE: data: 0x06000e1001
 * 000e10 = 3600 = Current Wake up interval (seconds)
 * 01     = 1    = NodeID receiving the "WAKE_UP_NOTIFICATION" (Homey)
 */

NODE_ID,0x84,0x05

/*
 * =========== GETTING WAKE UP INTERVAL (version 2) ===========
 * To get a certain device's wake up range we can use the
 * "Send raw data" in the z-wave settings.
 *
 * NODE_ID = The NodeID you want the information from (Decimal or Hexadecimal)
 * 0x84 = COMMAND_CLASS_WAKE_UP
 * 0x09 = WAKE_UP_INTERVAL_CAPABILITIES_GET
 *
 * The device does need to be awake just before sending this GET.
 *
 * Report back will be in Hexadecimal:
 * COMMAND_CLASS_WAKE_UP, data: 0x0a#1#2#3#4#5#6#7#8#9#A#B#C
 * 0x0a    = WAKE_UP_INTERVAL_CAPABILITIES_REPORT
 * #1 - #3 = Minimum wake up interval (seconds)
 * #4 - #6 = Maximum wake up interval (seconds)
 * #7 - #9 = Default wake up interval (seconds)
 * #A - #C = Wake up interval step (seconds)
 *
 * IE: data: 0x0a0000f0000e10000e1000003c
 * 0000f0 = 240s  = Minimum wake up interval (seconds)
 * 000e10 = 3600s = Maximum wake up interval (seconds)
 * 000e10 = 3600s = Default wake up interval (seconds)
 * 00003c = 60s   = Wake up interval step (seconds)
 */

NODE_ID,0x84,0x09
