/*
 * Homey CommandClass
 * Central Scene
 * Version 1 - 3
 * Flow trigger only
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * ============================================ APP.JSON SEPARATE ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * DRIVER_ID = The unique id of the driver
*/
{
	"id": "TRIGGER_ID",
	"title": {
		"en": "FLOW_CARD_TITLE"
	},
	"hint": {
		"en": "FLOW_CARD_HINT" // OPTIONAL
	},
	"args": [
		{
			"name": "device",
			"type": "device",
			"filter": "driver_id=DRIVER_ID"
		}
	]
}

/*
 * ============================================ DRIVER.JS SEPARATE ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * ACTIVATION_ID = The supported activation spot, this is optional if there is only 1 activation spot
 * ATTRIBUTE = The attribute of the button press, IE: 1x click, hold, release, supported types displayed below
*/
module.exports.on('initNode', (token) => {
	const node = module.exports.nodes[token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE.on('report', (command, report) => {
			if (command &&
				command.name === 'CENTRAL_SCENE_NOTIFICATION' &&
				report &&
				report.hasOwnProperty('Scene Number') && // Optional for 1 activation spot
				report['Scene Number'] === ACTIVATION_ID && // Optional for 1 activation spot
				report.hasOwnProperty('Properties1') &&
				report.Properties1.hasOwnProperty('Key Attributes') &&
				report.Properties1['Key Attributes'] === ATTRIBUTE) {
				Homey.manager('flow').triggerDevice('TRIGGER_ID', null, data, node.device_data);
			}
		});
	}
});

/*
 * ============================================ APP.JSON SINGLE DROPDOWN ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * DRIVER_ID = The unique id of the driver
 * ATTRIBUTE = The attribute of the button press, IE: 1x click, hold, release, supported types displayed below
*/
{
	"id": "TRIGGER_ID",
	"title": {
		"en": "FLOW_CARD_TITLE"
	},
	"hint": {
		"en": "FLOW_CARD_HINT" // OPTIONAL
	},
	"args": [
		{
			"name": "device",
			"type": "device",
			"filter": "driver_id=DRIVER_ID"
		},
		{
			"name": "attribute",
			"type": "dropdown",
			"values": [
				{
					"id": "ATTRIBUTE_1",
					"label": {
						"en": "ATTRIBUTE_1_LABEL"
					}
				},
				{
					"id": "ATTRIBUTE_2",
					"label": {
						"en": "ATTRIBUTE_2_LABEL"
					}
				}
			]
		}
	]
}

/*
 * ============================================ DRIVER.JS SINGLE DROPDOWN ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * ACTIVATION_ID = The supported activation spot, this is optional if there is only 1 activation spot
*/
module.exports.on('initNode', (token) => {
	const node = module.exports.nodes[token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE.on('report', (command, report) => {
			if (command &&
				command.name === 'CENTRAL_SCENE_NOTIFICATION' &&
				report &&
				report.hasOwnProperty('Scene Number') &&  // Optional for 1 activation spot
				report['Scene Number'] === ACTIVATION_ID && // Optional for 1 activation spot
				report.hasOwnProperty('Properties1') &&
				report.Properties1.hasOwnProperty('Key Attributes')) {
				const data = {
					attribute: report.Properties1['Key Attributes'] // This will be the attribute of the press (amount/hold/release)
				}
				Homey.manager('flow').triggerDevice('TRIGGER_ID', null, data, node.device_data);
			}
		});
	}
});
// This part will make sure the send data is the same as te data selected in the flow card(s)
Homey.manager('flow').on('trigger.TRIGGER_ID', (callback, args, state) => {
	if(args &&
		state &&
		args.hasOwnProperty('attribute') &&
		state.hasOwnProperty('attribute') &&
		args.attribute === state.attribute) {
		return callback(null, true);
	} else return callback('unknown_error', false);
});

/*
 * ============================================ APP.JSON COMBINATION DROPDOWN ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * DRIVER_ID = The unique id of the driver
 * ACTIVATION_ID = The supported activation spot
 * ATTRIBUTE = The attribute of the button press, IE: 1x click, hold, release, supported types displayed below
*/
{
	"id": "TRIGGER_ID",
	"title": {
		"en": "FLOW_CARD_TITLE"
	},
	"hint": {
		"en": "FLOW_CARD_HINT" // OPTIONAL
	},
	"args": [
		{
			"name": "device",
			"type": "device",
			"filter": "driver_id=DRIVER_ID"
		},
		{
			"name": "activation",
			"type": "dropdown",
			"values": [
				{
					"id": "ACTIVATION_ID_1",
					"label": {
						"en": "ACTIVATION_ID_1_LABEL"
					}
				},
				{
					"id": "ACTIVATION_ID_2",
					"label": {
						"en": "ACTIVATION_ID_2_LABEL"
					}
				}
			]
		},
		{
			"name": "attribute",
			"type": "dropdown",
			"values": [
				{
					"id": "ATTRIBUTE_1",
					"label": {
						"en": "ATTRIBUTE_1_LABEL"
					}
				},
				{
					"id": "ATTRIBUTE_2",
					"label": {
						"en": "ATTRIBUTE_2_LABEL"
					}
				}
			]
		}
	]
}

/*
 * ============================================ DRIVER.JS COMBINATION DROPDOWN ============================================
 * TRIGGER_ID = Unique id (for the app) of the flow card
*/
module.exports.on('initNode', (token) => {
	const node = module.exports.nodes[token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE.on('report', (command, report) => {
			if (command &&
				command.name === 'CENTRAL_SCENE_NOTIFICATION' &&
				report &&
				report.hasOwnProperty('Scene Number') &&  // Optional for 1 activation spot
				report.hasOwnProperty('Properties1') &&
				report.Properties1.hasOwnProperty('Key Attributes')) {
				const data = {
					activation: report['Scene Number'].toString(), // This will be the id of the activation spot
					attribute: report.Properties1['Key Attributes'] // This will be the attribute of the press (amount/hold/release)
				}
				Homey.manager('flow').triggerDevice('TRIGGER_ID', null, data, node.device_data);
			}
		});
	}
});
// This part will make sure the send data is the same as te data selected in the flow card(s)
Homey.manager('flow').on('trigger.TRIGGER_ID', (callback, args, state) => {
	if(args &&
		state &&
		args.hasOwnProperty('activation') &&
		args.hasOwnProperty('attribute') &&
		state.hasOwnProperty('activation') &&
		state.hasOwnProperty('attribute') &&
		args.activation === state.activation &&
		args.attribute === state.attribute) {
		return callback(null, true);
	} else return callback('unknown_error', false);
});

/*
 * SUPPORTED CENTRAL SCENE ATTRIBUTES:
 * ---------- FROM VERSION 1 ----------
 * Key Pressed 1 time
 * Key Released
 * Key Held Down
 *
 * ---------- FROM VERSION 2----------
 * Key Pressed 2 times
 * Key Pressed 3 times
 * Key Pressed 4 times
 * Key Pressed 5 times
