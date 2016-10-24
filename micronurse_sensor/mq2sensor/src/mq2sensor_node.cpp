//
// Created by zhou-shengyun on 16-10-24.
//
#include <node.h>
#include "mq2sensor.h"

using namespace v8;

void read_smoke(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    int sensor_pin = args[0]->Int32Value();
    int smoke = mq2_read(sensor_pin);
    int result = MQ2_SUCCESS;
    if(smoke < 0)
        result = MQ2_ERROR;
    Local<Function> callback = Local<Function>::Cast(args[1]);
    Local<Value> argv[2] = {
            Integer::New(isolate, result),
            Integer::New(isolate, smoke),
    };
    callback->Call(isolate->GetCurrentContext()->Global(), 2, argv);
}

void init_module(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "read_smoke", read_smoke);
}

NODE_MODULE(dht11sensor, init_module);
