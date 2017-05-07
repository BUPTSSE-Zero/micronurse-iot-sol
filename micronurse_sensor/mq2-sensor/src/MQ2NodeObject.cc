//
// Created by shengyun-zhou on 17-4-22.
//

#include "MQ2NodeObject.h"
#define NODE_CLASS_NAME "MQ2"
using namespace v8;
using namespace node;

Persistent<Function> MQ2NodeObject::constructor;

MQ2NodeObject::MQ2NodeObject(int pin) {
    mq2_ = new MQ2(pin);
}

MQ2NodeObject::~MQ2NodeObject() {
    delete mq2_;
}

void MQ2NodeObject::Init(v8::Local<v8::Object> exports) {
    Isolate* isolate = exports->GetIsolate();

    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, NODE_CLASS_NAME));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "read_smoke", ReadSmoke);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, NODE_CLASS_NAME),
                 tpl->GetFunction());
}

void MQ2NodeObject::New(const v8::FunctionCallbackInfo<v8::Value> &args) {
    Isolate* isolate = args.GetIsolate();

    if (args.IsConstructCall()) {
        // Invoked as constructor: `new Object(...)`
        int pin = args[0]->IsUndefined() ? 0 : args[0]->Int32Value();
        MQ2NodeObject* obj = new MQ2NodeObject(pin);
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

void MQ2NodeObject::ReadSmoke(const v8::FunctionCallbackInfo<v8::Value> &args) {
    Isolate* isolate = args.GetIsolate();

    MQ2NodeObject* obj = ObjectWrap::Unwrap<MQ2NodeObject>(args.Holder());
    int smoke = obj->mq2_->ReadSmoke();
    args.GetReturnValue().Set(Integer::New(isolate, smoke));
}

NODE_MODULE(mq2_sensor, MQ2NodeObject::Init);
