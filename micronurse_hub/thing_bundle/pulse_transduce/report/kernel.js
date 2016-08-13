console.log("Micro nurse hub - pulseTransduce +" + CONFIG.name + "kernel");
shared.pulseTransduce.start(function(){
    var increment = Math.floor(Math.random() * 5) * ((Math.random() < 0.5) ? 1 : -1);
    var message_temp;
    shared.pulseTransduce.base_value += increment;
    if(shared.pulseTransduce.base_value > 180)
        shared.pulseTransduce.base_value = 180
    else if(shared.pulseTransduce.base_value < 0)
        shared.pulseTransduce.base_value = 0
        
    if(shared.pulseTransduce.base_value >= 50 && shared.pulseTransduce.base_value <= 120)
        message_temp = "Safe";
    else
        message_temp = "Warning";
    console.log("Micro nurse hub - pulseTransducer " + CONFIG.name + "]:",shared.pulseTransduce.base_value);
    
    var outdata = {
        value:shared.pulseTransduce.base_value,
        sensor_type:"pulse_transducer",
        name:CONFIG.name,
        message:message_temp,
        timestamp:Date.parse(new Date())
    }
    
    sendOUT({
        value:outdata.value,
        name:outdata.name,
        message:outdata.message,
        timestamp:outdata.timestamp,
        json_data:JSON.stringify(outdata)
    });
},CONFIG.interval);