//
// Created by zhou-shengyun on 16-10-24.
// Source code reference: http://sandboxelectronics.com/?p=165
//

#include "mq2_sensor.h"
#include <mraa.h>
#include <math.h>
#include <unistd.h>

#define MQ2_RL_VALUE                     (5)     //define the load resistance on the board, in kilo ohms
#define MQ2_RO_CLEAN_AIR_FACTOR          (9.83)  //RO_CLEAR_AIR_FACTOR=(Sensor resistance in clean air)/RO,
//which is derived from the chart in datasheet

#define MQ2_CALIBARAION_SAMPLE_TIMES     (100)
#define MQ2_READ_SAMPLE_TIMES            (5)

const float LPG_CURCVE[3] =  {2.3, 0.21, -0.47};
const float CO_CURVE[3] =  {2.3, 0.72, -0.34};
const float SMOKE_CURVE[3] = {2.3, 0.53, -0.44};

float mq2_resistance_calc(int raw_adc) {
    return (float) MQ2_RL_VALUE * (1023 - raw_adc) / raw_adc;
}

float mq2_calibrate(int pin) {
    mraa_aio_context aio = mraa_aio_init(pin);
    float val = 0;
    for (int i = 0; i < MQ2_CALIBARAION_SAMPLE_TIMES; i++) {
        val += mq2_resistance_calc(mraa_aio_read(aio));
    }
    mraa_aio_close(aio);

    val /= MQ2_CALIBARAION_SAMPLE_TIMES;
    val /= MQ2_RO_CLEAN_AIR_FACTOR;   //divided by RO_CLEAN_AIR_FACTOR yields the Ro according to the chart in the datasheet
    return val;
}

float mq2_read(int pin) {
    float rs=0;
    mraa_aio_context aio = mraa_aio_init(pin);
    if(aio == NULL)
        return -1;

    for (int i = 0; i < MQ2_READ_SAMPLE_TIMES;i++) {
        rs += mq2_resistance_calc(mraa_aio_read(aio));
    }
    mraa_aio_close(aio);

    rs /= MQ2_READ_SAMPLE_TIMES;
    return rs;
}

int mq2_calc_percentage(float rs_ro_ratio, const float* pcurve) {
    return pow(10, (((log(rs_ro_ratio) - pcurve[1]) / pcurve[2]) + pcurve[0]));
}

int mq2_get_gas_percentage(int pin, float r0, int gas_id) {
    if ( gas_id == GAS_LPG ) {
        return mq2_calc_percentage(mq2_read(pin) / r0, LPG_CURCVE);
    } else if ( gas_id == GAS_CO ) {
        return mq2_calc_percentage(mq2_read(pin) / r0, CO_CURVE);
    } else if ( gas_id == GAS_SMOKE ) {
        return mq2_calc_percentage(mq2_read(pin) / r0, SMOKE_CURVE);
    }
    return -1;
}

