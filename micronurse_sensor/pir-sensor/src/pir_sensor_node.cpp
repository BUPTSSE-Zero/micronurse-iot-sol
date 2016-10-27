//
// Created by zhou-shengyun on 16-10-26.
//

#include <node.h>
#include "pir_sensor.h"

using namespace v8;

void read_infrared_signal(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    int sensor_pin = args[0]->Int32Value();
    int pir_result = pir_read(sensor_pin);
    int result = PIR_SUCCESS;
    if(pir_result < 0)
        result = PIR_ERROR;

    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Value> argv[2] = {
            Integer::New(isolate, result),
            Boolean::New(isolate, pir_result),
    };
    callback->Call(isolate->GetCurrentContext()->Global(), 2, argv);
}

void init_module(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "read_infrared_signal", read_infrared_signal);
}

NODE_MODULE(pir_sensor, init_module);
