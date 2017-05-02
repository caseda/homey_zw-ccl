/*
 * Homey CommandClass
 * Scene Actvation
 * Version 1
 * Flow trigger only
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== APP.JSON SEPARATE ===========
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
 * =========== DRIVER.JS SEPARATE ===========
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * SCENE_ID = A supported id the device sends when sending a scene activation command, all supported id's should be in the manual of the device
*/
module.exports.on('initNode', token => {
	const node = module.exports.nodes[token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION.on('report', (command, report) => {
			if (command && command.name === 'SCENE_ACTIVATION_SET' && report && report.hasOwnProperty('Scene ID') && report['Scene ID'] === SCENE_ID) {
				Homey.manager('flow').triggerDevice('TRIGGER_ID', null, null, node.device_data);
			}
		});
	}
});

/*
 * =========== APP.JSON DROPDOWN ===========
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * DRIVER_ID = The unique id of the driver
 * SCENE_ID = The supported id's the device sends when sending a scene activation command, all supported id's should be in the manual of the device
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
			"name": "scene",
			"type": "dropdown",
			"values": [
				{
					"id": "SCENE_ID_1",
					"label": {
						"en": "SCENE_ID_1_LABEL"
					}
				},
				{
					"id": "SCENE_ID_2",
					"label": {
						"en": "SCENE_ID_2_LABEL"
					}
				}
			]
		}
	]
}

/*
 * =========== DRIVER.JS DROPDOWN ===========
 * TRIGGER_ID = Unique id (for the app) of the flow card
*/
module.exports.on('initNode', token => {
	const node = module.exports.nodes[token];

	if (node && typeof node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_SCENE_ACTIVATION.on('report', (command, report) => {
			if (command && command.name === 'SCENE_ACTIVATION_SET' && report && report.hasOwnProperty('Scene ID')) {
				const data = {
					scene: report['Scene ID'].toString(), // This will be the SCENE_ID (converted to string) that the device sends
				};
				Homey.manager('flow').triggerDevice('TRIGGER_ID', null, data, node.device_data);
			}
		});
	}
});
// This part will make sure the send ID is the same as te ID selected in the flow card(s)
Homey.manager('flow').on('trigger.TRIGGER_ID', (callback, args, state) => {
	if (state && args && state.scene === args.scene) return callback(null, true);
	else return callback(null, false);
});
