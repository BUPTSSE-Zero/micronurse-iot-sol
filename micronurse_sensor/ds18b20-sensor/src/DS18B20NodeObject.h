//
// Created by shengyun-zhou on 17-4-23.
//

#ifndef DS18B20NODEOBJECT_H
#define DS18B20NODEOBJECT_H

#include <node.h>
#include <node_object_wrap.h>
#include "DS18B20.h"

class DS18B20NodeObject : public node::ObjectWrap {
public:
    DS18B20NodeObject();
    ~DS18B20NodeObject();
    static void Init(v8::Local<v8::Object> exports);

private:
    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void ReadTemperature(const v8::FunctionCallbackInfo<v8::Value> &args);
    static v8::Persistent<v8::Function> constructor;

    DS18B20* sensor_;
};


#endif //DS18B20_TEST_DS18B20NODEOBJECT_H
