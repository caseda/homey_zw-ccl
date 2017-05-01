/*
 * Homey CommandClass
 * Battery
 * Version 1
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 ===========
 * If the battery level is not send on interval or device usage, set getOnWakeUp to true
 * if it is send by the device (= false), then it can also be removed
*/

measure_battery: {
	getOnWakeUp: false,
	command_class: 'COMMAND_CLASS_BATTERY',
	command_get: 'BATTERY_GET',
	command_report: 'BATTERY_REPORT',
	command_report_parser: report => {
		if (!report) return null;
		if (typeof report['Battery Level'] === 'string' && report['Battery Level'] === 'battery low warning') return 1;
		if (typeof report['Battery Level (Raw)'] !== 'undefined') return report['Battery Level (Raw)'][0];
		return null;
	},
},
