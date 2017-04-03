/*
 * Homey CommandClass
 * Binary Sensor
 * Version 1 - 2
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 ===========
 * If Hardware changes don't come in on this CommandClass
 * Add the BASIC CommandClass for report
 * Code (Example) is given below
 *
 * [#CAPABILITY#] = the used capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_BINARY',
	command_get: 'SENSOR_BINARY_GET',
	command_report: 'SENSOR_BINARY_REPORT',
	command_report_parser: report => report['Sensor Value'] === 'detected an event'
}

/*
 * =========== GENERAL CODE: VERSION 1 INCLUDING BASIC ===========
 * !! USE ONLY WHEN HARDWARE CHANGES DON'T COME IN ON BINARY SENSOR COMMANDCLASS !!
 *
 * [#CAPABILITY#] = the used capability
*/

[#CAPABILITY#]: [
	{
		command_class: 'COMMAND_CLASS_SENSOR_BINARY',
		command_get: 'SENSOR_BINARY_GET',
		command_report: 'SENSOR_BINARY_REPORT',
		command_report_parser: report => report['Sensor Value'] === 'detected an event'
	},
	{
		command_class: 'COMMAND_CLASS_BASIC',
		command_report: 'BASIC_SET',
		command_report_parser: report => report.Value === 255
	}
]

/*
 * =========== GENERAL CODE: VERSION 2 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPESENSOR#] = the supported sensor type, displayed below
 * Type = Full name
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_BINARY',
	command_get: 'SENSOR_BINARY_GET',
	command_get_parser: () => ({
		'Sensor Type': '[#TYPESENSOR#]'
	}),
	command_report: 'SENSOR_BINARY_REPORT',
	command_report_parser: report => {
		if (report['Sensor Type'] === '[#TYPESENSOR#]') return report['Sensor Value'] === 'detected an event';
		return null;
	}
}

/*
 * =========== GENERAL CODE: SUPPORTED SENSOR TYPES ===========
 * This will give you all sensor types that are supported by the device in CLI Debug
 * !! ONLY SUPPORTED FROM VERSION 2 !!
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_BINARY',
	command_get: 'SENSOR_BINARY_SUPPORTED_GET_SENSOR',
	command_report: 'SENSOR_BINARY_SUPPORTED_SENSOR_REPORT'
}

/*
 * SUPPORTED SENSOR TYPES (*):
 * ---------- FROM VERSION 2 ----------
 * General purpose
 * Smoke
 * CO
 * CO2
 * Heat
 * Water
 * Freeze
 * Tamper
 * Aux
 * Door/Window
 * Tilt
 * Motion
 * Glass Break
