//
// Created by shengyun-zhou on 17-4-22.
//

#ifndef MQ2_NODEOBJECT_H
#define MQ2_NODEOBJECT_H
#include <node.h>
#include <node_object_wrap.h>
#include "MQ2.h"

class MQ2NodeObject : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports);
    MQ2NodeObject(int pin);
    ~MQ2NodeObject();

private:
    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void ReadSmoke(const v8::FunctionCallbackInfo<v8::Value> &args);
    static v8::Persistent<v8::Function> constructor;

    MQ2* mq2_;
};


#endif //MQ2_NODEOBJECT_H
