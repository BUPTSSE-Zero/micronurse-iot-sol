//
// Created by shengyun-zhou on 17-4-23.
//

#include "DS18B20NodeObject.h"
#define NODE_CLASS_NAME "DS18B20"
using namespace v8;
using namespace node;

DS18B20NodeObject::DS18B20NodeObject() {
    sensor_ = new DS18B20;
}

DS18B20NodeObject::~DS18B20NodeObject() {
    delete sensor_;
}

Persistent<Function> DS18B20NodeObject::constructor;

void DS18B20NodeObject::Init(Local<Object> exports) {
    Isolate* isolate = exports->GetIsolate();

    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, NODE_CLASS_NAME));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "read_temperature", ReadTemperature);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, NODE_CLASS_NAME),
                 tpl->GetFunction());
}

void DS18B20NodeObject::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.IsConstructCall()) {
        // Invoked as constructor: `new Object(...)`
        DS18B20NodeObject* obj = new DS18B20NodeObject;
        obj->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        // Invoked as plain function `Object(...)`, turn into construct call.
        const int argc = 1;
        Local<Value> argv[argc] = { args[0] };
        Local<Context> context = isolate->GetCurrentContext();
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Object> result =
                cons->NewInstance(context, argc, argv).ToLocalChecked();
        args.GetReturnValue().Set(result);
    }
}

void DS18B20NodeObject::ReadTemperature(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    DS18B20NodeObject* obj = ObjectWrap::Unwrap<DS18B20NodeObject>(args.Holder());
    float temperature;
    int result = obj->sensor_->readTemperature(temperature);

    Local<Object> result_object = Object::New(isolate);
    result_object->Set(String::NewFromUtf8(isolate, "result"), Integer::New(isolate, result));
    result_object->Set(String::NewFromUtf8(isolate, "temperature"), Number::New(isolate, temperature));
    args.GetReturnValue().Set(result_object);
}

NODE_MODULE(ds18b20_sensor, DS18B20NodeObject::Init);
