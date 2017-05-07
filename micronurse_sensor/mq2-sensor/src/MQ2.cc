//
// Created by shengyun-zhou on 17-4-22.
//

#include <cmath>
#include "MQ2.h"
#define LOAD_RES 10
#define AIR_FACTOR 9.83

float SMOKE_CURVE[] = {2.3, 0.53, -0.44};

MQ2::MQ2(int pin) {
    aio_ = new Aio(pin);
    res_ = Calibrate_();
}

MQ2::~MQ2() {
    if(aio_ != nullptr)
        delete aio_;
}

float MQ2::Calibrate_() {
    int i;
    float val = 0;
    val = Resistance_(30, 20);
    val /= AIR_FACTOR;
    return val;
}

float MQ2::Resistance_(int samples, int interval_ms) {
    int i;
    float res = 0;
    for (i = 0; i < samples; i++) {
        int adc_value = aio_->read();
        res += ((float)LOAD_RES * (1023 - adc_value) / adc_value);
        usleep(interval_ms * 1000);
    }
    res /= samples;
    return res;
}

int MQ2::ReadSmoke() {
    float temp_res = Resistance_(5, 50);
    temp_res /= res_;
    int result = (int) pow(10, (((log(temp_res) - SMOKE_CURVE[1]) / SMOKE_CURVE[2]) + SMOKE_CURVE[0]));
    return result;
}
