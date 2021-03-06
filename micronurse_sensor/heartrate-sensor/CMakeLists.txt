cmake_minimum_required(VERSION 2.8)

project(heartrate-sensor)

set(SOURCE_FILES
        src/DFRobotHeartrate.cc
        src/DFRobotHeartrate.h
        src/DFRobotHeartrateNodeObject.cc
        src/DFRobotHeartrateNodeObject.h)

include_directories(${CMAKE_JS_INC})

message(STATUS "Try to find MRAA modules...")
find_package(PkgConfig REQUIRED)
pkg_check_modules(MRAA mraa REQUIRED)
include_directories(${MRAA_INCLUDE_DIRS})
link_directories(${MRAA_LIBRARY_DIRS})
link_libraries(${MRAA_LIBRARIES})

add_library(heartrate-sensor SHARED ${SOURCE_FILES})
set_target_properties(heartrate-sensor PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(heartrate-sensor ${CMAKE_JS_LIB})

project(heartrate-sensor-test)

set(TEST_SOURCE_FILES
        src/DFRobotHeartrate.cc
        src/DFRobotHeartrate.h
        src/DFRobotHeartrateTest.cc)

add_executable(heartrate-sensor-test ${TEST_SOURCE_FILES})