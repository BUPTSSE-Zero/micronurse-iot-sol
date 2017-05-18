//
// Created by shengyun-zhou on 17-5-15.
//

#ifndef DHT22NODEOBJECT_H
#define DHT22NODEOBJECT_H

#include <node.h>
#include <node_object_wrap.h>
#include "DHT22.h"

class DHT22NodeObject : public node::ObjectWrap {
public:
    DHT22NodeObject(int pin);
    ~DHT22NodeObject();
    static void Init(v8::Local<v8::Object> exports);

private:
    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void ReadTemperatureHumidity(const v8::FunctionCallbackInfo<v8::Value> &args);
    static v8::Persistent<v8::Function> constructor;

    DHT22* sensor_;
};


#endif //DHT22NODEOBJECT_H
