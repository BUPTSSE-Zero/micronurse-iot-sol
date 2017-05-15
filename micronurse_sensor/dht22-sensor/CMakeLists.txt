cmake_minimum_required(VERSION 2.8)
project(dht22_sensor)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        src/DHT22.h
        src/DHT22.cc
        src/DHT22NodeObject.cc
        src/DHT22NodeObject.h)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(dht22-sensor SHARED ${SOURCE_FILES})
set_target_properties(dht22-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(dht22-sensor ${CMAKE_JS_LIB})

project(dht22-test)

set(TEST_SOURCE_FILES
        src/DHT22.cc
        src/DHT22.h
        src/DHT22Test.cc)
add_executable(dht22-test ${TEST_SOURCE_FILES})
