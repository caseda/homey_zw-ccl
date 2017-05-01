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
 * =========== APP.JSON  ===========
 * You can also separate out the activation spots into separate flow cards.
 * just remove the activation dropdown here and the activation data & checks in the driver.js
 *
 * TRIGGER_ID = Unique id (for the app) of the flow card
 * DRIVER_ID = The unique id of the driver
 * ACTIVATION_ID = The supported activation spot, this is optional if there is only 1 activation spot
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
 * =========== DRIVER.JS ===========
 * You can also separate out the activation spots into separate flow cards.
 * just remove the activation data & checks here and the activation dropdown in the app.json
 *
 * TRIGGER_ID = Unique id (for the app) of the flow card
*/
module.exports.on('initNode', (token) => {
	const node = module.exports.nodes[token];

  if (node && typeof node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE !== 'undefined') {
		node.instance.CommandClass.COMMAND_CLASS_CENTRAL_SCENE.on('report', (command, report) => {
			if (command &&
        command.name === 'CENTRAL_SCENE_NOTIFICATION' &&
        report &&
				report.hasOwnProperty('Scene Number') &&
				report.hasOwnProperty('Properties1') &&
				report.Properties1.hasOwnProperty('Key Attributes')) {
  				const data = {
  					activation: report['Scene Number'].toString(), // This will be the id of the activation spot, it can be optional when there is only 1 activation spot or separate flow cards
  					attribute: report.Properties1['Key Attributes'] // This will be the attribute of the press (amount/hold/release)
  				}
          Homey.manager('flow').triggerDevice('TRIGGER_ID', null, data, node.device_data);
				}
			}
		});
	}
});
// This part will make sure the send data is the same as te data selected in the flow card(s)
Homey.manager('flow').on('trigger.TRIGGER_ID', (callback, args, state) => {
	if(args &&
    state &&
    args.hasOwnProperty('activation') && // Optional for 1 activation spot or separate flow cards
		args.hasOwnProperty('attribute') &&
		state.hasOwnProperty('activation') && // Optional for 1 activation spot or separate flow cards
		state.hasOwnProperty('attribute') &&
		args.activation === state.activation && // Optional for 1 activation spot or separate flow cards
		args.attribute === state.attribute) {
		return callback(null, true);
	}
	else return callback('unknown_error', false);
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
