//
// Created by zhou-shengyun on 16-10-24.
//

#ifndef MQ2_SENSOR_MQ2_SENSOR_H
#define MQ2_SENSOR_MQ2_SENSOR_H

#define MQ2_SUCCESS 0
#define MQ2_ERROR 1

#define GAS_LPG 0
#define GAS_CO 1
#define GAS_SMOKE 2

float mq2_calibrate(int pin);
int mq2_get_gas_percentage(int pin, float r0, int gas_id);

#endif //MQ2_SENSOR_MQ2_SENSOR_H
