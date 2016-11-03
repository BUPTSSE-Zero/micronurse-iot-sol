//
// Created by zhou-shengyun on 16-11-2.
//

#include <node.h>
#include "heartrate_sensor.h"

using namespace v8;

void read_heart_rate(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    int sensor_pin = args[0]->Int32Value();
    int result = heartrate_read_heartrate(sensor_pin);
    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Value> argv[] = {
            Integer::New(isolate, result),
    };
    callback->Call(isolate->GetCurrentContext()->Global(), 1, argv);
}

void init_module(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "read_heart_rate", read_heart_rate);
}

NODE_MODULE(heartrate_sensor, init_module);
