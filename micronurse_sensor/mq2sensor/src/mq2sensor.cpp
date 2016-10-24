//
// Created by zhou-shengyun on 16-10-24.
//

#include "mq2sensor.h"
#include <mraa.h>

int mq2_read(int pin){
    mraa_aio_context aio;
    aio = mraa_aio_init(pin);
    if(aio == NULL)
        return -1;
    int smoke_result = mraa_aio_read(aio);
    mraa_aio_close(aio);
    return smoke_result;
}
