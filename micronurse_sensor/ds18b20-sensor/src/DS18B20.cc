//
// Created by shengyun-zhou on 17-4-23.
//

#include "DS18B20.h"

DS18B20::DS18B20() {
    sensor_ = new upm::DS18B20(0);
    sensor_->init();
}

DS18B20::~DS18B20() {
    delete sensor_;
}

int DS18B20::readTemperature(float &temperature) {
    if (!sensor_->devicesFound())
        sensor_->init();

    if(!sensor_->devicesFound())
        return RESULT_ERROR_DEVICE_NOT_FOUND;

    sensor_->update(0);
    temperature = sensor_->getTemperature(0, false);
    return RESULT_SUCCESS;
}
