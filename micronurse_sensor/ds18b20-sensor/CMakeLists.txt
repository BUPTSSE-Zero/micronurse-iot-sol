cmake_minimum_required(VERSION 3.1)
project(ds18b20-sensor)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        src/DS18B20.cc
        src/DS18B20.h
        src/DS18B20NodeObject.cc
        src/DS18B20NodeObject.h)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find UPM-DS18b20 modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(UPM_DS18B20 upm-ds18b20 REQUIRED)
include_directories(${UPM_DS18B20_INCLUDE_DIRS})
link_directories(${UPM_DS18B20_LIBRARY_DIRS})
link_libraries(${UPM_DS18B20_LIBRARIES})

add_library(ds18b20-sensor SHARED ${SOURCE_FILES})
set_target_properties(ds18b20-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(ds18b20-sensor ${CMAKE_JS_LIB})

project(ds18b20-test)

set(TEST_SOURCE_FILES
        src/DS18B20.cc
        src/DS18B20.h
        src/DS18B20Test.cc)
add_executable(ds18b20-test ${TEST_SOURCE_FILES})
