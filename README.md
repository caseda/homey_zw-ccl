# Z-Wave and Homey 101
Here will be the most common (and requested) Homey code examples of specific Command Classes.  
To start of your adventure in creating drivers for Homey is:
+ Collecting all data of the device:
  - Manufacturer ID
  - Device Type ID
  - Device ID
  - Parameters (from reliable sources/retrieved from the device itself)  

### app.json
The easiest to begin is using the [Z-Wave Generator](https://developers.athom.com/library/zwave/generator/) Athom created.  
This uses the official Z-Wave alliance's database to create the initial start of the driver in `app.json`.  
Which includes all parameters and device (type) id's.  
This definitely needs to be checked afterwards if everything is right (and add for example the number range).  
And this still misses the capabilities, icons, learnmode and unlearnmode (optional).  
How that is added is shown in the [Developer Library](https://developers.athom.com/library/zwave/).  

You can find the id's in:  
The (unknown) device's settings -> Node Information after inclusion  
Or the (unknown) device's node information when Chrome's Console is open while including  

The entire list of supported Command Classes by the device are in:  
CLI when debug is enabled in the driver.js, and the device has been included.  
Or have Chrome's Console open while including.

**Warning**:  
If you are about to use information from:  
[openHab](http://www.cd-jackson.com/index.php/zwave/zwave-device-database/zwave-device-list) (CD-Jackson);  
[openZwave](https://github.com/OpenZWave/open-zwave);  
[pepper1](http://www.pepper1.net/zwavedb/);  
Take into consideration that _a lot_ of data is/can be incorrect.

### driver.js
Creating the `driver.js` file is all contained into the readme of the [Z-Wave Driver Core](https://github.com/athombv/node-homey-zwavedriver).  
It misses the `command_get_parser:` function in the readme documentation, that some Command Classes need.  
But this can easily be found in the documentation here, or in one of the other Z-Wave apps (see bottom).  

### app.json Config Composer
If you think that the amount of drivers and or flow cards will become a lot.  
Consider using the app.json [Config Composer](https://www.npmjs.com/package/node-homey-config-composer).  
This will make it possible to separate each driver, action, condition and trigger that are in app.json, into it's own .json file.  
That will make finding issues/changes a lot easier.  
And it won't need any extra module in your app, the composer just combines the separate files into the app.json,  
by typing 1 extra line in the CLI: `homeyConfig compose`.  
Example apps that make use of the composer, are the [Fibaro](https://apps.athom.com/app/com.fibaro) and [Aeotec](https://apps.athom.com/app/com.aeotec) app.

### Magic Refiller (Donate)
If you like what I, the Wizard of the (Z-)Waves, have done up until now.  
Then here is a little somethin' if you want to replenish my Magic Powers:  
[![Paypal Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CH7AVGUY9KEQJ)

### Useful Pages/Documents:
- [Developer Library](https://developers.athom.com/library/zwave/)
- [Z-Wave Driver Core](https://github.com/athombv/node-homey-zwavedriver)
- [Config Composer](https://www.npmjs.com/package/node-homey-config-composer)
- [Z-Wave Alliance (Devices)](http://products.z-wavealliance.org/products)
- [Z-Wave Documentation:](http://zwavepublic.com/specifications)
  - pdf: [List of Command Classes](http://zwavepublic.com/sites/default/files/command_class_specs_2017A/sds13548-1_list_of_defined_z-wave_command_classes.pdf)
  - pdf: [Command Class Specification](http://zwavepublic.com/sites/default/files/command_class_specs_2017A/sds13781-1_z-wave_application_command_class_specification.pdf)
  - xml: [Raw Command Class Specification](https://raw.githubusercontent.com/Z-Wave-Me/ExpertUI/master/storage/data/ZWave_cmd_classes.xml)

### Z-Wave Apps [Last Updated 05-06-2017]:
- [Aeotec](https://apps.athom.com/app/com.aeotec) - [Github](https://github.com/athombv/com.aeotec)
- [BeNext](https://apps.athom.com/app/eu.benext) - [Github](https://github.com/athombv/eu.benext)
- [Danalock](https://apps.athom.com/app/com.danalock) - [Github](https://github.com/athombv/com.danalock)
- [Danfoss](https://apps.athom.com/app/com.danfoss) - [Github](https://github.com/athombv/com.danfoss)
- [Devolo](https://apps.athom.com/app/com.devolo) - [Github](https://github.com/athombv/com.devolo)
- [Domitech](https://apps.athom.com/app/nl.timkouters.domitech) - [Github](https://github.com/timkouters/nl.timkouters.domitech)
- [Eurotronic Technology](https://apps.athom.com/app/org.eurotronic) - [Github](https://github.com/caseda/org.eurotronic)
- [Everspring/Eminent](https://apps.athom.com/app/com.everspring) - [Github](https://github.com/ralfvd/com.everspring)
- [Express Controls](https://apps.athom.com/app/com.sharedfunctions.homey-expresscontrols) - [Github](https://github.com/konradwalsh/com.sharedfunctions.homey-expresscontrols)
- [Fibaro](https://apps.athom.com/app/com.fibaro) - [Github](https://github.com/athombv/com.fibaro)
- [Greenwave Systems](https://apps.athom.com/app/com.greenwavesystems) - [Github](https://github.com/athombv/com.greenwavesystems)
- [Hauppauge](https://apps.athom.com/app/com.hauppauge) (Philio Re-brand) - [Github](https://github.com/markaswift/com.hauppauge)
- [Logic Home Control](https://apps.athom.com/app/dk.logichome) - [Github](https://github.com/ktnielsen/dk.logichome)
- [NEO CoolCam](https://apps.athom.com/app/com.neo) - [Github](https://github.com/mruiter/com.neo)
- [NodOn](https://apps.athom.com/app/com.nodon) - [Github](https://github.com/caseda/com.nodon)
- [PoPP EU](https://apps.athom.com/app/com.popp) - [Github](https://github.com/mruiter/com.popp)
- [Philio](https://apps.athom.com/app/com.philio) - [Github](https://github.com/Inversion-NL/com.philio)
- [Qubino](https://apps.athom.com/app/com.qubino) - [Github](https://github.com/athombv/com.qubino)
- [Remotec Technology](https://apps.athom.com/app/hk.com.remotec) - [Github](https://github.com/TedTolboom/hk.com.remotec)
- [Secure/Horstmann](https://apps.athom.com/app/com.horstmann) - [Github](https://github.com/priknr1/com.horstmann)
- [Sensitive](https://apps.athom.com/app/com.sensative) - [Github](https://github.com/Thorarin/com.sensative)
- [Some Z-Wave](https://apps.athom.com/app/com.jilles.zwave) (Rare Brands) - [Github](https://github.com/nattlip/com.jilles.zwave)
- [TKB Home](https://apps.athom.com/app/com.tkbhome) - [Github](https://github.com/caseda/com.tkbhome)
- [Vision Security](https://apps.athom.com/app/com.visionsecurity) - [Github](https://github.com/priknr1/com.visionsecurity)
- [Wintop](https://apps.athom.com/app/com.wintop) - [Github](https://github.com/clandmeter/com.wintop)
- [Yale Lock](https://apps.athom.com/app/com.yalelock) - [Github](https://github.com/timeggleston/com.yalelock)
- [Z-Wave.me](https://apps.athom.com/app/me.zwave) - [Github](https://github.com/IcarusProject/me.zwave)
- [Zipato](https://apps.athom.com/app/nl.aartse.zipato) - [Github](https://github.com/aartse/athom.zipato)
