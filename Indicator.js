/*
 * Homey CommandClass
 * Indicator
 * Version 1 & 2
 * Device settings only
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== APP.JSON VERSION 1 - 2 ===========
 * SETTING_ID = Unique setting id for the device
 * SETTING_LABEL = Short description of what the setting does
 * SETTING_HINT = Optional, longer discription what the setting does
 */
{
  "id": "SETTING_ID",
  "type": "checkbox",
  "label": {
    "en": "SETTING_LABEL"
  },
  "hint": {
    "en": "SETTING_HINT" //Optional
  },
  "value": true
}

/*
 * =========== DRIVER.JS VERSION 1 ===========
 * SETTING_ID = Unique setting id for the device
*/
SETTING_ID: (newValue, oldValue, deviceData) => {
	const node = module.exports.nodes[deviceData.token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_INDICATOR !== 'undefined') {
	   //Send parameter values to module
 		node.instance.CommandClass.COMMAND_CLASS_INDICATOR.INDICATOR_SET({
 			"Value": (newValue) ? 1 : 0,
 		}, err => {
 			if (err) return console.error(err, false);
 		});
 	}
 },

 /*
  * =========== DRIVER.JS VERSION 2 ===========
  * !! === UNTESTED DRIVER --- !!
  * SETTING_ID = Unique setting id for the device
  * INDICATION_VERION_1_VALUE = The value (true = 1 / false = 0) that would be used in version 1
  * AMOUNT_INDICATORS = The amount of indicators you want to change
  *
  * # = the number of setable indicator, starting from 1
  * INDICATION_ID = Any of the supported indicators ids, displayed below
  * INDICATION_PROPERTY = Any of the supported indicators properties, displayed below
  * INDICATION_VALUE = Indication value, displayed below
  */
 SETTING_ID: (newValue, oldValue, deviceData) => {
 	const node = module.exports.nodes[deviceData.token];

 	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_INDICATOR !== 'undefined') {
 	   //Send parameter values to module
  		node.instance.CommandClass.COMMAND_CLASS_INDICATOR.INDICATOR_SET({
  			"Indicator 0 Value": INDICATION_VERION_1_VALUE,
        "Level": {
          "Indicator Object Count": AMOUNT_INDICATORS,
        },
        "Indicator ID #": INDICATION_ID,
        "Property ID #": INDICATION_PROPERTY,
        "Value #": INDICATION_VALUE,
  		}, err => {
  			if (err) return console.error(err, false);
  		});
  	}
  },

/*
 * SUPPORTED INDICATOR IDS:
 * ---------- FROM VERSION 2 ----------
 1 - ARMED
 2 - NOT_ARMED
 3 - READY
 4 - FAULT
 5 - BUSY
 6 - ENTER_ID
 7 - ENTER_PIN
 8 - OK
 9 - NOT_OK
 32 - ZONE1_ARMED
 33 - ZONE2_ARMED
 34 - ZONE3_ARMED
 35 - ZONE4_ARMED
 36 - ZONE5_ARMED
 37 - ZONE6_ARMED
 48 - LCD_BACKLIGHT
 64 - BUTTON_BACKLIGHT_LETTERS
 65 - BUTTON_BACKLIGHT_DIGITS
 66  -BUTTON_BACKLIGHT_COMMAND
 67 - BUTTON1_INDICATION
 68 - BUTTON2_INDICATION
 69 - BUTTON3_INDICATION
 70 - BUTTON4_INDICATION
 71 - BUTTON5_INDICATION
 72 - BUTTON6_INDICATION
 73 - BUTTON7_INDICATION
 74 - BUTTON8_INDICATION
 75 - BUTTON9_INDICATION
 76 - BUTTON10_INDICATION
 77 - BUTTON11_INDICATION
 78 - BUTTON12_INDICATION
 240 = Buzzer

 * SUPPORTED INDICATOR PROPERTIES AND ITS VALUES:
 * ---------- FROM VERSION 2 ----------
 1 - Multilevel
    0 = Off
    1-99 = Brightness indication
    255 = Previous value
 2 - Binary
    0 = Off
    1-99 = on
    255 = On
 3 - On_Off_Period
    0 - 0 seconds
    /\-[range]-\/
    255 = 25.5 seconds
 4 - On_Off_Cycles
    0 = 0 times
    /\-[range]-\/
    254 = 254 times
    255 = until stopped by an on/off signal
 16 - Low_power (GET only)
 */
