cmake_minimum_required(VERSION 2.8)

project(dht11-sensor)

set(SOURCE_FILES
        src/dht11_sensor_node.cpp
        src/dht11_sensor.h
        src/dht11_sensor.cpp)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(dht11-sensor SHARED ${SOURCE_FILES})
set_target_properties(dht11-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(dht11-sensor ${CMAKE_JS_LIB})

project(dht11-test)

set(TEST_SOURCE_FILES
        src/dht11_sensor.h
        src/dht11_sensor.cpp
        src/dht11_test.cpp)
add_executable(dht11-test ${TEST_SOURCE_FILES})
