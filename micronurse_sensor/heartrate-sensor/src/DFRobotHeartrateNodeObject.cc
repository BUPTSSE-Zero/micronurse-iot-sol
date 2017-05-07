//
// Created by shengyun-zhou on 17-5-2.
//

#include "DFRobotHeartrateNodeObject.h"
#define NODE_CLASS_NAME "DFRobotHeartrate"
using namespace v8;
using namespace node;

Persistent<Function> DFRobotHeartrateNodeObject::constructor;

void DFRobotHeartrateNodeObject::Init(v8::Local<v8::Object> exports) {
    Isolate* isolate = exports->GetIsolate();

    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, NODE_CLASS_NAME));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "read_heartrate", ReadHeartrate);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, NODE_CLASS_NAME),
                 tpl->GetFunction());
}

void DFRobotHeartrateNodeObject::New(const v8::FunctionCallbackInfo<v8::Value> &args) {
    Isolate* isolate = args.GetIsolate();

    if (args.IsConstructCall()) {
        // Invoked as constructor: `new Object(...)`
        int pin = args[0]->IsUndefined() ? 0 : args[0]->Int32Value();
        DFRobotHeartrateNodeObject* obj = new DFRobotHeartrateNodeObject(pin);
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

DFRobotHeartrateNodeObject::DFRobotHeartrateNodeObject(int pin) {
    sensor_ = new DFRobotHeartrate(pin);
}

DFRobotHeartrateNodeObject::~DFRobotHeartrateNodeObject() {
    delete sensor_;
}

void DFRobotHeartrateNodeObject::ReadHeartrate(const v8::FunctionCallbackInfo<v8::Value> &args) {
    Isolate* isolate = args.GetIsolate();

    DFRobotHeartrateNodeObject* obj = ObjectWrap::Unwrap<DFRobotHeartrateNodeObject>(args.Holder());
    int heartrate;
    int result = obj->sensor_->ReadHeartrate(heartrate);

    Local<Object> result_object = Object::New(isolate);
    result_object->Set(String::NewFromUtf8(isolate, "result"), Integer::New(isolate, result));
    result_object->Set(String::NewFromUtf8(isolate, "heartrate"), Number::New(isolate, heartrate));
    args.GetReturnValue().Set(result_object);
}

NODE_MODULE(heartrate_sensor, DFRobotHeartrateNodeObject::Init);
