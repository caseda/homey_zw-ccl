/*
 * Homey CommandClass
 * Meter
 * Versions 1 - 4
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPESCALE#] = a supported meter scale, displayed below
 * Scale = Just the Number (0 - 3)
 *
 * !! Opional !!
 * with Meter Types:
 * 'Electric meter'
 * 'Gas meter'
 * Since there is only 1 Scale, you can have the report parser like this:
 * 'command_report_parser': report => report['Meter Value (Parsed)']
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_GET',
	command_report: 'METER_REPORT',
	command_report_parser: report => {
		if (report.hasOwnProperty('Properties1') &&
			report.Properties1.hasOwnProperty('Scale') &&
			report.Properties1.Scale === [#TYPESCALE#]) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: VERSION 2 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPESCALE#] = a supported scale type, displayed below
 * Scale = Just the Number (0 - 3)
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_GET',
	command_get_parser: () => ({
		Properties1: {
			Scale: [#TYPESCALE#],
		}
	}),
	command_report: 'METER_REPORT',
	command_report_parser: report => {
		if (report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale') &&
			report.Properties2.Scale === [#TYPESCALE#]) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: VERSION 3 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPESCALE#] = a supported scale type, displayed below
 * Scale = Just the Number (0 - 6)
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_GET',
	command_get_parser: () => ({
		Properties1: {
			Scale: [#TYPESCALE#],
		}
	}),
	command_report: 'METER_REPORT',
	command_report_parser: report => {
		if (report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale bits 10') &&
			report.Properties2['Scale bits 10'] === [#TYPESCALE#]) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: VERSION 4 (NO kVar/kVarh Support)===========
 * To see if your module has kVar and kVarh support,
 * you need to use the "GET SUPPORTED" displayed below
 * or look for "'Scale bit 2': false" in DEBUG REPORT
 * [#CAPABILITY#] = the used capability
 * [#TYPERATE#] = a supported rate type, displayed below
 * Rate = Full name
 * [#TYPESCALE-1#] = a supported scale type, displayed below
 * [#TYPESCALE-2#] = a supported scale type, displayed below
 * Scale = Just the Number (0 - 7)
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_GET',
	command_get_parser: () => ({
		Properties1: {
			'Rate Type': '[#TYPERATE#]',
			Scale: [#TYPESCALE-2#],
		},
		'Scale 2': 0,
	}),
	command_report: 'METER_REPORT',
	command_report_parser: report => {
		if (report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale bits 10') &&
			report.Properties2['Scale bits 10'] === [#TYPESCALE-2#]) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: VERSION 4 (kVar/kVarh Support)===========
 * To see if your module has kVar and kVarh support,
 * you need to use the "GET SUPPORTED" displayed below
 * or look for "'Scale bit 2': true" in DEBUG REPORT
 * [#CAPABILITY#] = the used capability
 * [#TYPERATE#] = a supported rate type, displayed below
 * Rate = Full name
 * [#TYPESCALE-1#] = a supported scale type, displayed below
 * [#TYPESCALE-2#] = a supported scale type, displayed below
 * [#TYPESCALE-3#] = a supported scale type, displayed below
 * Scale = Just the Number
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_GET',
	command_get_parser: () => ({
		Properties1: {
			'Rate Type': '[#TYPERATE#]',
			Scale: [#TYPESCALE-1#],
		},
		'Scale 2': [#TYPESCALE-2#],
	}),
	command_report: 'METER_REPORT',
	command_report_parser: report => {
		if (report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale bits 10') &&
			report.Properties2['Scale bits 10'] === [#TYPESCALE-1#] &&
			report.hasOwnProperty('Scale 2') &&
			report['Scale 2'] === [#TYPESCALE-3#]) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: GET SUPPORTED TYPES AND SCALES FROM SENSOR ===========
 * This will give you all sensor types that are supported by the device in CLI Debug
 * !!!!! ONLY SUPPORTED FROM VERSION 2 AND UP !!!!!
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_SUPPORTED_GET',
	command_report: 'METER_SUPPORTED_REPORT'
}

/*
 * =========== GENERAL CODE: RESET METER [GET] ===========
 * !!!!! THIS WILL RESET ALL ACCUMULATED METER VALUES !!!!!!
 * !! ONLY FROM VERSION 2 AND UP !!
 * It will activate as soon as the capability is being GET
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_get: 'METER_RESET'
}

/*
 * =========== GENERAL CODE: RESET METER [SET] ===========
 * !!!!! THIS WILL RESET ALL ACCUMULATED METER VALUES !!!!!!
 * !! ONLY FROM VERSION 2 AND UP !!
 * It will activate as soon as the capability used is being SET
 *
 * Make sure the user knows this action can't be reversed
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_METER',
	command_set: 'METER_RESET',
	command_set_parser: {
		return null;
	}
}

/*
 * =========== GENERAL CODE: RESET METER [FLOW] ===========
 * !!!!! THIS WILL RESET ALL ACCUMULATED METER VALUES !!!!!!
 * !! ONLY FROM VERSION 2 AND UP !!
 *
 * Make sure the user knows this action can't be reversed!
*/
// ========== APP.JSON .actions[]: ==========
{
	"id": "micro_smart_plug_reset_meter",
	"title": {
		"en": "Reset power meter (kWh)"
	},
	"hint": {
		"en": "WARNING: This action can't be undone."
	},
	"args": [
		{
			"name": "device",
			"type": "device",
			"filter": "driver_id=micro_smart_plug"
		}
	]
}
// =========== DRIVER.JS: ==========
Homey.manager('flow').on('action.reset_meter', (callback, args) => {
	const node = module.exports.nodes[args.device.token];

	if (typeof node.instance.CommandClass.COMMAND_CLASS_METER !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_METER.METER_RESET({}, (err, result) => {
			if (err) return callback(err, false);
			if (result === 'TRANSMIT_COMPLETE_OK') return callback(null, true);
			return callback(result, false);
		});
	} else return callback('device_not_available', false);
});

