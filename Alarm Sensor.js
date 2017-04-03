/*
 * Homey CommandClass
 * Alarm Sensor
 * Version 1
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPEALARM#] = a supported alarm sensor type, displayed below
 * Type = Full name, including the brackets
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_ALARM',
	command_get: 'SENSOR_ALARM_GET',
	command_get_parser: () => ({
		'Sensor Type': '[#TYPEALARM#]'
	}),
	command_report: 'SENSOR_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (report['Sensor Type'] === '[#TYPEALARM#]') return report['Sensor State'] === 'alarm';
		return null;
	}
}

/*
 * SUPPORTED ALARM SENSOR TYPES (*):
 * ---------- FROM VERSION 1 ----------
 * General Purpose Alarm
 * Smoke Alarm
 * CO Alarm
 * CO2 Alarm
 * Heat Alarm
 * Water Leak Alarm
*/
