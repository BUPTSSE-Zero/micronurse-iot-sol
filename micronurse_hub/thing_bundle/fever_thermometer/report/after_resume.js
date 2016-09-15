console.log("Micro nurse hub - feverThermometer +" + CONFIG.name + " after resume");
shared.feverThermometer.start(function(){
    var increment = Math.random() * ((Math.random() < 0.5) ? 1 : -1);
    var message_temp;
    shared.feverThermometer.base_value += increment;
    if(shared.feverThermometer.base_value >= 40.0)
        shared.feverThermometer.base_value = 40.0;
    else if(shared.feverThermometer.base_value <= 35.0)
        shared.feverThermometer.base_value = 35.0;
        
    if(shared.feverThermometer.base_value >= 36.0 && shared.feverThermometer.base_value <= 37.3)
        message_temp = "Safe";
    else
        message_temp = "Warning";
    console.log("[Micro nurse hub - feverThermometer " + CONFIG.name + "]:",shared.feverThermometer.base_value);
    
    
    var outdata = {
        value:shared.feverThermometer.base_value.toFixed(1),
        sensor_type:"fever_thermometer",
        name:CONFIG.name,
        timestamp:Date.parse(new Date()),
        message:message_temp
    };
    
    sendOUT({
        value:outdata.value,
        name:outdata.name,
        timestamp:outdata.timestamp,
        message:outdata.message,
        json_data:JSON.stringify(outdata)
    });
},CONFIG.interval);