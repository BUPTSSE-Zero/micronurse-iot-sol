//
// Created by shengyun-zhou on 17-4-22.
//

#ifndef DHT11_NODEOBJECT_H
#define DHT11_NODEOBJECT_H

#include <node.h>
#include <node_object_wrap.h>
#include "DHT11.h"

class DHT11NodeObject : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports);

private:
    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void ReadTemperatureHumidity(const v8::FunctionCallbackInfo<v8::Value> &args);
    static v8::Persistent<v8::Function> constructor;

    int pin_;
};


#endif
