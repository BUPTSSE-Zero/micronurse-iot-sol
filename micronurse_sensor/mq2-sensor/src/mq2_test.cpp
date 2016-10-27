//
// Created by zhou-shengyun on 16-10-27.
//
#include "mq2_sensor.h"
#include <stdio.h>
#include <unistd.h>

#define LOOP 10
#define SENSOR_PIN 0

int main(){
    float r0 = mq2_calibrate(SENSOR_PIN);
    printf("R0:%.2f\n", r0);
    for(int i = 0; i < LOOP; i++){
        int smoke = mq2_get_gas_percentage(SENSOR_PIN, r0, GAS_SMOKE);
        printf("Smoke:%dppm\n", smoke);
        usleep(2 * 1000 * 1000);
    }
    return 0;
}
