//
// Created by zhou-shengyun on 16-10-31.
//

#include "DFRobotHeartrate.h"
#include <iostream>
#define SENSOR_PIN 4
#define TEST_COUNT 10

using namespace std;

int main(){
    DFRobotHeartrate sensor(SENSOR_PIN);
    for(int i = 0; i < TEST_COUNT; i++) {
        int heartate;
        int result = sensor.ReadHeartrate(heartate);
        switch (result){
            case DFRobotHeartrate::RESULT_SUCCESS:
                cout << heartate << " bpm" << endl;
                break;
            case DFRobotHeartrate::RESULT_ERROR_TIMEOUT:
                cout << "Timeout" << endl;
                break;
            case DFRobotHeartrate::RESULT_ERROR_INVALID_DATA:
                cout << "Invalid data" << endl;
                break;
        }
        usleep(1000 * 1000);
    }
    return 0;
}
