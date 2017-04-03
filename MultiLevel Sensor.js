/*
 * Homey CommandClass
 * MultiLevel Sensor
 * Versions 1 - 10
 *
 * JUST FOR REFERENCE!
 * Basic knowledge still needed.
*/

/*
 * =========== GENERAL CODE: VERSION 1 - 4 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPE#] = a supported sensor type, displayed below
 * Type = Full name, including the brackets
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
	command_get: 'SENSOR_MULTILEVEL_GET',
	command_report: 'SENSOR_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (report['Sensor Type'] === "[#TYPE#]") return report['Sensor Value (Parsed)'];
		return null;
	}
}

/*
 * =========== GENERAL CODE: VERSION 5 - 10 ===========
 * [#CAPABILITY#] = the used capability
 * [#TYPE#] = a supported sensor type, displayed below
 * Type = Full name, including the brackets
 * [#TYPESCALE#] = a supported sensor type scale, displayed below
 * Scale = Just the Number (0 - 3)
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
	command_get: 'SENSOR_MULTILEVEL_GET',
	command_get_parser: () => ({
		'Sensor Type': '[#TYPE#]',
		Properties1: {
			Scale: [#TYPESCALE#],
		},
	}),
	command_report: 'SENSOR_MULTILEVEL_REPORT',
	command_report_parser: report => {
		if (report['Sensor Type'] === "[#TYPE#]" &&
			report.hasOwnProperty("Level") &&
			report.Level.hasOwnProperty("Scale") &&
			report.Level.Scale === [#TYPESCALE#]) {
			return report['Sensor Value (Parsed)'];
		}
		return null;
	}
}

/*
 * =========== GENERAL CODE: GET SUPPORTED TYPES FROM SENSOR ===========
 * This will give you all sensor types that are supported by the device in CLI Debug
 * !!!!! ONLY SUPPORTED FROM VERSION 5 AND UP !!!!!
 *
 * [#CAPABILITY#] = the used (temporary) capability
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
	command_get: 'SENSOR_MULTILEVEL_SUPPORTED_GET_SENSOR',
	command_report: 'SENSOR_MULTILEVEL_SUPPORTED_SENSOR_REPORT'
}

/*
 * =========== GENERAL CODE: GET SUPPORTED SCALES FROM SENSOR ===========
 * This will give you all Scales that are supported by the "Sensor Type" in CLI Debug
 * !!!!! ONLY SUPPORTED FROM VERSION 5 AND UP !!!!!
 *
 * [#CAPABILITY#] = the used (temporary) capability
 * [#TYPE#] = a supported sensor type, displayed below
 * Type = Full name, including the brackets
*/

[#CAPABILITY#]: {
	command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
	command_get: 'SENSOR_MULTILEVEL_SUPPORTED_GET_SCALE',
	command_get_parser: () => ({
		'Sensor Type': '[#TYPE#]',
	}),
	command_report: 'SENSOR_MULTILEVEL_SUPPORTED_SCALE_REPORT'
}

