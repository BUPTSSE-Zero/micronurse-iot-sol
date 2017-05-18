//
// Created by shengyun-zhou on 17-5-14.
// Code reference:
// http://www.i-programmer.info/programming/hardware/9200-exploring-edison-bit-banging-the-dht11dht22-.html
//

#include "DHT22.h"
#include <unistd.h>
#include <pthread.h>

#define DATA_BITS 40
#define LOW 0
#define HIGH 1
#define MAX_LOOP 50000
#define BIT_1_BORDER 75

DHT22::DHT22(int pin) {
    buf_ = new int[DATA_BITS * 2 + 1];
    gpio_ = new Gpio(pin);
    gpio_->useMmap(true);
    usleep(100 * 1000);
}

DHT22::~DHT22() {
    delete gpio_;
    delete buf_;
}

void DHT22::InitSensor_() {
    gpio_->dir(DIR_OUT);
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

bool Checksum(int* buf){
    int bytes[DATA_BITS / 8 + 1] = {0};
    for(int i = 1; i <= DATA_BITS / 8; i++)
        bytes[i] = GetByte(i, buf);

    return ((bytes[1] + bytes[2] + bytes[3] + bytes[4]) & 0xFF) == bytes[5];
}

bool CalcMissBits(int* buf, int n, int miss_bits_count){
    for(int b = 0; b < 2; b++){
        buf[n] = b;
        if(n == miss_bits_count){
            if(Checksum(buf))
                return true;
        }else{
            if(CalcMissBits(buf, n + 1, miss_bits_count))
                return true;
        }
    }
    return false;
}

void* DHT22::ReadThreadFunc_(void* arg) {
    DHT22* dht22 = (DHT22*) arg;
    int i, j;
    for (i = 0; i <= DATA_BITS * 2; i++) {
        for (j = 1; j < MAX_LOOP; j++) {
            if (dht22->gpio_->read() == HIGH)
                break;
        }
        if (j >= MAX_LOOP) {
            dht22->miss_bits_count_ = DATA_BITS - i + 1;
            if(dht22->miss_bits_count_ < 0){
                for(int t = -dht22->miss_bits_count_ + 1; t < i; t++)
                    dht22->buf_[t + dht22->miss_bits_count_] = dht22->buf_[t];
                dht22->miss_bits_count_ = 0;
            }
            pthread_exit(nullptr);
        }

        for (j = 1; j < MAX_LOOP; j++) {
            if (dht22->gpio_->read() == LOW)
                break;
        }
        if (j >= MAX_LOOP) {
            dht22->miss_bits_count_ = DATA_BITS - i + 1;
            if(dht22->miss_bits_count_ < 0){
                for(int t = -dht22->miss_bits_count_ + 1; t < i; t++)
                    dht22->buf_[t + dht22->miss_bits_count_] = dht22->buf_[t];
                dht22->miss_bits_count_ = 0;
            }
            pthread_exit(nullptr);
        }
        dht22->buf_[i] = 0;
        if (j >= BIT_1_BORDER)
            dht22->buf_[i] = 1;
        //dht22->buf_[i] = j;
    }

    pthread_exit(nullptr);
}

int DHT22::ReadTemperatureHumidity(float &temperature, float &humidity, bool debug) {
    pthread_t thr;
    miss_bits_count_ = 0;
    pthread_create(&thr, NULL, ReadThreadFunc_, this);
    InitSensor_();
    pthread_join(thr, NULL);

    int i;
    for(i = DATA_BITS - miss_bits_count_; i >= 0; i--)
        buf_[i + miss_bits_count_] = buf_[i];
    for(i = miss_bits_count_ - 1; i >= 0; i--)
        buf_[i] = -1;

    if(debug){
        printf("Miss %d bits\n", miss_bits_count_);
        printf("Bit data:\n");
        for (i = 1; i <= DATA_BITS; i++) {
            printf("%d ", buf_[i]);
        }
        printf("\n");
    }

    if(miss_bits_count_ > 8)
        return RESULT_ERROR_READ_DATA_TIMEOUT;
    if(miss_bits_count_ == 0){
        if(!Checksum(buf_)){
            if(debug)
                printf("Check sum error.\n");
            return RESULT_ERROR_CHECKSUM;
        }
    }else{
        if(debug)
            printf("Try to calc missed bits...\n");
        if(!CalcMissBits(buf_, 1, miss_bits_count_)){
            if(debug)
                printf("Check sum error.\n");
            return RESULT_ERROR_CHECKSUM;
        }
    }

    int bytes[DATA_BITS / 8 + 1] = {0};
    for(i = 1; i <= DATA_BITS / 8; i++)
        bytes[i] = GetByte(i, buf_);

    humidity = (float) (bytes[1] << 8 | bytes[2]) / 10.0;

    int neg = bytes[3] & 0x80;
    bytes[3] &= 0x7F;
    temperature = (float) (bytes[3] << 8 | bytes[4]) / 10.0;
    if (neg > 0)
        temperature *= -1;

    if(humidity < 0 || humidity > 100 || temperature < -60 || temperature > 120)
        return RESULT_ERROR_CHECKSUM;
    return RESULT_SUCCESS;
}
