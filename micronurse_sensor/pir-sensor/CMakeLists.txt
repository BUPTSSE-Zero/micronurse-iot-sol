cmake_minimum_required(VERSION 2.8)
project(pir-sensor)

set(SOURCE_FILES
        src/pir_sensor_node.cpp
        src/pir_sensor.h src/pir_sensor.cpp)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(pir-sensor SHARED ${SOURCE_FILES})
set_target_properties(pir-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(pir-sensor ${CMAKE_JS_LIB})