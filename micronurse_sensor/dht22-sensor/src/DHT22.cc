//
// Created by shengyun-zhou on 17-5-14.
// Code reference:
// http://www.i-programmer.info/programming/hardware/9200-exploring-edison-bit-banging-the-dht11dht22-.html
//

#include "DHT22.h"
#include <unistd.h>

#define DATA_BITS 40
#define LOW 0
#define HIGH 1
#define MAX_LOOP 5000
#define BIT_1_BORDER 75

DHT22::DHT22(int pin) {
    gpio_ = new Gpio(pin);
    gpio_->useMmap(true);
    usleep(100 * 1000);
}

DHT22::~DHT22() {
    delete gpio_;
}

void DHT22::InitSensor_() {
    gpio_->dir(DIR_OUT);
    gpio_->write(LOW);
    usleep(1000);
    gpio_->write(LOW);
    gpio_->dir(DIR_IN);
}

int GetByte(int b, int* buf) {
    int result = 0;
    b = (b - 1) * 8 + 1;
    for (int i = b; i <= b + 7; i++) {
        result <<= 1;
        result |= buf[i];
    }
    return result;
}

int DHT22::ReadTemperatureHumidity(float &temperature, float &humidity, bool debug) {
    InitSensor_();
    int buf[DATA_BITS + 1];
    int i, j;
    for (i = 0; i <= DATA_BITS; i++) {
        for (j = 1; j < MAX_LOOP; j++) {
            if (gpio_->read() == HIGH)
                break;
        }
        if (j >= MAX_LOOP) {
            if(debug)
                printf("Reading data time out, bit=%d\n", i);
            return RESULT_ERROR_READ_DATA_TIMEOUT;
        }

        for (j = 1; j < MAX_LOOP; j++) {
            if (gpio_->read() == LOW)
                break;
        }
        if (j >= MAX_LOOP) {
            if(debug)
                printf("Reading data time out, bit=%d\n", i);
            return RESULT_ERROR_READ_DATA_TIMEOUT;
        }
        buf[i] = 0;
        if (j >= BIT_1_BORDER)
            buf[i] = 1;
    }

    if(debug){
        printf("Bit data:\n");
        for (i = 1; i <= DATA_BITS; i++) {
            printf("%d ", buf[i]);
        }
        printf("\n");
    }

    int bytes[DATA_BITS / 8 + 1] = {0};
    for(i = 1; i <= DATA_BITS / 8; i++)
        bytes[i] = GetByte(i, buf);

    if((bytes[1] + bytes[2] + bytes[3] + bytes[4]) & 0xFF != bytes[5]){
        if(debug)
            printf("Checksum error.\n");
        return RESULT_ERROR_CHECKSUM;
    }

    humidity = (float) (bytes[1] << 8 | bytes[2]) / 10.0;

    int neg = bytes[3] & 0x80;
    bytes[3] &= 0x7F;
    temperature = (float) (bytes[3] << 8 | bytes[4]) / 10.0;
    if (neg > 0)
        temperature *= -1;
    return RESULT_SUCCESS;
}
