/*
 * Homey Managment
 * Multi Channel
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * ============================================ BASICS, EXPLANATION ============================================
 * Each individual Multi Channel is called an End Point, or End Node
 * A Multi Channel device also has a part called Main Node.
 * This is always the controller part, where the parameters are being stored.
 * And also is the only device where settings (parameters) are possible.
 *
 * Multi channel is used by devices in general that have either:
 * Multiple Inputs;
 * Multiple Outputs;
 * Multiple Inputs AND Multiple Outputs;
 * Multiple Meters (electric, water, gas).
 *
 * We can handle Multi Channels in 2 ways at the moment.
 * 1: Include them as each end point being a different device (end point devices(s) CAN be removed separately),
 * 2: Include all end points into 1 device.
 * You can't take a middle route though, it's either option 1 OR option 2.
 *
 * There are also 2 ways that manufacturers handle multi channels:
 * 1: Manufacturers that keeps the Main Node and End Point(s) separate.
 * If you switch the main node, ALL end points will switch.
 * 2: Manufacturers that couple the Main Node with End Point 1 together.
 * So when switching the main node, only end point 1 will switch.
 *
 * The first way is the way the Z-Wave Alliance officially designed Z-Wave.
 * But have allowed the second way pretty early on since then only 1 device is needed for the Main Node AND End Point 1.
 * And thus reduce the amount of separate devices.
 *
 *
 * There is a limitation at the moment:
 * The main node needs ALL capabilities used in the end point(s).
 * It can happen that an end point has a capability that is not actually supported/used in the main node.
 * This can be worked around by adding the capability in the main node,
 * and add a custom mobile card and don't add that capability to it, and also add the "opional" tag to that capability in the driver.js.
 * This limitation will be lifted in a future Z-Wave Driver update, but is pretty hard to implement correctly.
 * The other way around is possible, an end point does not need all capabilities that the main node has.
*/

/*
 * ============================================ APP.JSON SEPARATE DEVICES ============================================
 * The driver.js will be the same as a normal driver.
 *
 * DRIVER_ID = The unique driver id of the app
 * MAIN_NODE_CAPABILITY = The capability(s) that the main node uses, and all capabilities of the end points
 * END_POINT_CLASS = The class the end point should be in, may be different from main node's class.
 * END_POINT_CAPABILITY = Capabiities in the end point, does need to be in the main node as well.
 * END_POINT_NAME = The default inclusion name the separate device has.
 */
"id": "DRIVER_ID",
...
"capabilities": [
  "MAIN_NODE_CAPABILITY(S)"
],
"zwave": {
  ...
  "multiChannelNodes": {
  	"1": { // 1 = Optional for manufacturers when they use option 2
  		"class": "END_POINT_CLASS",
  		"capabilities": [
  			"END_POINT_CAPABILITY(S)"
  		],
  		"icon": "/drivers/DRIVER_ID/assets/icon.svg", // icon may be different from the main node
  		"name": {
  			"en": "END_POINT_NAME"
  		}
  	},
    "2": {
  		"class": "END_POINT_CLASS",
  		"capabilities": [
  			"END_POINT_CAPABILITY(S)"
  		],
  		"icon": "/drivers/DRIVER_ID/assets/icon.svg", // ican may be different from the main node
  		"name": {
  			"en": "END_POINT_NAME"
  		}
  	}
  }
}

/*
 * ============================================ DRIVER.JS COMBINED DEVICE ============================================
 * The app.json is the same as a normal driver.
 * If you have 2 of the same capabilities you can add sub capabilities.
 * IE: "measure_power.node1"
 * You will need to create your own mobile card and flow card(s) (for the sub capability) when using sub capabilities.
 *
 * CAPABILITY = the used capability
 * END_POINT = The end point number
 * COMMAND_CLASS = The Command Class used
 * The rest of the capability is the same as a normal driver
 */
 module.exports = new ZwaveDriver(path.basename(__dirname), {
 	capabilities: {
 		CAPABILITY: {
      multiChannelNodeId: END_POINT,
      optional: false, // Set to true, if the capability is not used in the main node, can be removed if false
 			command_class: 'COMMAND_CLASS',
      ...
 		},
  },
};
