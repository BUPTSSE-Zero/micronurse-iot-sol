console.log("Micro nurse hub - pulseTransduce +" + CONFIG.name + "kernel");
shared.pulseTransduce.start(function(){
    var value = (int)(Math.random() * 220);
    console.log("Micro nurse hub - pulseTransduce " + CONFIG.name + "]:",value);
    
    var outdata = {
        value:value,
        sensor_type:"pulseTransduce",
        name:CONFIG.name,
        timestamp:Date.parse(new Date())
    }
    
    sendOUT({
        value:outdata.value,
        name:outdata.name,
        timestamp:outdata.timestamp,
        json_data:JSON.stringify(outdata)
    });
},CONFIG.interval);