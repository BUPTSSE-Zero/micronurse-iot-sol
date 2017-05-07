//
// Created by shengyun-zhou on 17-4-22.
//

#include "MQ2.h"
#define AIO_PIN 0
#define TEST_COUNT 10
#include <iostream>
using namespace std;

int main(){
    MQ2 mq2(AIO_PIN);
    for(int i = 0; i < TEST_COUNT; i++){
        cout << "Smoke: " << mq2.ReadSmoke() << endl;
        usleep(500 * 1000);
    }
    return 0;
}
