cmake_minimum_required(VERSION 2.8)
project(mq2sensor)

set(SOURCE_FILES
        src/mq2sensor_node.cpp src/mq2sensor.h src/mq2sensor.cpp)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(mq2sensor SHARED ${SOURCE_FILES})
set_target_properties(mq2sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(mq2sensor ${CMAKE_JS_LIB})