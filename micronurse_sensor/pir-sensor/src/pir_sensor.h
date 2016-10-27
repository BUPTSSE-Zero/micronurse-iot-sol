//
// Created by zhou-shengyun on 16-10-26.
//

#ifndef PIR_SENSOR_PIR_SENSOR_H
#define PIR_SENSOR_PIR_SENSOR_H

#define HIGH 0x1
#define LOW  0x0

#define PIR_SUCCESS 0
#define PIR_ERROR 1

int pir_read(int pin);

#endif //PIR_SENSOR_PIR_SENSOR_H
