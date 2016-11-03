//
// Created by zhou-shengyun on 16-10-31.
//

#include <stdio.h>
#include "heartrate_sensor.h"
#include <unistd.h>
#define SENSOR_PIN 4

int main(){
    for(int i = 0; i < 15; i++) {
        printf("%dbpm\n", heartrate_read_heartrate(SENSOR_PIN));
        usleep(1000 * 1000);
    }
    return 0;
}
