
#include <unistd.h>
#include <iostream>
#include "DS18B20.h"
#define TEST_COUNT 10

using namespace std;


int main(){
    DS18B20 sensor;
    for(int t = 0; t < TEST_COUNT; t++){
        float temperature;
        int result = sensor.readTemperature(temperature);
        switch (result){
            case DS18B20::RESULT_ERROR_DEVICE_NOT_FOUND:
                cout << "DS18b20 Sensor not found" << endl;
                break;
            case DS18B20::RESULT_SUCCESS:
                cout << "Temperature: " << temperature << endl;
                break;
        }
        sleep(1);
    }
    return 0;
}
