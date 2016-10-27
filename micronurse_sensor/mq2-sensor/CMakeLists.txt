cmake_minimum_required(VERSION 2.8)
project(mq2-sensor)

set(SOURCE_FILES
        src/mq2_sensor_node.cpp
        src/mq2_sensor.h
        src/mq2_sensor.cpp)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(mq2-sensor SHARED ${SOURCE_FILES})
set_target_properties(mq2-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(mq2-sensor ${CMAKE_JS_LIB})

project(mq2-sensor-test)
set(TEST_SOURCE_FILES
        src/mq2_test.cpp
        src/mq2_sensor.h
        src/mq2_sensor.cpp)
add_executable(mq2-sensor-test ${TEST_SOURCE_FILES})
