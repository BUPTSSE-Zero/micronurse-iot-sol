//
// Created by shengyun-zhou on 17-5-2.
//

#ifndef DFROBOTHEARTRATENODEOBJECT_H
#define DFROBOTHEARTRATENODEOBJECT_H

#include <node.h>
#include <node_object_wrap.h>
#include "DFRobotHeartrate.h"

class DFRobotHeartrateNodeObject : public node::ObjectWrap{
public:
    static void Init(v8::Local<v8::Object> exports);
    DFRobotHeartrateNodeObject(int pin);
    ~DFRobotHeartrateNodeObject();

private:
    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void ReadHeartrate(const v8::FunctionCallbackInfo<v8::Value> &args);
    static v8::Persistent<v8::Function> constructor;

    DFRobotHeartrate* sensor_;
};

#endif //DFROBOTHEARTRATENODEOBJECT_H
