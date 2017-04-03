/*
 * Homey CommandClass
 * Binary Switch
 * Version 1 - 2
 * 
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 ===========
 * [#CAPABILITY#] = the used capability
*/

'[#CAPABILITY#]': {
	'command_class': 'COMMAND_CLASS_SWITCH_BINARY',
	'command_get': 'SWITCH_BINARY_GET',
	'command_set': 'SWITCH_BINARY_SET',
	'command_set_parser': value => ({
		'Switch Value': (value) ? 'on/enable' : 'off/disable'
	}),
	'command_report': 'SWITCH_BINARY_REPORT',
	'command_report_parser': report => report.Value === 'on/enable'
}

/*
 * =========== GENERAL CODE: VERSION 2 ===========
 * [#CAPABILITY#] = the used capability
*/

'[#CAPABILITY#]': {
	command_class: 'COMMAND_CLASS_SWITCH_BINARY',
	command_get: 'SWITCH_BINARY_GET',
      	command_set: 'SWITCH_BINARY_SET',
      	command_set_parser: value => ({
        	'Target Value': (value) ? 'on/enable' : 'off/disable',
        	'Duration': 'Default'
      	}),
      	command_report: 'SWITCH_BINARY_REPORT',
      	command_report_parser: report => {
        	if (report.hasOwnProperty('Current Value')) return report['Current Value'] === 'on/enable';
        	return null;
      	},
}