/*

 ============ VERSION 1 - 3 =============
 * SUPPORTED SENSOR TYPES (*) AND SCALES:
 * SCALES FROM VERSION 1 = **---
 * SCALES FROM VERSION 2 = ***--
 * SCALES FROM VERSION 3 = ****-
 * --------------------------------------

 * Electric meter
 **--- 0 - kilo Watt hours (kWh)
 ***-- 1 - kiloVolt-Ampere hour (kVAh)
 ***-- 2 - Wattage (W)
 ***-- 3 - Pulse Count
 ****- 4 - Voltage (V)
 ****- 5 - Amperage (A)
 ****- 6 - Power Factor

 * Gas meter
 **--- 0 - Cubic Meters (M³)
 ***-- 1 - Cubic Feet
 ***-- 3 - Pulse Count

 * Water meter
 **--- 0 - Cubic Meters (M³)
 **--- 1 - Cubic Feet
 **--- 2 - US Gallon
 ***-- 3 - Pulse Count

 ============= VERSION 4 ==============

 * RATE TYPES (*):
 * !! ONLY FROM VERSION 4 !!
 * Import
 *    = Consumed

 * Export
 *    = Produced

 * SCALES FROM VERSION 4

 - kilo Watt hours (kWh)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 0
	 [#TYPESCALE-3#]: 0
 - kiloVolt-Ampere hour (kVAh)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 1
	 [#TYPESCALE-3#]: 16
 - Wattage (W)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 2
	 [#TYPESCALE-3#]: 32
 - Pulse Count
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 3
	 [#TYPESCALE-3#]: 48
 - Voltage (V)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 4
	 [#TYPESCALE-3#]: 64
 - Amperage (A)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 5
	 [#TYPESCALE-3#]: 80
 - Power Factor
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 6
	 [#TYPESCALE-3#]: 96
 - kiloVolt-Ampere reactive (kVar)
	 [#TYPESCALE-1#]: 0
	 [#TYPESCALE-2#]: 7
	 [#TYPESCALE-3#]: 112
 - kiloVolt-Ampere reactive/hour (kVarh)
	 [#TYPESCALE-1#]: 1
	 [#TYPESCALE-2#]: 7
	 [#TYPESCALE-3#]: 113
*/
