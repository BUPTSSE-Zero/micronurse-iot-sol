//
// Created by shengyun-zhou on 17-5-14.
//

#include "DHT22.h"
#define PIN 5
#define TEST_COUNT 10

int main() {
    float humidity, temperature;
    DHT22 dht22(PIN);
    for(int t = 0; t < TEST_COUNT; t++){
        if(dht22.ReadTemperatureHumidity(temperature, humidity, true) == DHT22::RESULT_SUCCESS){
            printf("Humidity: %.1f\%\nTemperature: %.1f\n", humidity, temperature);
        }
        usleep(2000 * 1000);
    }
    return 0;
}
