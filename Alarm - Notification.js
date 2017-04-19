/*
 * Homey CommandClass
 * Alarm / Notification
 * Versions 1, 2 / 3 - 8
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
 * You are allowed to combine the alarm and notification reports
 * just take into consideration that not 1 alarm type can cange the value of the other back
 * code example for this is at the bottom of all codes
*/

/*
 * =========== GENERAL CODE: ALARM VERSION 1 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPEALARM#] = a supported sensor type, displayed in device's manual
 * [#ALARMLEVEL#] = the reported alarm level, displayed in device's manual/report
 *
 * The Alarm Command Class (Version 1) allows applications to report alarm or service conditions.
 * Since these values are not standardized across devices the alarms/service values
 * are described in the user manual (or an installer manual).
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_ALARM',
	command_get: 'ALARM_GET',
	command_get_parser: () => ({
		'Alarm Type': '[#TYPEALARM#]'
	}),
	command_report: 'ALARM_REPORT',
	command_report_parser: report => {
		if (report['Alarm Type'] === '[#TYPEALARM#]') return report['Alarm Level'] === '[#ALARMLEVEL#]';
		return null;
	}
}
// =========== ALTERNATE GET PARSER, ALARM VERSION 1 ===========
// This is purely for when the device does NOT respond to (all) get functions of alarm and notification
command_get_parser: node => {
	if (node && node.state.[#CAPABILITY#] === 'undefined') {
		node.state.[#CAPABILITY#] = false;
	}
	return {
		'Alarm Type': '[#TYPEALARM#]'
	};
},

/*
 * =========== GENERAL CODE: ALARM VERSION 2 (NOTIFICATION VERSION 3 - 8) ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPEALARM-1#] = a supported sensor type, displayed in device's manual
 * Type = Value of 'V1 Alarm Type' found in SUPPORTED_GET (see code below)
 * [#TYPEALARM-2#] = a supported sensor type, displayed below
 * Type = The number (GET/SET) or name (GET/SET/REPORT), displayed below (Optional in GET)
 * [#ALARMEVENT#] = the reported alarm event, displayed below
 * Event = The number, displayed below
 * !! Report parser might need to use the Name of the Alarm Event !!
 * !! You can see the value by reading out the report (Homey.log(report)) !!
 *
 * This will display the first notifications in line on the specified alarm type.
 *
 * The SET will select if the supported alarm is active or not
 * You can remove the Set and it's Parser if not wanted to be turned off
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_ALARM',
	command_get: 'ALARM_GET',
	command_get_parser: () => ({
		'Alarm Type': '[#TYPEALARM-1#]'
		'Z-Wave Alarm Type': [#TYPEALARM-2#]
	}),
	command_set: 'ALARM_SET',
	command_set_parser: value => ({
		'Z-Wave Alarm Type': [#TYPEALARM-2#],
		'Z-Wave Alarm State': if (value) ? 255 : 0
	}),
	command_report: 'ALARM_REPORT',
	command_report_parser: report => {
		if (report['Z-Wave Alarm Type'] === '[#TYPEALARM-2#]') return report['Z-Wave Alarm Event'] === [#ALARMEVENT#];
		return null;
	}
}
// =========== ALTERNATE GET PARSER, ALARM VERSION 2 ===========
// This is purely for when the device does NOT respond to (all) get functions of alarm and notification
command_get_parser: node => {
	if (node && node.state.[#CAPABILITY#] === 'undefined') {
		node.state.[#CAPABILITY#] = false;
	}
	return {
		'Alarm Type': '[#TYPEALARM-1#]'
		'Z-Wave Alarm Type': [#TYPEALARM-2#],
	};
},



/*
 * =========== GENERAL CODE: SPECIFIC, NOTIFICATION VERSION 3 - 8 ===========
 * [#CAPABILITY#] = the used capability
 * [#ALARMNUMBER#] = a supported alarm type (the number)
 * Type = Value of 'V1 Alarm Type' found in SUPPORTED_GET (see code below)
 * [#NOTIFICATION#] = a supported notification type (the full name)
 * Type = The number (GET) or name (GET/REPORT), displayed below
 * [#ALARMEVENT#] = the reported alarm event(s)
 * Event = The number, displayed below
 *
 * the GET will get a specific Notification type and it's event.
 * GET is an Optional trigger
 * Try not to ask for 2 notification at the same time,
 * the second notification GET will most likely result in a time-out.
 * !! With a battery device only possible if it is awake. !!
 *
 * Event parameter values will get into:
 * report['Event Parameter'][#]
 * where # = given below with [#]
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_NOTIFICATION',
	command_get: 'NOTIFICATION_GET',
	command_get_parser: () => ({
		'V1 Alarm Type': [#ALARMNUMBER#],
		'Notification Type': '[#NOTIFICATION#]',
		Event: [#ALARMEVENT#]
	}),
	command_report: 'NOTIFICATION_REPORT',
	command_report_parser: report => {
		if (report && report['Notification Type'] === '[#NOTIFICATION#]') {
			// If there are multiple events you want to say "true" to
			if (report['Event'] === [#ALARMEVENT-1#] || report['Event'] === [#ALARMEVENT-2#]) return true;
			return false;
			// If there is only 1 event you want to say "true" to
			return report['Event'] === [#ALARMEVENT#];
		}
		return null;
	}
}
// =========== ALTERNATE GET PARSER, NOTIFICATION VERSION 3 - 8 ===========
// This is purely for when the device does NOT respond to (all) get functions of alarm and notification
command_get_parser: node => {
	if (node && node.state.[#CAPABILITY#] === 'undefined') {
		node.state.[#CAPABILITY#] = false;
	}
	return {
		'V1 Alarm Type': [#ALARMNUMBER#],
		'Notification Type': '[#NOTIFICATION#]',
		Event: [#ALARMEVENT#]
	}
},

/*
 * =========== EXAMPLE CODE: COMBINATION ALARM AND NOTIFICATION ===========
 * This is just a global example code where you can put the above shown codes in
 * Try to keep the amount of GET to a minimum, so only with alarm OR notification
 */
