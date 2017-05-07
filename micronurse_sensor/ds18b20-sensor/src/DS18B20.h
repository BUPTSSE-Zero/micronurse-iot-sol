//
// Created by shengyun-zhou on 17-4-23.
//

#ifndef DS18B20_H
#define DS18B20_H

#include <ds18b20.hpp>

class DS18B20 {
public:
    static const int RESULT_SUCCESS = 0;
    static const int RESULT_ERROR_DEVICE_NOT_FOUND = -1;

    DS18B20();
    ~DS18B20();
    int readTemperature(float& temperature);
private:
    upm::DS18B20* sensor_;
};


#endif //DS18B20_H
