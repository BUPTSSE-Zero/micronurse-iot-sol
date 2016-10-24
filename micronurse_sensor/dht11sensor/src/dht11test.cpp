//
// Created by zhou-shengyun on 16-10-24.
//

#include "dht11sensor.h"
#include <stdio.h>
#include <unistd.h>

int main(){
    const int test_count = 10;
    for(int i = 0; i < test_count; i++){
        int temperature, humidity;
        int result = dht11_read(0, temperature, humidity, true);
        switch (result){
            case DHT11_ERROR_READ_DATA_TIMEOUT:
                printf("Thermometer Read data timeout.\n");
                break;
            case DHT11_ERROR_ACK_TIMEOUT:
                printf("Thermometer ACK timeout.\n");
                break;
            case DHT11_ERROR_CHECKSUM:
                printf("Thermometer checksum error.\n");
                break;
            case DHT11_SUCCESS:
                printf("Temperature:%d, Humidity:%d\n", temperature, humidity);
        }
        usleep(2 * 1000 * 1000);
    }
    return 0;
}