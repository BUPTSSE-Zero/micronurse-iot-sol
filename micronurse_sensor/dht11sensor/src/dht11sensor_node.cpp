//
// Created by zhou-shengyun on 16-10-23.
//

#include <node.h>
#include "dht11sensor.h"

using namespace v8;

void read_temperature_humidity(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    int sensor_pin = args[0]->Int32Value();
    int temperature = -1, humidity = -1;
    int result = dht11_read(sensor_pin, temperature, humidity);
    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Value> argv[3] = {
        Integer::New(isolate, result),
        Integer::New(isolate, temperature),
        Integer::New(isolate, humidity)
    };
    callback->Call(isolate->GetCurrentContext()->Global(), 3, argv);
}

void init_module(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "read_temperature_humidity", read_temperature_humidity);
}

NODE_MODULE(dht11sensor, init_module);
