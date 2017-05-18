//
// Created by zhou-shengyun on 16-10-24.
//

#include "DHT11.h"
#define GPIO_PIN 5
#define TEST_COUNT 10
#include <iostream>
using namespace std;

int main(){
    for(int i = 0; i < TEST_COUNT; i++){
        DHT11 sensor(GPIO_PIN);
        float temperature, humidity;
        int result = sensor.ReadTemperatureHumidity(temperature, humidity, true);
        switch (result){
            case DHT11::RESULT_ERROR_READ_DATA_TIMEOUT:
                cout << "DHT11 read data timeout." << endl;
                break;
            case DHT11::RESULT_ERROR_ACK_TIMEOUT:
                cout << "DHT11 ACK timeout." << endl;
                break;
            case DHT11::RESULT_ERROR_CHECKSUM:
                cout << "DHT11 checksum error." << endl;
                break;
            case DHT11::RESULT_SUCCESS:
                cout << "Temperature: " << temperature << " Humidity: " << humidity << endl;
                break;
        }
        usleep(1000 * 1000);
    }
    return 0;
}