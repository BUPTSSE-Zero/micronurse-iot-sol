//
// Created by shengyun-zhou on 17-4-22.
//

#include "DHT11.h"
#include <iostream>
using namespace std;

#define HIGH 0x1
#define LOW  0x0

#define MAX_LOOP 100000
#define DATA_BITS 40
#define BIT_1_BORDER 75

DHT11::DHT11(int pin) {
    gpio_ = new Gpio(pin);
}

DHT11::~DHT11() {
    if(gpio_ != nullptr)
        delete gpio_;
}

void PrintPulse_(int *pulse, int start, int end){
    cout << "Bit Pulse:" << endl;
    for(int i = start; i <= end; i++)
        cout << pulse[i] << ' ';
    cout << endl;
}

int GetByte(int b, int* buf) {
    int result = 0;
    b = (b - 1) * 8;
    for (int i = b; i <= b + 7; i++) {
        result <<= 1;
        result |= buf[i];
    }
    return result;
}

int DHT11::ReadTemperatureHumidity(float &temperature, float &humidity, bool debug) {
    uint8_t bits[DATA_BITS / 8] = {0};
    int pulse[DATA_BITS * 2] = {0};
    uint8_t cnt = 7;
    uint8_t idx = 0;
    int i, j, start_pos = 1, end_pos = DATA_BITS;
    InitSensor_();

    // Acknowledge or Timeout
    for(i = 1; i <= MAX_LOOP; i++){
        if(gpio_->read() == HIGH)
            break;
        if(i == MAX_LOOP)
            return RESULT_ERROR_ACK_TIMEOUT;
    }

    for(i = 1; i <= MAX_LOOP; i++){
        if(gpio_->read() == LOW)
            break;
        if(i == MAX_LOOP)
            return RESULT_ERROR_ACK_TIMEOUT;
    }

    // Read DATA_BITS+1 bits of data(the first bit data may be invalid sometime)
    for (i = 0; i < DATA_BITS + 1; i++) {
        for(j = 1; j <= MAX_LOOP; j++){
            if(gpio_->read() == HIGH)
                break;
            if(j == MAX_LOOP) {
                if(i == DATA_BITS){      //All bits of data have been read when (i == DATA_BITS - 1)
                    start_pos = 0;
                    end_pos = DATA_BITS - 1;
                    break;
                }
                return RESULT_ERROR_READ_DATA_TIMEOUT;
            }
        }

        for(j = 1; j <= MAX_LOOP; j++){
            if(gpio_->read() == LOW)
                break;
            if(j == MAX_LOOP) {
                if(i == DATA_BITS){       //All bits of data have been read when (i == DATA_BITS - 1)
                    start_pos = 0;
                    end_pos = DATA_BITS - 1;
                    break;
                }
                return RESULT_ERROR_READ_DATA_TIMEOUT;
            }
        }
        pulse[i] = 0;
        if(j > BIT_1_BORDER)
            pulse[i] = 1;
    }

    if(debug)
        PrintPulse_(pulse, start_pos, end_pos);
    if(start_pos > 0){
        for(int t = start_pos; t <= end_pos; t++)
            pulse[t - 1] = pulse[t];
    }

    int bytes[DATA_BITS / 8 + 1] = {0};
    for(i = 1; i <= DATA_BITS / 8; i++)
        bytes[i] = GetByte(i, pulse);

    if(bytes[1] + bytes[3] != bytes[5])
        return RESULT_ERROR_CHECKSUM;

    humidity = bytes[1];
    temperature = bytes[3];
    return RESULT_SUCCESS;
}

void DHT11::InitSensor_() {
    gpio_->dir(DIR_OUT);
    gpio_->write(LOW);
    usleep(5500);
    gpio_->write(HIGH);
    gpio_->useMmap(true);
    gpio_->dir(DIR_IN);
}
