//
// Created by zhou-shengyun on 16-10-26.
//

#include "pir_sensor.h"
#include <mraa.h>

int pir_read(int pin){
    mraa_gpio_context gpio = NULL;
    gpio = mraa_gpio_init(pin);
    if(gpio == NULL)
        return -1;
    mraa_gpio_dir(gpio, MRAA_GPIO_IN);
    int pir_result = mraa_gpio_read(gpio);
    mraa_gpio_close(gpio);
    return pir_result;
}
