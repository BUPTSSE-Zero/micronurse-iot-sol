//
// Created by shengyun-zhou on 17-4-22.
//

#include "DHT11NodeObject.h"
#define NODE_CLASS_NAME "DHT11"
using namespace v8;
using namespace node;

Persistent<Function> DHT11NodeObject::constructor;

void DHT11NodeObject::Init(Local<Object> exports) {
    Isolate* isolate = exports->GetIsolate();

    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, NODE_CLASS_NAME));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "read_temperature_humidity", ReadTemperatureHumidity);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, NODE_CLASS_NAME),
                 tpl->GetFunction());
}

void DHT11NodeObject::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.IsConstructCall()) {
        // Invoked as constructor: `new Object(...)`
        DHT11NodeObject* obj = new DHT11NodeObject;
        obj->pin_ = args[0]->IsUndefined() ? 0 : args[0]->Int32Value();
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

void DHT11NodeObject::ReadTemperatureHumidity(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    DHT11NodeObject* obj = ObjectWrap::Unwrap<DHT11NodeObject>(args.Holder());
    float temperature, humidity;
    DHT11 sensor(obj->pin_);
    int result = sensor.ReadTemperatureHumidity(temperature, humidity);

    Local<Object> result_object = Object::New(isolate);
    result_object->Set(String::NewFromUtf8(isolate, "result"), Integer::New(isolate, result));
    result_object->Set(String::NewFromUtf8(isolate, "temperature"), Number::New(isolate, temperature));
    result_object->Set(String::NewFromUtf8(isolate, "humidity"), Number::New(isolate, humidity));
    args.GetReturnValue().Set(result_object);
}

NODE_MODULE(dht11_sensor, DHT11NodeObject::Init);
