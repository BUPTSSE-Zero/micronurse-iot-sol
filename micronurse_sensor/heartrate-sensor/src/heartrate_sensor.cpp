//
// Created by zhou-shengyun on 16-11-1.
//

#include "heartrate_sensor.h"
#include <mraa.h>
#include <algorithm>
#include <sys/time.h>

#define TIME_INTERVAL_INVALID 120
#define DATA_INVALID 220
#define MAX_LOOP 10000
#define LOW 20
#define HIGH 1000
#define SAMPLE_NUM 5

long get_current_timestamp() {
    struct timeval tv;
    gettimeofday(&tv,NULL);
    return tv.tv_sec * 1000 + tv.tv_usec / 1000;
}

int wait_cycle(mraa_aio_context aio){
    for(int i = 0; i <= MAX_LOOP; i++){
        if(mraa_aio_read(aio) < LOW)
            break;
        if(i == MAX_LOOP)
            return HEARTRATE_TIMEOUT;
    }
    for(int i = 0; i <= MAX_LOOP; i++){
        if(mraa_aio_read(aio) > HIGH)
            break;
        if(i == MAX_LOOP)
            return HEARTRATE_TIMEOUT;
    }
    return 0;
}


int heartrate_read_heartrate(int pin){
    mraa_aio_context aio = mraa_aio_init(pin);
    if(aio == NULL)
        return HEARTRATE_INIT_ERROR;
    long timestamp[SAMPLE_NUM] = {0};
    int time_interval[SAMPLE_NUM - 1] = {0};
    usleep(100 * 1000);
    for(int i = 0; i < SAMPLE_NUM; i++){
        if(wait_cycle(aio) == HEARTRATE_TIMEOUT)
            return HEARTRATE_TIMEOUT;
        timestamp[i] = get_current_timestamp();
    }
    mraa_aio_close(aio);
    for(int i = 0; i < SAMPLE_NUM - 1; i++)
        time_interval[i] = timestamp[i + 1] - timestamp[i];
    std::sort(time_interval, time_interval + SAMPLE_NUM - 1);
    int calc_start_pos = -1, calc_end_pos = -1;
    for(int calc_width = SAMPLE_NUM - 1; calc_width >= 2; calc_width--){
        for(int i = 0; i < SAMPLE_NUM - 1; i++){
            if(i + calc_width - 1 >= SAMPLE_NUM - 1)
                break;
            if(time_interval[i + calc_width - 1] - time_interval[i] <= TIME_INTERVAL_INVALID){
                calc_start_pos = i;
                calc_end_pos = i + calc_width - 1;
            }
        }
        if(calc_start_pos >= 0 && calc_end_pos >= 0)
            break;
    }

    if(calc_start_pos < 0 || calc_end_pos < 0)
        return HEARTRATE_INVALID_DATA;
    int sum = 0;
    for(int i = calc_start_pos; i <= calc_end_pos; i++)
        sum += time_interval[i];
    if(sum == 0)
        return HEARTRATE_INVALID_DATA;
    int result = 60000 * (calc_end_pos - calc_start_pos + 1) / sum;
    if(result >= DATA_INVALID)
        return HEARTRATE_INVALID_DATA;
    return result;
}
