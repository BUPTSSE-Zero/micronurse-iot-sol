//
// Created by shengyun-zhou on 17-4-22.
//

#ifndef DHT11_H
#define DHT11_H

#include <mraa.hpp>

using namespace mraa;

class DHT11 {
public:
    static const int RESULT_SUCCESS = 0;
    static const int RESULT_ERROR_ACK_TIMEOUT = -1;
    static const int RESULT_ERROR_READ_DATA_TIMEOUT = -2;
    static const int RESULT_ERROR_CHECKSUM = -3;

    DHT11(int pin);
    ~DHT11();
    int ReadTemperatureHumidity(float& temperature, float& humidity, bool debug = false);
private:
    Gpio* gpio_;
    void InitSensor_();
};


#endif
