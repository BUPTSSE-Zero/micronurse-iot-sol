cmake_minimum_required(VERSION 3.1)
project(mq2-sensor)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        src/MQ2.cc
        src/MQ2.h
        src/MQ2NodeObject.cc
        src/MQ2NodeObject.h)
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

project(mq2-test)
set(TEST_SOURCE_FILES
        src/MQ2.cc
        src/MQ2.h
        src/MQ2Test.cc)
add_executable(mq2-test ${TEST_SOURCE_FILES})
