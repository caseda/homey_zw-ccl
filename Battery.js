/*
 * Homey CommandClass
 * Battery
 * Version 1
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 (with alarm_battery) ===========
 * This not only uses the measure_battery capability, but also the battery_alarm capability
 * If the battery level is not send on interval or device usage, set getOnWakeUp to true
 * if it is send by the device (= false), then it can also be removed
 * NOTE: the alarm_battery at the end is needed, it is the bare minimum
*/

measure_battery: {
	getOnWakeUp: false,
	command_class: 'COMMAND_CLASS_BATTERY',
	command_get: 'BATTERY_GET',
	command_report: 'BATTERY_REPORT',
	command_report_parser: (report, node) => {
		if (typeof report['Battery Level'] === 'string' && report['Battery Level'] === 'battery low warning') {
			if (typeof node.state !== 'undefined' && (typeof node.state.alarm_battery === 'undefined' || node.state.alarm_battery !== true)) {
				node.state.alarm_battery = true;
				module.exports.realtime(node.device_data, 'alarm_battery', true);
			}
			return 1;
		}
		if (typeof report['Battery Level (Raw)'] !== 'undefined') {
			if (typeof node.state !== 'undefined' && (typeof node.state.alarm_battery === 'undefined' || node.state.alarm_battery !== false)) {
				node.state.alarm_battery = false;
				module.exports.realtime(node.device_data, 'alarm_battery', false);
			}
			return report['Battery Level (Raw)'][0];
		}
		return null;
	},
},
alarm_battery: {
	command_class: 'COMMAND_CLASS_BATTERY',
},

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
	command_report_parser: (report, node) => {
		if (typeof report['Battery Level'] === 'string' && report['Battery Level'] === 'battery low warning') return 1;
		if (typeof report['Battery Level (Raw)'] !== 'undefined') return report['Battery Level (Raw)'][0];
		return null;
	},
},
