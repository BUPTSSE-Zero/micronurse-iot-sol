//
// Created by zhou-shengyun on 16-10-23.
//

#include "dht11sensor.h"
#include <mraa.h>
#include <unistd.h>
#include <stdio.h>

#define MAX_LOOP 100000
#define DATA_BITS 40

void print_pulse(int* pulse, int start, int end){
    printf("Bit Pulse:");
    for(int i = start; i <= end; i++)
        printf("%d ", pulse[i]);
    printf("\n");
}

void dht11_init(mraa_gpio_context gpio){
    mraa_gpio_dir(gpio, MRAA_GPIO_OUT);
    mraa_gpio_write(gpio, LOW);
    usleep(5500);
    mraa_gpio_write(gpio, HIGH);
    mraa_gpio_use_mmaped(gpio, 1);
    mraa_gpio_dir(gpio, MRAA_GPIO_IN);
}

int dht11_read(int pin, int& temperature, int& humidity, bool debug){
    uint8_t bits[DATA_BITS / 8] = {0};
    int pulse[100] = {0};
    uint8_t cnt = 7;
    uint8_t idx = 0;
    int i, j, start_pos = 1, end_pos = DATA_BITS;

    mraa_gpio_context gpio;
    gpio = mraa_gpio_init(pin);
    dht11_init(gpio);

    // Acknowledge or Timeout
    for(i = 1; i <= MAX_LOOP; i++){
        if(mraa_gpio_read(gpio) == HIGH)
            break;
        if(i == MAX_LOOP) {
            mraa_gpio_close(gpio);
            return DHT11_ERROR_ACK_TIMEOUT;
        }
    }

    for(i = 1; i <= MAX_LOOP; i++){
        if(mraa_gpio_read(gpio) == LOW)
            break;
        if(i == MAX_LOOP) {
            mraa_gpio_close(gpio);
            return DHT11_ERROR_ACK_TIMEOUT;
        }
    }

    // Read DATA_BITS+1 bits of data(the first bit data may be invalid sometime)
    for (i = 0; i < DATA_BITS + 1; i++) {
        for(j = 1; j <= MAX_LOOP; j++){
            if(mraa_gpio_read(gpio) == HIGH)
                break;
            if(j == MAX_LOOP) {
                if(i == DATA_BITS){      //All bits of data have been read when (i == DATA_BITS - 1)
                    start_pos = 0;
                    end_pos = DATA_BITS - 1;
                    break;
                }
                mraa_gpio_close(gpio);
                return DHT11_ERROR_READ_DATA_TIMEOUT;
            }
        }

        for(j = 1; j <= MAX_LOOP; j++){
            if(mraa_gpio_read(gpio) == LOW)
                break;
            if(j == MAX_LOOP) {
                if(i == DATA_BITS){       //All bits of data have been read when (i == DATA_BITS - 1)
                    start_pos = 0;
                    end_pos = DATA_BITS - 1;
                    break;
                }
                mraa_gpio_close(gpio);
                return DHT11_ERROR_READ_DATA_TIMEOUT;
            }
        }

        pulse[i] = j;
    }
    mraa_gpio_close(gpio);

    if(debug)
        print_pulse(pulse, start_pos, end_pos);
    int max_pulse = pulse[start_pos];
    for(i = start_pos + 1; i <= end_pos; i++){
        if(pulse[i] > max_pulse)
            max_pulse = pulse[i];
    }
    for(i = start_pos; i <= end_pos; i++){
        if(pulse[i] * 2 > max_pulse){
            bits[idx] |= (1 << cnt);
        }
        if(cnt == 0){
            idx++;
            cnt = 7;
        }else
            cnt--;
    }
    humidity = bits[0];
    temperature = bits[2];

    uint8_t sum = bits[0] + bits[2];
    if (bits[4] != sum)
        return DHT11_ERROR_CHECKSUM;
    return DHT11_SUCCESS;
}
