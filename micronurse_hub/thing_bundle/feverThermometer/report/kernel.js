console.log("Micro nurse hub - feverThermometer +" + CONFIG.name + " kernel")
shared.feverThermometer.start(function(){
    var value = Math.random() * 6 + 35 
    console.log("[Micro nurse hub - feverThermometer " + CONFIG.name + "]:", value);
    
    var outdata = {
        value:value,
        sensor_type:"feverThermometer",
        name:CONFIG.name,
        timestamp:Date.parse(new Date())
    }
    
    sendOUT({
        value:outdata.value,
        name:outdata.name,
        timestamp:outdata.timestamp,
        json_data:JSON.stringify(outdata)
    });
},CONFUG.interval);