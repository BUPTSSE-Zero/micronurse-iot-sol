//
// Created by shengyun-zhou on 17-5-14.
//

#ifndef DHT22_H
#define DHT22_H

#include <mraa.hpp>
using namespace mraa;

class DHT22 {
public:
    static const int RESULT_SUCCESS = 0;
    static const int RESULT_ERROR_READ_DATA_TIMEOUT = -2;
    static const int RESULT_ERROR_CHECKSUM = -3;

    DHT22(int pin);
    ~DHT22();
    int ReadTemperatureHumidity(float& temperature, float& humidity, bool debug = false);
private:
    static void* ReadThreadFunc_(void* arg);

    Gpio* gpio_;
    int* buf_;
    int miss_bits_count_;
    void InitSensor_();
};


#endif //DHT22_H
