/*
 * Homey CommandClass
 * MultiLevel Switch
 * Versions 1 - 4
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== ON SIGNAL APP.JSON ===========
 * Make sure the "on" signal when dimming is turned off, in the app.json
 * This is to prevent the dimmer falling back into its previous value (on = 255)
*/
"capabilitiesOptions": {
	"onoff": {
		"setOnDim": false
	}
},
"drivers": {
	...
}

/*
 * =========== GENERAL CODE: VERSION 1 ON/OFF ===========
*/

onoff: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: value => ({
		Value: (value) ? 'on/enable' : 'off/disable',
	}),
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (!report) return null;
		if (typeof report.Value === 'string') return report.Value === 'on/enable';
		if (typeof report.Value === 'number') return report.Value > 0;
		if (typeof report['Value (Raw)'] !== 'undefined') return report['Value (Raw)'][0] > 0;
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSION 1 DIM ===========
*/

dim: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: (value, node) => {
		if (node) {
			node.state.onoff = value > 0;
			module.exports.realtime(node.device_data, 'onoff', value > 0);
		}
		return {
			Value: Math.round(value * 99),
		}
	},
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: (report, node) => {
		if (!report) return null;
		if (typeof report.Value === 'string') {
			if (node) {
				node.state.onoff = report.Value === 'on/enable';
				module.exports.realtime(node.device_data, 'onoff', report.Value === 'on/enable');
			}
			return (report.Value === 'on/enable') ? 1.0 : 0.0;
		}
		if (typeof report.Value === 'number') {
			if (node) {
				node.state.onoff = report.Value > 0;
				module.exports.realtime(node.device_data, 'onoff', report.Value > 0);
			}
			return report.Value / 99;
		}
		if (typeof report['Value (Raw)'] !== 'undefined') {
			if (report['Value (Raw)'] === 254) return null;
			if (node) {
				node.state.onoff = report['Value (Raw)'][0] > 0;
				module.exports.realtime(node.device_data, 'onoff', report['Value (Raw)'][0] > 0);
			}
			if (report['Value (Raw)'][0] === 255) return 1.0;
			return report['Value (Raw)'][0] / 99;
		}
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSIONS 2 - 3 ON/OFF ===========
*/

onoff: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: value => ({
		Value: (value) ? 'on/enable' : 'off/disable',
		'Dimming Duration': 'Factory default',
	}),
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (!report) return null;
		if (typeof report.Value === 'string') return report.Value === 'on/enable';
		if (typeof report.Value === 'number') return report.Value > 0;
		if (typeof report['Value (Raw)'] !== 'undefined') return report['Value (Raw)'][0] > 0;
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSIONS 2 - 3 DIM ===========
*/

dim: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: (value, node) => {
		if (node) module.exports.realtime(node.device_data, 'onoff', value > 0);
		return {
			Value: Math.round(value * 99),
			'Dimming Duration': 'Factory default',
		}
	},
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: (report, node) => {
		if (!report) return null;
		if (typeof report.Value === 'string') {
			if (node) {
				node.state.onoff = report.Value === 'on/enable';
				module.exports.realtime(node.device_data, 'onoff', report.Value === 'on/enable');
			}
			return (report.Value === 'on/enable') ? 1.0 : 0.0;
		}
		if (typeof report.Value === 'number') {
			if (node) {
				node.state.onoff = report.Value > 0;
				module.exports.realtime(node.device_data, 'onoff', report.Value > 0);
			}
			return report.Value / 99;
		}
		if (typeof report['Value (Raw)'] !== 'undefined') {
			if (report['Value (Raw)'] === 254) return null;
			if (node) {
				node.state.onoff = report['Value (Raw)'][0] > 0;
				module.exports.realtime(node.device_data, 'onoff', report['Value (Raw)'][0] > 0);
			}
			if (report['Value (Raw)'][0] === 255) return 1.0;
			return report['Value (Raw)'][0] / 99;
		}
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSION 4 ON/OFF ===========
 * !! REPORT UNTESTED !!
*/

onoff: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: value => ({
		Value: (value) ? 'on/enable' : 'off/disable',
		'Dimming Duration': 'Factory default',
	}),
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (!report) return null;
		if (typeof report['Current Value'] === 'string') return report['Current Value'] === 'on/enable';
		if (typeof report['Current Value'] === 'number') return report['Current Value'] > 0;
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSION 4 DIM ===========
 * !! REPORT UNTESTED !!
*/

dim: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_GET',
	command_set: 'SWITCH_MULTILEVEL_SET',
	command_set_parser: value => {
		Value: Math.round(value * 99),
		'Dimming Duration': 'Factory default',
	},
	command_report: 'SWITCH_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (!report) return null;
		if (typeof report['Current Value'] === 'string') {
			if (node) {
				node.state.onoff = report['Current Value'] === 'on/enable';
				module.exports.realtime(node.device_data, 'onoff', report['Current Value'] === 'on/enable');
			}
			return (report['Current Value'] === 'on/enable') ? 1.0 : 0.0;
		}
		if (typeof report['Current Value'] === 'number') {
			if (report['Current Value'] === 254) return null;
			if (node) {
				node.state.onoff = report['Current Value'] > 0;
				module.exports.realtime(node.device_data, 'onoff', report['Current Value'] > 0);
			}
			if (report['Current Value'] === 255) return 1.0;
			return report['Current Value'] / 99;
		}
		return null;
	},
}

/*
 * =========== GENERAL CODE: VERSION 3 - 4 SUPPORTED SWITCH TYPES ===========
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
	command_get: 'SWITCH_MULTILEVEL_SUPPORTED_GET',
	command_report: 'SWITCH_MULTILEVEL_SUPPORTED_REPORT'
}

/*
 * SUPPORTED SWITCH TYPES (*):
 * ---------- FROM VERSION 3 ----------
 * # - 00 / 63/FF <= THE HEXIDECIMAL/RAW VALUES
 * 0 - Undefined
 * 1 - Off / On
 * 2 - Down / Up
 * 3 - Close / Open
 * 4 - Counter-Clockwise / Clockwise
 * 5 - Left / Right
 * 6 - Reverse / Forward
 * 7 - Pull / Push
*/
