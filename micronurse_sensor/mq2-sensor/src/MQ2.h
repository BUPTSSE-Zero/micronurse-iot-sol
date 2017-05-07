//
// Created by shengyun-zhou on 17-4-22.
// Source code reference:
// https://circuitdigest.com/microcontroller-projects/arduino-smoke-detector-on-pcb-using-mq2-gas-sensor
//

#ifndef MQ2_H
#define MQ2_H

#include <mraa.hpp>
using namespace mraa;

class MQ2 {
public:
    MQ2(int pin);
    ~MQ2();
    int ReadSmoke();

private:
    float Calibrate_();
    float Resistance_(int samples, int interval);
    Aio* aio_;
    float res_;
};


#endif //MQ2_H