/*
 * SUPPORTED SENSOR TYPES (*) AND SCALES (**):
 * ---------- FROM VERSION 1 ----------
 * Temperature (version 1)
 ** 0 - Celius (C)
 ** 1 - Fahrenheit (F)

 * General purpose value (version 1)
 ** 0 - Percentage (%)
 ** 1 - Dimensionless

 * Luminance (version 1)
 ** 0 - Percentage (%)
 ** 1 - Lux (lx)

 * ---------- FROM VERSION 2 -----------
 * Power (version 2)
 ** 0 - Watt (W)
 ** 1 - Btu/h

 * Relative humidity (version 2)
 ** 0 - Percentage (%)
 ** 1 - Absolute humidity (g/m³) <= ONLY FROM VERSION 5 AND UP

 * Velocity (version 2)
 ** 0 - Meter/Second (m/s)
 ** 1 - Miles/Hour (Mph)

 * Direction (version 2)
 ** 0 - Degree (0 - 360)

 * Atmospheric pressure (version 2)
 ** 0 - Kilo-Pascal (kPa)
 ** 1 - Inch of Mercury

 * Barometric pressure (version 2)
 ** 0 - Kilo-Pascal (kPa)
 ** 1 - Inch of Mercury

 * Solar radiation (version 2)
 ** 0 - Wattage/square meter (W/m²)

 * Dew point (version 2)
 ** 0 - Celius (C)
 ** 1 - Fahrenheit (F)

 * Rain rate (version 2)
 ** 0 - millimeter/hour (mm/h)
 ** 1 - inch/hour (in/h)

 * Tide level (version 2)
 ** 0 - Meter (M)
 ** 1 - Feet

 * ---------- FROM VERSION 3 -----------
 * Weight (version 3)
 ** 0 - Kilograms (Kg)
 ** 1 - Pounds

 * Voltage (version 3)
 ** 0 - Volt (V)
 ** 1 - milliVolt (mV)

 * Current (version 3)
 ** 0 - Amperage (A)
 ** 1 - milliAmperage (mA)

 * CO2-level (version 3)
 ** 0 - Parts/million (PPM)

 * Air flow (version 3)
 ** 0 - Cubicmeters/hour (M³/h)
 ** 1 - Cubic feet/minute (cfm)

 * Tank capacity (version 3)
 ** 0 - Liters (L)
 ** 1 - Cubicmeters (M³)

 * Distance (version 3)
 ** 0 - Meter (M)
 ** 1 - Centimeter (Cm)
 ** 2 - Feet

 * ---------- FROM VERSION 4 -----------
 * !!!!! DEPRECATED IN VERSION 8 !!!!!
 * Angle Position (version 4)
 ** 0 - Percentage
 ** 1 - Degree relative to Northpole
 ** 2 - Degree relative to Southpole

 * ---------- FROM VERSION 5 ----------
 * Rotation (v5)
 ** 0 - Rotation/minute (rpm)
 ** 1 - Hertz (Hz)

 * Water temperature (v5)
 ** 0 - Celius (C)
 ** 1 - Fahrenheit (F)

 * Soil temperature (v5)
 ** 0 - Celius (C)
 ** 1 - Fahrenheit (F)

 * Seismic intensity (v5)
 ** 0 - Mercalli
 ** 1 - European Macroseismic (ems)
 ** 2 - Liedu
 ** 3 - Shindo

 * Seismic magnitude (v5)
 ** 0 - Local (Ml)
 ** 1 - Moment (Mw)
 ** 2 - Surface wave (Ms)
 ** 3 - Body wave (Mb)

 * Ultraviolet (v5)
 ** 0 - UV Index

 * Electrical resistivity (v5)
 ** 0 - Ohm/meter (Ωm)

 * Electrical conductivity (v5)
 ** 0 - siemens per meter (S·m−1)

 * Loudness (v5)
 ** 0 - Absolute loudness (dB)
 ** 1 - A-weighted decibels (dBA)

 * Moisture (v5)
 ** 0 - Percentage (%)
 ** 1 - Volume water content (m3/m3)
 ** 2 - Impedance (kΩ)
 ** 3 - Water activity (aw)

 * ---------- FROM VERSION 6 -----------
 * Frequency (v6)
 ** 0 - Hertz (Hz) (MUST be used until 4.294967295 GHz)
 ** 1 - kiloHertz (kHz) – (MUST be used after 4.294967295 GHz)

 * Time (v6)
 ** 0 - Seconds (s)

 * Target Temperature (v6)
 ** 0 - Celius (C)
 ** 1 - Fahrenheit (F)

 * ---------- FROM VERSION 7 -----------
 * Particulate Matter 2.5 (v7)
 ** 0 - mole/cubic meter (mol/m³)
 ** 1 - microgram/cubic meter (µg/m³)

 * Formaldehyde CH2O-level (v7)
 ** 0 - mole/cubic meter (mol/m³)

 * Radon Concentration (v7)
 ** 0 - Becquerel/cubic meter (bq/m³)
 ** 1 - picocuries/liter (pCi/L)

 * Methane Density CH4 (v7)
 ** 0 - mole/cubic meter (mol/m³)

 * Volatile Organic Compound (v7)
 ** 0 - mole/cubic meter (mol/m³)
 ** 1 - Parts/meter (Ppm) <= ONLY FROM VERSION 10 AND UP

 * Carbon Monoxide CO-level (v7)
 ** 0 - mole/cubic meter (mol/m³)
 ** 1 - Parts/meter (Ppm) <= ONLY FROM VERSION 10 AND UP

 * Soil Humidity (v7)
 ** 0 - Percentage (%)

 * Soil Reactivity (v7)
 ** 0 - Acidity (pH)

 * Soil Salinity (v7)
 ** 0 - mole/cubic meter (mol/m³)

 * Heart Rate (v7)
 ** 0 - Beats/minute (Bpm)

 * Blood Pressure (v7)
 ** 0 - Systolic (mmHg) (upper #)
 ** 1 - Diastolic (mmHg) (lower #)

 * Muscle Mass (v7)
 ** 0 - Kilograms (Kg)

 * Fat Mass (v7)
 ** 0 - Kilograms (Kg)

 * Bone Mass (v7)
 ** 0 - Kilograms (Kg)

 * Total Body Water, TBW (v7)
 ** 0 - Kilograms (Kg)

 * Basic Metabolic Rate, BMR (v7)
 ** 0 - Joule (J)

 * Body Mass Index, BMI (v7)
 ** 0 - Body mass index (Bmi)

 * ---------- FROM VERSION 8 -----------
 * Acceleration X-axis (v8)
 ** 0 - m/s²
 * Acceleration Y-axis (v8)
 ** 0 - m/s²

 * Acceleration Z-axis (v8)
 ** 0 - m/s²

 * Smoke Density (v8)
 ** 0 - Percentage (%)

 * ----------- FROM VERSION 9 ----------
 * Water Flow (v9)
 ** 0 - Liter/hour (L/h)

 * Water Pressure (v9)
 ** 0 - kilo Pascal (kPa)

 * RF Signal Strength (v9)
 ** 0 - RSSI (%)
 ** 1 - deciBell on 1 meter (dBm)

 * ---------- FROM VERSION 10 ----------
 * Particulate Matter 10 (v10)
 ** 0 - mole/cubic meter (mol/m³)
 ** 1 - microgram/cubic meter (µg/m³)

 * Respiratory Rate (v10)
 ** 0 - Breaths/minute (Bpm)

 * ---------- FROM VERSION 11 ----------
 * Relative Modulation level
 ** 0 - Percentage value (%)

 * Boiler water temperature
 ** 0 - Celcius (C)

 * Domestic Hot Water (DHW) temperature
 ** 0 - Celcius (C)

 * Outside temperature
 ** 0 - Celcius (C)

 * Exhaust temperature
 ** 0 - Celcius (C)
*/
