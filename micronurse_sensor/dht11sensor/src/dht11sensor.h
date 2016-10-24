//
// Created by zhou-shengyun on 16-10-23.
//

#ifndef DHT11SENSOR_DHT11SENSOR_H
#define DHT11SENSOR_DHT11SENSOR_H

#define HIGH 0x1
#define LOW  0x0

#define DHT11_SUCCESS 0
#define DHT11_ERROR_ACK_TIMEOUT 1
#define DHT11_ERROR_READ_DATA_TIMEOUT 2
#define DHT11_ERROR_CHECKSUM 3

int dht11_read(int pin, int& temperature, int& humidity, bool debug = false);

#endif //DHT11SENSOR_DHT11SENSOR_H
