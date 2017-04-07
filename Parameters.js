/*
 * Parameters
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== BASIC CODE ===========
 * =========== APP.JSON ===========
*/
{
		"id": "APP_ID",
		...
		"drivers": [
				{
						"id": "DRIVER_ID",
						...
						"settings": [

						]
				}
		]
}
// =========== DRIVER.JS ===========
module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		...
	},
	settings: {
		YOUR_SETTINGS_HERE
	}
});

/*
 * =========== SETTING DROPDOWN ===========
 * =========== APP.JSON ===========
*/
{
	"id": "SETTING_ID",
	"type": "dropdown",
	"label": {
		"en": "SHORT_DESCRIPTION"
	},
	"hint": {
		"en": "DESCRIPTION, optional"
	},
	"value": "DEFAULT_VALUE",
	"values": [
		{
			"id": "VALUE_1",
			"label": {
				"en": "VALUE_1_DESCRIPTION"
			}
		},
		{
			"id": "VALUE_2",
			"label": {
				"en": "VALUE_2_DESCRIPTION"
			}
		}
	]
}
// =========== DRIVER.JS ===========
SETTING_ID: {
	index: PARAMETER_NUMBER,
	size: PARAMETER_SIZE,
	signed: false, // signed: false is only needed if the value range of the parameter = 0 to max (also unsigned), instead of the default signed

/*
 * =========== SETTING RADIO ===========
 * =========== APP.JSON ===========
*/
{
	"id": "SETTING_ID",
	"type": "radio",
	"label": {
		"en": "SHORT_DESCRIPTION"
	},
	"hint": {
		"en": "DESCRIPTION, optional"
	},
	"value": "DEFAULT_VALUE",
	"values": [
		{
			"id": "VALUE_1",
			"label": {
				"en": "VALUE_1_DESCRIPTION"
			}
		},
		{
			"id": "VALUE_2",
			"label": {
				"en": "VALUE_2_DESCRIPTION"
			}
		}
	]
}
// =========== DRIVER.JS ===========
SETTING_ID: {
	index: PARAMETER_NUMBER,
	size: PARAMETER_SIZE,
	signed: false, // signed: false is only needed if the value range of the parameter = 0 to max (also unsigned), instead of the default signed
},

/*
 * =========== SETTING CHECKBOX ===========
 * =========== APP.JSON ===========
*/
{
	"id": "SETTING_ID",
	"type": "checkbox",
	"label": {
		"en": "SHORT_DESCRIPTION"
	},
	"hint": {
		"en": "DESCRIPTION, optional"
	},
	"value": DEFAULT_VALUE // true or false
}
// =========== DRIVER.JS ===========
SETTING_ID: {
	index: PARAMETER_NUMBER,
	size: PARAMETER_SIZE,
	parser: newValue => new Buffer([(newValue) ? 0, 1]), // Parser is only needed if default value true = unchecked
	signed: false, // signed: false is only needed if the value range of the parameter = 0 to max (also unsigned), instead of the default signed
},

/*
 * =========== SETTING NUMBER ===========
 * =========== APP.JSON ===========
*/
{
	"id": "SETTING_ID",
	"type": "number",
	"label": {
		"en": "SHORT_DESCRIPTION"
	},
	"hint": {
		"en": "DESCRIPTION, optional"
	},
	"value": DEFAULT_VALUE,
	"attr": {
		"min": MINIMAL_NUMBER, // recommended but optional
		"max": MAXIMUM_NUMBER, // recommended but optional
		"step": STEP_SIZE // optional
	}
}
// =========== DRIVER.JS ===========
SETTING_ID: {
	index: PARAMETER_NUMBER,
	size: PARAMETER_SIZE,
	parser: newValue => new Buffer([newValue * MULTIPLIER]), // Parser is only needed if you need a multiplier to increase user friendlyness
	signed: false, // signed: false is only needed if the value range of the parameter = 0 to max (also unsigned), instead of the default signed
},

/*
 * =========== MULTIPLE SETTINGS, 1 PARAMETER ===========
 * Sometimes to increase user friendlyness you want to devide a parameter into several settings.
 * This is a reference how you could handle that in the DRIVER.JS
 */
 SETTING_ID_1: {
 	index: PARAMETER_NUMBER,
 	size: PARAMETER_SIZE,
 	parser: (newValue, newSetings) => {
		value = newValue + newSettings.SETTING_ID_2;

		let buffer = new Buffer(PARAMETER_SIZE);
		return buffer.writeUIntBE(value, 0, PARAMETER_SIZE);
	},
 },
 SETTING_ID_2: {
 	index: PARAMETER_NUMBER,
 	size: PARAMETER_SIZE,
 	parser: (newValue, newSetings) => {
		value = newSettings.SETTING_ID_1 + newValue;

		let buffer = new Buffer(PARAMETER_SIZE);
		return buffer.writeUIntBE(value, 0, PARAMETER_SIZE);
	},
 },

 /*
  * =========== SETTING A PARAMETER WITH FLOW CARD ===========
  * This is not recommended to do for battery devices
  * since parameters are only set when they are woken up
  */
 Homey.manager('flow').on('action.FLOW_ID', (callback, args) => {
	const node = module.exports.nodes[args.device['token']];

	// Let the flow card fail when no device is found
	if (!node) return callback('device_unavailable', false);

	if (args.hasOwnProperty("FLOW_VALUE_TO_BE_USE") && typeof node.instance.CommandClass.COMMAND_CLASS_CONFIGURATION !== 'undefined') {
		//Send parameter values to module
		node.instance.CommandClass['COMMAND_CLASS_CONFIGURATION'].CONFIGURATION_SET({
			"Parameter Number": PARAMETER_NUMBER,
			"Level": {
				"Size": PARAMETER_SIZE,
				"Default": false
			},
			'Configuration Value': new Buffer([PARAMETER_VALUE]) // PARAMETER VALUE must be a DECIMAL or HEXADECIMAL value
		}, (err, result) => {
			// If error, stop flow card
			if (err) return callback(err, false);
			// If properly transmitted, change the setting and finish flow card
			if (result === "TRANSMIT_COMPLETE_OK") {
				// If this parameter is not a setting(s) remove the setSetting function or use:
				// `if (result === "TRANSMIT_COMPLETE_OK") return callback(null, true);`
				// Set the device setting to this flow value
				module.exports.setSettings(node.device_data, {
					"SETTING_ID": SETTING_VALUE, // make sure the value type is the same as the setting type (IE: boolean)
				});
				return callback(null, true);
			}
			// if not completed with acknowledgment, let flow card fail
			return callback(result, false);
		});
	}
	return callback('unknown_error', false);
});
