#Micro Nurse IoT-SOL
The IoT-SOL client of Micro Nurse IoT application. Please visit [https://github.com/01org/intel-iot-services-orchestration-layer](https://github.com/01org/intel-iot-services-orchestration-layer) for more information about IoT-SOL.

## Prerequisite

+ Nodejs(with NPM) >= 4.4.3
+ [libmraa](https://github.com/intel-iot-devkit/mraa)

## Build

### 1.Install all needed nodejs modules.

Execute the following command in the root directory of this project:

```shell
npm install
```

### 2.Build UI

Execute the following command in the root directory of this project:

```shell
cd ./micronurse_ui
# Install all the needed NodeJS build tools(may need root permission on Linux)
sh ./buildui.sh --install-build-tools
# Install all the needed NodeJS module dependencies
sh ./buildui.sh --install-dependencies
# Link ui-widgets to ui-dev and ui-user(may need root permission on Linux)
sh ./buildui.sh --link-widgets
# Build UI with 30 columns of grid layout of UI-IDE and UI
sh ./buildui.sh --grid-columns 30
```

### 3.Build Sensor Modules

Execute the following command in the root directory of this project:

```shell
cd ./micronurse_sensor
# Install build tool cmake-js(may need root permission on Linux)
sh ./build.sh --install-cmake-js 
# Build modules
sh ./build.sh
```



## Start

Execute the shell script `start_micronurse.sh` in the root directory of this project to start IoT-SOL server.




