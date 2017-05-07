//
// Created by shengyun-zhou on 17-5-2.
//

#ifndef DFROBOTHEARTRATE_H
#define DFROBOTHEARTRATE_H

#include <mraa.hpp>
using namespace mraa;

class DFRobotHeartrate {
public:
    static const int RESULT_SUCCESS = 0;
    static const int RESULT_ERROR_TIMEOUT = -2;
    static const int RESULT_ERROR_INVALID_DATA = -3;

    int ReadHeartrate(int &heartrate);
    DFRobotHeartrate(int pin);
    ~DFRobotHeartrate();

private:
    Aio* aio_;
    int WaitCycle_();
};

#endif //DFROBOTHEARTRATE_H
