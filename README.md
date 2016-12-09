#Micro Nurse IoT-SOL
The IoT-SOL client of Micro Nurse IoT application. 

Please visit [https://github.com/01org/intel-iot-services-orchestration-layer](https://github.com/01org/intel-iot-services-orchestration-layer) for more information about IoT-SOL.

## Prerequisite

+ [Node.js](https://Node.js.org)(with NPM) >= 4.4.3

Linux:

+ [libmraa](https://github.com/intel-iot-devkit/mraa)(C/C++ lib and Node.js module)
+ [CMake](https://cmake.org)

NOTE: if you run IoT-SOL on Windows, you will NOT be able build any sensor module, and relative sensor services in IoT-SOL will NOT work.

## Build

### 1.Install all needed Node.js modules.

Execute following command in root directory of project:

```shell
npm install
```

### 2.Build UI.

Execute following commands in root directory of project:

```shell
cd ./micronurse_ui
# Install all  needed Node.js build tools(may need root permission on Linux)
sh ./buildui.sh --install-build-tools
# Install all  needed Node.js module dependencies
sh ./buildui.sh --install-dependencies
# Link ui-widgets to ui-dev and ui-user(may need root permission on Linux)
sh ./buildui.sh --link-widgets
# Build UI with 30 columns of grid layout of UI-IDE and UI
sh ./buildui.sh --grid-columns 30
```

### 3.Build sensor modules(for Linux only).

Execute following commands in root directory of project:

```shell
cd ./micronurse_sensor
# Install build tool cmake-js(may need root permission on Linux)
sh ./build.sh --install-cmake-js 
# Build modules
sh ./build.sh
```

## Start IoT-SOL

Execute shell script `start_micronurse.sh` in root directory of project to start IoT-SOL server.

Default port of Web development UI is `8080`. Default port of Web end-user UI is `3000`.

## Run on Intel Edison Board 

① Download project on both your host and Edison board.

② Install all needed Node.js modules on Edison board according to first step of building.

③ Build UI on your host according to second step of building. 

④ After building UI, copy directories `ui-user`, `ui-dev`, and `ui-widgets` in root directory of project to corresponding root directory of project in Edison board.

⑤ Build sensor modules on Edison board according to third step of building.

⑥ Start IoT-SOL on Edison board.

## Start on Boot

① Open  `micronurse.service` in root directory of project, and modify following two lines:

```
Environment="MICRONURSE_IOT_SOL_HOME=/root/micronurse-iot-sol"
Environment="NODE_PATH=/usr/bin/node"
```

Set value of `MICRONURSE_IOT_SOL_HOME` to home directory of project, and set value of `NODE_PATH` to executable path of `node`.

② Execute shell script `install_micronurse_service.sh` in root directory of project.

NOTE: After executing successfully, a new Systemd service `micronurse` will be enabled, and it will be started automatically on next boot. You can also use command  `systemctl`  to manage `micronurse` service. For example, start `micronurse` service:

```shell
systemctl start micronurse
```

##  Sync Code to Remote Host

You can use `sync.sh` in root directory of project to sync your code to remote host. This script will sync your code via command  `rsync`.

Basic usage of `sync.sh`:

```shell
sync.sh ${REMOTE_HOST}
```

`$REMOTE_HOST` refer to address of remote host that you want to sync code to.

By default, remote user is `root`, and syncing path on remote host is `/home/root/micronurse-iot-sol`.

NOTE: This script will NOT sync any file under directories `node_modules` and `bower_components`.