[#CAPABILITY#]: [
	{
		command_class: 'COMMAND_CLASS_ALARM',
		command_get: 'ALARM_GET',
		command_get_parser: () => ({
			...
		}),
		command_report: 'ALARM_REPORT',
		command_report_parser: report => {
			...
		}
	},
	{
		command_class: 'COMMAND_CLASS_NOTIFICATION',
		command_report: 'NOTIFICATION_REPORT',
		command_report_parser: report => {
			...
		}
	}
]

/*
 * =========== GENERAL CODE: GET SUPPORTED ALARM TYPES FROM SENSOR ===========
 * This will give you all alarm types that are supported by the device in CLI Debug
 * !! ONLY SUPPORTED FROM VERSION 2 AND UP !!
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_ALARM',
	command_get: 'ALARM_TYPE_SUPPORTED_GET',
	command_report: 'ALARM_TYPE_SUPPORTED_REPORT'
}

/*
 * SUPPORTED ALARM/NOTIFICATION TYPES (*) AND EVENTS:
 * EVENT FROM VERSION 2: **------
 * EVENT FROM VERSION 3: ***-----
 * EVENT FROM VERSION 4: ****----
 * EVENT FROM VERSION 5: *****---
 * EVENT FROM VERSION 6: ******--
 * EVENT FROM VERSION 7: *******-
 * EVENT FROM VERSION 8: ********
 ===============================================================================
 * ALARM: 1 - Smoke Alarm
 * NOTIFICATION: Smoke

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Smoke detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Smoke detected, Unknown Location
 ***----- 3 - Smoke Alarm Test
 *****--- 4 - Replacement Required, Unspecified reason
 ******** 5 - Replacement Required, End-of-life
 ******** 6 - Alarm Silenced
 ******** 7 - Maintenance required, Planned periodic inspection
 ******** 8 - Maintenance required, Dust in device
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 2 - CO Alarm
 * NOTIFICATION: CO

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Carbon monoxide detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Carbon monoxide detected, Unknown Location
 *****--- 3 - Carbon monoxide Test
	EVENT PARAMETERS:
	[0]: 1 = Test OK
	[0]: 2 = Test Failed

 *****--- 4 - Replacement Required, Unspecified reason
 ******** 5 - Replacement Required, End-of-life
 ******** 6 - Alarm Silenced
 ******** 7 - Maintenance required, Planned periodic inspection
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 3 - CO2 Alarm
 * NOTIFICATION: CO2

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Carbon dioxide detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Carbon dioxide detected, Unknown Location
 *****--- 3 - Carbon dioxide Test
	EVENT PARAMETERS:
	[0]: 1 = Test OK
	[0]: 2 = Test Failed

 *****--- 4 - Replacement Required, Unspecified reason
 ******** 5 - Replacement Required, End-of-life
 ******** 6 - Alarm Silenced
 ******** 7 - Maintenance required, Planned periodic inspection
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 4 - Heat Alarm
 * NOTIFICATION: Heat

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Overheat detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Overheat detected, Unknown Location
 **------ 3 - Rapid Temperature Rise
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 4 - Rapid Temperature Rise, Unknown Location
 **------ 5 - Under heat detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 6 - Under heat detected, Unknown Location
 ******** 7 - Heat Alarm Test
 ******** 8 - Replacement Required, End-of-life
 ******** 9 - Alarm Silenced
 ******** 10 - Maintenance required, Dust in device
 ******** 11 - Maintenance required, Planned periodic inspection
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 5 - Water Alarm
 * NOTIFICATION: Water

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Water Leak detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Water Leak detected, Unknown Location
 **------ 3 - Water Level Dropped
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 4 - Water Level Dropped, Unknown Location
 ****---- 5 - Replace Water Filter
 *******- 6 - Water Flow Alarm
	EVENT PARAMETERS:
	[0]: 1 = No Data
	[0]: 2 = Under low Treshold
	[0]: 3 = Above high Treshold
	[0]: 4 = Max

 *******_ 7 - Water Pressure Alarm
	EVENT PARAMETERS:
	[0]: 1 = No Data
	[0]: 2 = Under low Treshold
	[0]: 3 = Above high Treshold
	[0]: 4 = Max

 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 6 - Access Control Alarm
 * NOTIFICATION: Acces Control

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Manual Lock Operation
 **------ 2 - Manual Unlock Operation
 **------ 3 - RF Lock Operation
 **------ 4 - RF Unlock Operation
 **------ 5 - Keypad Lock Operation
	EVENT PARAMETERS:
	[0]: # = User Code

 **------ 6 - Keypad Unlock Operation
	EVENT PARAMETERS:
	[0]: # = User Code

 ***----- 7 - Manual Not Fully Locked Operation
 ***----- 8 - RF Not Fully Locked Operation
 ***----- 9 - Auto Lock Locked Operation
 ***----- 10 - Auto Lock Not Fully Operation
 ***----- 11 - Lock Jammed
 ***----- 12 - All user codes deleted
 ***----- 13 - Single user code deleted
 ***----- 14 - New user code added
 ***----- 15 - New user code not added due to duplicate code
 ***----- 16 - Keypad temporary disabled
 ***----- 17 - Keypad busy
 ***----- 18 - New Program code Entered - Unique code for lock configuration
 ***----- 19 - Manually Enter user Access code exceeds code limit
 ***----- 20 - Unlock By RF with invalid user code
 ***----- 21 - Locked by RF with invalid user codes
 ***----- 22 - Window/Door is open
 ***----- 23 - Window/Door is closed
 ****---- 64 - Barrier performing Initialization process
	EVENT PARAMETERS:
	[0]: 255 = Performing Process
	[0]: 0 = Process Complete

 ****---- 65 - Barrier operation (Open / Close) force has been exceeded.
 ****---- 66 - Barrier motor has exceeded manufacturer’s operational time limit
	EVENT PARAMETERS:
	[0]: 0 - 127 = 0 sec - 127 sec
	[0]: 128 - 255 = 1 min - 127 min

 ****---- 67 - Barrier operation has exceeded physical mechanical limits
 ****---- 68 - Barrier unable to perform requested operation due to UL requirements.
 ****---- 69 - Barrier Unattended operation has been disabled per UL requirements.
 ****---- 70 - Barrier failed to perform Requested operation, device malfunction
 ****---- 71 - Barrier Vacation Mode
	EVENT PARAMETERS:
	[0]: 0 = Disabled
	[0]: 255 = Enabled

 ****---- 72 - Barrier Safety Beam Obstacle
	EVENT PARAMETERS:
	[0]: 0 = Sensor not defined
	[0]: 1 - 255 = Sensor ID

 ****---- 74 - Barrier Sensor Low Battery Warning
	EVENT PARAMETERS:
	[0]: 0 = Sensor not defined
	[0]: 1 - 255 = Sensor ID

 ****---- 75 - Barrier detected short in Wall Station wires
 ****---- 76 - Barrier associated with non-Z-wave remote control.
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 7 - Burglar Alarm
 * NOTIFICATION: Home Security

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Intrusion
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 2 - Intrusion, Unknown Location
 **------ 3 - Tampering, product covering removed
 **------ 4 - Tampering, Invalid Code
 **------ 5 - Glass Breakage
	EVENT PARAMETERS:
	[0]: # = Node Location

 **------ 6 - Glass Breakage, Unknown Location
 **------ 7 - Motion Detection
	EVENT PARAMETERS:
	[0]: # = Node Location

 ****---- 8 - Motion Detection, Unknown Location
 ******-- 9 - Tampering, Product Moved
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 8 - Power Management Alarm
 * NOTIFICATION: Power Management

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Power has been applied
 **------ 2 - AC mains disconnected
 **------ 3 - AC mains re-connected
 **------ 4 - Surge Detection
 **------ 5 - Voltage Drop/Drift
 ***----- 6 - Over-current detected
 ***----- 7 - Over-voltage detected
 ***----- 8 - Over-load detected
 ***----- 9 - Load error
 ***----- 10 - Replace battery soon
 ***----- 11 - Replace battery now
 ****---- 12 - Battery is charging
 ****---- 13 - Battery is fully charged
 ****---- 14 - Charge battery soon
 ****---- 15 - Charge battery now!
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 9 - System Alarm
 * NOTIFICATION: System

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - System hardware failure
 **------ 2 - System software failure
 ***----- 3 - System hardware failure with manufacturer proprietary failure code
 ***----- 4 - System software failure with manufacturer proprietary failure code
 *****--- 5 - Heartbeat
 *****--- 6 - Tampering, Product covering removed
 *******- 7 - Emergency Shutoff
 **------ 254 - Unknown Event

 ===============================================================================
 ALARM: 10 - Emergency Alarm
 NOTIFICATION Emergency Alarm

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Contact Police
 **------ 2 - Contact Fire Service
 **------ 3 - Contact Medical Service
 **------ 254 - Unknown Event

 ===============================================================================
 * ALARM: 11 - Alarm Clock
 * NOTIFICATION Clock

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 **------ 1 - Wake Up
 ***----- 2 - Timer Ended
 ****---- 3 - Time remaining
	EVENT PARAMETERS:
	[1]: # = hour(s)
	[2]: # = minute(s)
	[3]: # = second(s)

 ===============================================================================
 * 12 - Appliance

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 ****---- 1 - Program started
 ****---- 2 - Program in progress
 ****---- 3 - Program completed
 ****---- 4 - Replace main filter
 ****---- 5 - Failure to set target temperature
 ****---- 6 - Supplying water
 ****---- 7 - Water supply failure
 ****---- 8 - Boiling
 ****---- 9 - Boiling failure
 ****---- 10 - Washing
 ****---- 11 - Washing failure
 ****---- 12 - Rinsing
 ****---- 13 - Rinsing failure
 ****---- 14 - Draining
 ****---- 15 - Draining failure
 ****---- 16 - Spinning
 ****---- 17 - Spinning failure
 ****---- 18 - Drying
 ****---- 19 - Drying failure
 ****---- 20 - Fan failure
 ****---- 21 - Compressor failure
 ****---- 254 - Unknown Event

 ===============================================================================
 * 13 - Home Health

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 ****---- 1 - Leaving Bed
 ****---- 2 - Sitting on bed
 ****---- 3 - Lying on bed
 ****---- 4 - Posture changed
 ****---- 5 - Sitting on edge of bed
 ****---- 6 - Volatile Organic Compound level
	EVENT PARAMETERS:
	[0]: 1 = Clean
	[0]: 2 = Slightly polluted
	[0]: 3 = Moderately polluted
	[0]: 4 = Highly polluted

 ****---- 254 - Unknown Event

 ===============================================================================
 * 14 - Siren

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 ******-- 1 - Siren Active
 ******-- 254 - Unknown Event

 ===============================================================================
 * 15 - Water Valve

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 *******- 1 - Valve Operation
	EVENT PARAMETERS:
	[0]: 0 = Off
	[0]: 1 = On

 *******- 2 - Master Valve Operation
	EVENT PARAMETERS:
	[0]: 0 = Off
	[0]: 1 = On

 *******- 3 - Valve Short Circuit
 *******- 4 - Master Valve Short Circuit
 *******- 5 - Valve Current Alarm
	EVENT PARAMETERS:
	[0]: 1 = No data
	[0]: 2 = Below low threshold
	[0]: 3 = Above high threshold
	[0]: 4 = Max

 *******- 6 - Master Valve Current Alarm
	EVENT PARAMETERS:
	[0]: 1 = No data
	[0]: 2 = Below low threshold
	[0]: 3 = Above high threshold
	[0]: 4 = Max

 *******- 254 - Unknown Event

 ===============================================================================
 * 16 - Weather Alarm

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 *******- 1 - Rain Alarm
 *******- 2 - Moisture Alarm
 *******- 254 - Unknown Event

 ===============================================================================
 * 17 - Irrigation

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 *******- 1 - Schedule Started
	EVENT PARAMETERS:
	[0]: # = Scedule ID

 *******- 2 - Schedule Finished
	EVENT PARAMETERS:
	[0]: # = Scedule ID

 *******- 3 - Valve Table Run Started
	EVENT PARAMETERS:
	[0]: # = Valve Table ID

 *******- 4 - Valve Table Run Finished
	EVENT PARAMETERS:
	[0]: # = Valve Table ID

 *******- 5 - Device is not Configured
 *******- 254 - Unknown Event

 ===============================================================================
 * 18 - Gas Alarm

 ****---- 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 *******- 1 - Combustible Gas detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 *******- 2 - Combustible Gas detected, Unknown Location
 *******- 3 - Toxic Gas detected
	EVENT PARAMETERS:
	[0]: # = Node Location

 *******- 4 - Toxic Gas detected, Unknown Location
 *******- 5 - Gas Alarm Test
 *******- 6 - Replacement Required, Unspecified reason
 *******- 254 - Unknown Event

 ===============================================================================
 * 19 - Pest control

 ******** 0 - Event inactive
	EVENT PARAMETERS:
	[0]: # = Event that got inactive/cleared

 ******** 1 - Trap armed
	EVENT PARAMETERS:
	[0]: # = Node Location Report

	******** 2 - Trap armed, unknown location
	******** 3 - Trap re-arm required
	EVENT PARAMETERS:
	[0]: # = Node Location Report

	******** 4 - Trap re-arm required, unknown location
	******** 5 - Pest detected
	EVENT PARAMETERS:
	[0]: # = Node Location Report

	******** 6 - Pest detected, unknown location
	******** 7 - Pest exterminated
	EVENT PARAMETERS:
	[0]: # = Node Location Report

	******** 8 - Pest exterminated, unknown location
	*******- 254 - Unknown Event
*/
